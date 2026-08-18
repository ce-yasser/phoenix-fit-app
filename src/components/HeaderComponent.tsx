import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiChevronDown, FiLogIn } from "react-icons/fi";
import {
  useLogout,
  useSetShowAuth,
  useIsLoggedIn,
  useUserData,
} from "@store/hooks/userHooks";

function HeaderComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isTransparent = ["/", "/competition"].includes(location.pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const setShowAuth = useSetShowAuth();
  const logout = useLogout();
  const hasAccessToken = useIsLoggedIn();
  const userData = useUserData();

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 10);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isMenuOpen]);

  const handleMyRegistration = () => {
    setIsMenuOpen(false);
    navigate("/me");
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
  };

  const headerStateClass =
    isTransparent && !isScrolled ? "is-transparent" : "is-scrolled";

  return (
    <header className={`pf-header ${headerStateClass}`}>
      <div className="pf-container">
        <div className="pf-header__inner">
          <div className="pf-header__brand" aria-label="Phoenix Fit brand">
            <Link to="/" className="pf-header__brand-link">
              <img
                src="/logo.png"
                alt="Phoenix Fit"
                className="pf-header__logo"
              />
            </Link>
          </div>

          {hasAccessToken ? (
            <div className="pf-header__user-menu" ref={menuRef}>
              <div
                onClick={() => setIsMenuOpen((current) => !current)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setIsMenuOpen((current) => !current);
                  }
                }}
                className="pf-header__user-button"
                role="button"
                tabIndex={0}
              >
                <span className="pf-header__user-name">
                  {userData?.name || "User"}
                </span>
                <FiChevronDown aria-hidden="true" />
              </div>

              {isMenuOpen && (
                <div className="pf-header__dropdown" role="menu" aria-label="User menu">
                  <div
                    onClick={handleMyRegistration}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleMyRegistration();
                      }
                    }}
                    className="pf-header__dropdown-item"
                    role="menuitem"
                    tabIndex={0}
                  >
                    My Registration
                  </div>
                  <div
                    onClick={handleLogout}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleLogout();
                      }
                    }}
                    className="pf-header__dropdown-item"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              onClick={() => setShowAuth(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setShowAuth(true);
                }
              }}
              className="pf-header__login-btn"
              role="button"
              tabIndex={0}
            >
              <FiLogIn aria-hidden="true" />
              Login
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
