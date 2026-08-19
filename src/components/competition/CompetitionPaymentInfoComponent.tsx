import { IoCopyOutline } from "react-icons/io5";
import { useState } from "react";

function CompetitionPaymentInfoComponent({ fee }: { fee: number }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(import.meta.env.VITE_INSTAPAY_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the number is still selectable/visible.
    }
  };
  return (
    <section className="pf-instapay">
      <h3>Registration Fee</h3>
      <p className="pf-instapay__fee">{fee} EGP</p>
      <p className="pf-instapay__fee-note">
        Transfer the exact amount to the InstaPay account below, then upload
        your payment proof so we can confirm your registration.
      </p>

      <div className="pf-instapay__card">
        <div onClick={handleCopy} className="pf-instapay__copy">
          <span className="pf-instapay__label">InstaPay Account</span>
          <span className="pf-instapay__value">
            {import.meta.env.VITE_INSTAPAY_NUMBER} <IoCopyOutline />
          </span>
          {copied && <span className="pf-instapay__tooltip">Copied</span>}
        </div>

        <a
          className="pf-btn pf-btn-primary pf-btn-lg pf-instapay__pay-btn"
          href={import.meta.env.VITE_INSTAPAY_LINK}
          target="_blank"
          rel="noreferrer"
        >
          Pay Now
        </a>
      </div>
    </section>
  );
}

export default CompetitionPaymentInfoComponent;
