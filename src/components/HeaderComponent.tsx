import { Link } from "react-router-dom";

function HeaderComponent() {
  return (
    <header className="pf-header">
      <div className="pf-container">
        <div className="pf-header__inner">
          <Link to="/" className="pf-header__brand" aria-label="Go to home page">
            <img src="/logo.png" alt="Phoenix React" className="pf-header__logo" />
          </Link>

          <Link to="/login" className="pf-header__login-btn">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
