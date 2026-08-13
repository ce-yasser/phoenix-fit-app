import { AiOutlineCopyright } from "react-icons/ai";

import { FaInstagram, FaFacebookF } from "react-icons/fa";

function FooterComponent() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pf-footer">
      <div className="pf-container pf-footer__inner">
        <p className="pf-footer__copyright">
          <AiOutlineCopyright aria-hidden="true" />
          {currentYear} Phoenix Fit. All rights reserved.
        </p>

        <nav
          className="pf-footer__social"
          aria-label="Phoenix Fit social media"
        >
          <a
            href="https://www.instagram.com/phoenixfit9/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram aria-hidden="true" />
            Instagram
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100087525164902"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebookF aria-hidden="true" />
            Facebook
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default FooterComponent;
