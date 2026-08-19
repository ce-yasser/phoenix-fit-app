import { IoLogoWhatsapp } from "react-icons/io";
import type { August2026Interface, ProgramCategory } from "@interfaces";
import { Link } from "react-router-dom";
import { useMemo } from "react";

function CompetitionSummaryComponent({
  details,
  selectedProgram,
}: {
  details: August2026Interface;
  selectedProgram: ProgramCategory | null;
}) {
  const isJunior = useMemo(() => {
    return details.age < 18;
  }, [details.age]);
  if (!selectedProgram) {
    return null;
  }
  return (
    <aside className="pf-reg-sidebar pf-col-lg-4 pf-col-md-5">
      <div className="pf-reg-sidebar__card">
        <Link
          className="pf-btn pf-btn-outline-secondary pf-btn-sm pf-reg-sidebar__back"
          to="/"
        >
          &larr; Back to Home
        </Link>

        <h4 className="pf-reg-sidebar__title">
          {details.name}
          <br />
          <small>
            Phone: <strong>+2{details.phone}</strong>
          </small>
        </h4>

        <dl className="pf-reg-sidebar__summary">
          <div>
            <dt>Date</dt>
            <dd>{import.meta.env.VITE_EVENT_DATE}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{import.meta.env.VITE_EVENT_TIME}</dd>
          </div>
          <div>
            <dt>Venue</dt>
            <dd>{import.meta.env.VITE_EVENT_VENUE}</dd>
          </div>
          <div>
            <dt>Gender</dt>
            <dd>{details.gender}</dd>
          </div>
          <div>
            <dt>Age</dt>
            <dd>{details.age}</dd>
          </div>
          {!isJunior && (
            <div>
              <dt>Category</dt>
              <dd>{details.category}</dd>
            </div>
          )}
          <div>
            <dt>Level</dt>
            <dd>{isJunior ? "Junior" : details.level}</dd>
          </div>
        </dl>

        <div className="pf-reg-sidebar__total">
          <span>Amount to Pay</span>
          <strong>{selectedProgram.fee} EGP</strong>
        </div>
      </div>
      <a
        className="pf-reg-sidebar__support"
        href={`https://wa.me/${import.meta.env.VITE_SUPPORT_PHONE_NUMBER}?text=Hello%20Phoenix%20Fitness%20Team,%20I%20need%20support%20with%20my%20registration.`}
        target="_blank"
        rel="noreferrer"
      >
        <div className="pf-reg-sidebar__support-icon">
          <IoLogoWhatsapp />
        </div>
        <p>
          If you need any further support, please reach us on WhatsApp{" "}
          <strong>{import.meta.env.VITE_SUPPORT_PHONE_NUMBER}</strong>.
        </p>
      </a>
    </aside>
  );
}

export default CompetitionSummaryComponent;
