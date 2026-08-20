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
import CompetitionPaymentInfoComponent from "@components/competition/CompetitionPaymentInfoComponent";
import CompetitionProgramComponent from "@components/competition/CompetitionProgramComponent";

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
    <div className="pf-reg__main pf-col-lg-8 pf-col-md-7">
      <p className="pf-eyebrow">Registration</p>
      <h1 className="pf-reg__title">Complete Your Registration</h1>
      <p className="pf-text-lead pf-reg__intro">
        {competition.data.gender} &middot; {competition.data.level}
      </p>

      <div className="pf-reg__status">
        <span
          className={
            `pf-status-badge pf-status-badge--${competition.status.toLowerCase()}` 
          }
        >
          <span className="pf-status-badge__dot" />
          {competition.status}
        </span>
        <span className="pf-reg__status-note">
          {status === "pending"
            ? "We\u2019ll confirm your spot once payment is verified."
            : "Your registration has been created. Complete payment to confirm your spot."}
        </span>
      </div>

      {competition.status === "CREATED" && (
        <>
          <CompetitionPaymentInfoComponent fee={selectedProgram.fee} />

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
                className="pf-reg__submit"
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
        </>
      )}

      <CompetitionProgramComponent selectedProgram={selectedProgram} />
    </div>
  );
}

export default CompetitionDetailComponent;
