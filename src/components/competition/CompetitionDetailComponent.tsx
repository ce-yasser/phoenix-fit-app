import type {
  CompetitionData,
  ProgramCategory,
  ProgramsResponse,
} from "@interfaces";
import {
  cancelCompetitionRegistration,
  uploadCompetitionPayment,
} from "@services/competitionApi";
import { useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { IoMdFlame } from "react-icons/io";
import CompetitionPaymentInfoComponent from "@components/competition/CompetitionPaymentInfoComponent";

const statusLabels: Record<string, string> = {
  CREATED: "Created",
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  REJECTED: "Rejected",
  CANCELED: "Cancelled",
  CANCELLED: "Cancelled",
};

function CompetitionDetailComponent({
  competition,
  selectedProgram,
}: {
  competition: CompetitionData;
  selectedProgram: ProgramCategory | null;
}) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);


   const handleFile = (fileList) => {
     if (fileList && fileList[0]) setFile(fileList[0]);
   };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) return;
    // Wire this up to your actual upload endpoint.
    console.log("Payment proof submitted:", file.name);
  };
  if (!selectedProgram) {
    return null;
  }
  return (
    <div className="pf-col-lg-8 pf-col-md-7">
      <div className="pf-reg__main">
        <p className="pf-eyebrow">Registration</p>
        <h1>Complete Your Registration</h1>
        <p className="pf-text-lead pf-reg__intro">
          {competition.data.gender} &middot; {competition.data.level}
        </p>

        <div className="pf-reg__status">
          <span
            className={
              "pf-status-badge" +
              (status === "pending"
                ? " pf-status-badge--pending"
                : " pf-status-badge--created")
            }
          >
            <span className="pf-status-badge__dot" />
            {status === "pending" ? "Pending Review" : "Created"}
          </span>
          <span className="pf-reg__status-note">
            {status === "pending"
              ? "We\u2019ll confirm your spot once payment is verified."
              : "Your registration has been created. Complete payment to confirm your spot."}
          </span>
        </div>

        <CompetitionPaymentInfoComponent fee={selectedProgram.fee} />

        <section className="pf-reg__card">
          <h3>Competition Program</h3>

          <div className="pf-reg__round">
            <p className="pf-reg__round-title">Qualifier</p>
            <ul className="pf-reg__round-list">
              {selectedProgram.qualifier &&
                selectedProgram.qualifier.map((item) => (
                  <li key={item}>{item}</li>
                ))}
            </ul>
          </div>

          <div className="pf-reg__bracket" role="presentation">
            <span className="pf-reg__bracket-line" />
            <span className="pf-reg__bracket-badge">
              <IoMdFlame />
              Rise to the Final
            </span>
            <span className="pf-reg__bracket-line" />
          </div>

          <div className="pf-reg__round">
            <p className="pf-reg__round-title">Final</p>
            <ul className="pf-reg__round-list">
              {selectedProgram.final.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pf-reg__card">
          <h3>Upload Payment Proof</h3>

          <form onSubmit={handleSubmit}>
            <label
              className={
                "pf-upload" + (isDragging ? " pf-upload--dragging" : "")
              }
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFile(e.dataTransfer.files);
              }}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFile(e.target.files)}
                hidden
              />
              <BsUpload />
              {file ? (
                <>
                  <span className="pf-upload__filename">{file.name}</span>
                  <span className="pf-upload__hint">
                    Click or drop to replace
                  </span>
                </>
              ) : (
                <>
                  <span className="pf-upload__title">
                    Drop your screenshot or receipt here
                  </span>
                  <span className="pf-upload__hint">
                    or click to browse &middot; PNG, JPG or PDF
                  </span>
                </>
              )}
            </label>

            <button
              type="submit"
              className="pf-btn pf-btn-primary pf-btn-lg pf-reg__submit"
              disabled={!file}
            >
              Submit Payment Proof
            </button>

            {status === "pending" && (
              <p className="pf-reg__success" role="status">
                Payment proof submitted &mdash; we&rsquo;ll verify it and
                confirm your registration shortly.
              </p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}

export default CompetitionDetailComponent;
