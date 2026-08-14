import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

function HeaderComponent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

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

  const headerStateClass = isHomePage && !isScrolled ? "is-transparent" : "is-scrolled";

  return (
    <header className={`pf-header ${headerStateClass}`}>
      <div className="pf-container">
        <div className="pf-header__inner">
          <div className="pf-header__brand" aria-label="Phoenix brand">
            <Link to="/" className="pf-header__brand-link">
              <img src="/logo.png" alt="Phoenix React" className="pf-header__logo" />
            </Link>
          </div>

          <Link to="/login" className="pf-header__login-btn">
            <FiLogIn aria-hidden="true" />
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
