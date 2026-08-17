import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiAward,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiArrowRight,
  FiUsers,
  FiHeart,
  FiMail,
  FiSend,
} from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineBoy, MdOutlineGirl } from "react-icons/md";
import { PiBarbellLight } from "react-icons/pi";
import type { ProgramCategory } from "@interfaces";
import { useFetchPrograms, useProgramsData, useProgramsLoading } from "@store/hooks/programsHooks";

type Division = "men" | "women";

const judges = [
  { name: "Ibrahim Issa", instagram: "https://instagram.com/ibrahim_issa" },
  { name: "Mahmoud Mersa", instagram: "https://instagram.com/mahmoud_mersa" },
  { name: "Mohamed Elaraby", instagram: "https://instagram.com/mohamed_elaraby" },
  { name: "Rahma Sakr", instagram: "https://instagram.com/rahma_sakr" },
  { name: "Ahmed Badran", instagram: "https://instagram.com/ahmed_badran" },
  { name: "Ashraf Adel", instagram: "https://instagram.com/ashraf_adel" },
  { name: "Osama Tarek", instagram: "https://instagram.com/osama_tarek" },
];

function ProgramColumn({
  title,
  categories,
  isHiddenOnMobile,
}: {
  title: string;
  categories: ProgramCategory[] | undefined;
  isHiddenOnMobile: boolean;
}) {
  if (!categories) {
    return;
  }
  return (
    <article className={`pf-home__program-column ${isHiddenOnMobile ? "is-hidden-mobile" : ""}`}>
      <h3 className="pf-home__program-title">{title}</h3>

      <div className="pf-home__category-list">
        {categories.map((category) => (
          <div className="pf-home__category-card" key={`${title}-${category.title}`}>
            <div className="pf-home__category-head">
              <h4>{category.title}</h4>
              <span className="pf-home__fee">EGP {category.fee}</span>
            </div>

            <p className="pf-home__category-note">Two-stage format: qualifier then final for successful athletes.</p>

            <div className="pf-home__challenge-block">
              <h5>{category.title} Challenge</h5>
              <ul>
                {category.qualifier.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="pf-home__challenge-block">
              <h5>{category.title} Final</h5>
              <ul>
                {category.final.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function HomePage() {
  const [activeDivision, setActiveDivision] = useState<Division>("men");
  const programs = useProgramsData();
  const loading = useProgramsLoading();
  const fetchPrograms = useFetchPrograms();

  useEffect(() => {
    if (!programs &&!loading) {
      fetchPrograms();
    }
  }, [loading]);

  return (
    <main className="pf-home">
      <section className="pf-home__hero">
        <div className="pf-container">
          <div className="pf-home__hero-layout">
            <div className="pf-home__hero-content">
              <p className="pf-home__hero-eyebrow">September 2026 Event</p>
              <h1>Phoenix Fit Calisthenics Competition</h1>
              <p className="pf-home__hero-lead">
                Join us at Antoniades Gardens, Alexandria, on 17 September 2026.{" "}
                <br />
                Event starts at 10:00 AM. Official category start times will be
                shared soon.
              </p>

              <div className="pf-home__event-meta">
                <span className="pf-home__meta-item">
                  <FiCalendar className="pf-home__meta-icon" aria-hidden="true" />
                  17 September 2026
                </span>
                <span className="pf-home__meta-item">
                  <FiClock className="pf-home__meta-icon" aria-hidden="true" />
                  Starts 10:00 AM
                </span>
                <span className="pf-home__meta-item">
                  <FiUsers className="pf-home__meta-icon" aria-hidden="true" />
                  Men & Women: 18+ years
                </span>
                <span className="pf-home__meta-item">
                  <FiHeart className="pf-home__meta-icon" aria-hidden="true" />
                  Kids competition: 12+ years
                </span>
              </div>

              <div className="pf-home__hero-actions">
                <Link to="/competition" className="pf-home__cta-btn">
                  <FiAward aria-hidden="true" />
                  Register Now
                </Link>
                <a
                  href="https://maps.app.goo.gl/zfvHuW3muB4dnvTY9"
                  className="pf-home__location-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiMapPin aria-hidden="true" />
                  View Location
                  <FiArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="pf-home__hero-logo-col" aria-hidden="true">
              <img src="/logo.png" alt="" className="pf-home__hero-logo" />
            </div>
          </div>
        </div>
      </section>

      <section className="pf-home__program">
        <div className="pf-container">
          <h2 className="pf-home__section-title">
            <PiBarbellLight aria-hidden="true" />
            Competition Program
          </h2>
          <p className="pf-text-muted">
            All categories include a qualifier challenge and a final challenge
            for successful competitors.
          </p>

          <div
            className="pf-home__tabs"
            role="tablist"
            aria-label="Competition divisions"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeDivision === "men"}
              className={`pf-home__tab ${activeDivision === "men" ? "is-active" : ""}`}
              onClick={() => setActiveDivision("men")}
            >
              <MdOutlineBoy aria-hidden="true" />
              Men
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeDivision === "women"}
              className={`pf-home__tab ${activeDivision === "women" ? "is-active" : ""}`}
              onClick={() => setActiveDivision("women")}
            >
              <MdOutlineGirl aria-hidden="true" />
              Women
            </button>
          </div>

          <div className="pf-home__program-grid">
            <ProgramColumn
              title="Men"
              categories={programs?.men}
              isHiddenOnMobile={activeDivision !== "men"}
            />
            <ProgramColumn
              title="Women"
              categories={programs?.women}
              isHiddenOnMobile={activeDivision !== "women"}
            />
          </div>
        </div>
      </section>

      <section className="pf-home__kids">
        <div className="pf-container">
        <div className="pf-home__kids-inner">
          <h2 className="pf-home__section-title">
            <FiHeart aria-hidden="true" />
            Kids Competition (12+)
          </h2>
          <p className="pf-home__kids-fee">
            Registration fee: EGP 600 · Built for confidence, movement, and fun.
          </p>
          <div className="pf-home__kids-grid">
            <div className="pf-home__kids-card">
              <FiAward aria-hidden="true" />
              10 jumping jacks
            </div>
            <div className="pf-home__kids-card">
              <FiAward aria-hidden="true" />5 pull-ups
            </div>
            <div className="pf-home__kids-card">
              <FiAward aria-hidden="true" />
              20 bodyweight squats
            </div>
            <div className="pf-home__kids-card">
              <FiAward aria-hidden="true" />
              100m running challenge
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="pf-home__registration">
        <div className="pf-container pf-home__registration-inner">
          <p className="pf-home__registration-status">Registration Is Live</p>
          <h2>Secure Your Spot Before Categories Fill Up</h2>
          <p>
            Registration is currently open for Men and Women (18+) and Kids
            (12+). Complete your form now to reserve your place in the
            competition lineup.
          </p>
          <Link
            to="/competition"
            className="pf-home__cta-btn pf-home__cta-btn--registration"
          >
            <FiAward aria-hidden="true" />
            Register Now
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="pf-home__judges">
        <div className="pf-container">
          <h2 className="pf-home__section-title">
            <FiUsers aria-hidden="true" />
            Meet The Judges
          </h2>
          <div className="pf-row pf-justify-content-center pf-home__judges-row">
            {judges.map((judge, index) => (
              <div
                className={`pf-home__judges-col pf-col-6 pf-col-md-6 pf-col-lg-3`}
                key={judge.name}
              >
                <article className="pf-home__judge-card">
                  <img
                    src={`/home/judges/judge-${String(index + 1).padStart(2, "0")}.jpg`}
                    alt={judge.name}
                    loading="lazy"
                  />
                  <div className="pf-home__judge-meta">
                    <a
                      href={judge.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="pf-home__judge-instagram"
                      aria-label={`${judge.name} on Instagram`}
                    >
                      <FaInstagram aria-hidden="true" />
                    </a>
                    <h4>{judge.name}</h4>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pf-home__contact">
        <div className="pf-container pf-home__contact-grid">
          <div className="pf-home__contact-form-wrap">
            <h2 className="pf-home__section-title">
              <FiMail aria-hidden="true" />
              Contact Us
            </h2>
            <p className="pf-text-muted">
              For sponsorships, team registrations, or partnerships, send us a
              message.
            </p>
            <form className="pf-home__contact-form">
              <div className="pf-home__contact-field-grid">
                <div>
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                placeholder="Sponsorship, team entry, or general inquiry"
                required
              />

              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell us what you need and we will get back to you shortly."
                rows={5}
                required
              />

              <button type="submit">
                <FiSend aria-hidden="true" />
                Send
              </button>
            </form>
          </div>

          <div className="pf-home__map-wrap">
            <iframe
              title="Antoniades Gardens location"
              src="https://www.google.com/maps?q=Antoniades%20Gardens%2C%20Alexandria&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://maps.app.goo.gl/zfvHuW3muB4dnvTY9"
              target="_blank"
              rel="noreferrer"
            >
              <FiMapPin aria-hidden="true" />
              Open in Google Maps
              <FiArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;