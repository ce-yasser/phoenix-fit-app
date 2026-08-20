import type {
  CompetitionData,
  ProgramCategory,
} from "@interfaces";
import { uploadCompetitionPayment } from "@services/competitionApi";
import { useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import CompetitionPaymentInfoComponent from "@components/competition/CompetitionPaymentInfoComponent";
import CompetitionProgramComponent from "@components/competition/CompetitionProgramComponent";
import { AxiosError } from "axios";


const allowedPaymentFileTypes = ["image/png", "image/jpeg", "image/jpg"];

const isValidPaymentFile = (candidate: File) => {
  const normalizedName = candidate.name.toLowerCase();
  return (
    allowedPaymentFileTypes.includes(candidate.type) ||
    /\.(png|jpe?g)$/i.test(normalizedName)
  );
};

const competitionStatusMessages: Record<string, string> = {
  PENDING: "We\u2019ll confirm your spot once payment is verified.",
  CREATED: "Your registration has been created. Complete payment to confirm your spot.",
  CONFIRMED: "Your registration is confirmed. We look forward to seeing you at the competition!",
  REJECTED: "Your registration has been rejected. Please contact support for more information.",
};

const competitionStatusTitles: Record<string, string> = {
  PENDING: "Your Registration is Pending",
  CREATED: "Complete Your Registration",
  CONFIRMED: "Thank You for Registering",
  REJECTED: "Registration Rejected",
};

function CompetitionDetailComponent({
  competition,
  selectedProgram,
  setCompetition,
}: {
  competition: CompetitionData;
  selectedProgram: ProgramCategory | null;
  setCompetition: React.Dispatch<React.SetStateAction<CompetitionData | null>>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (fileList: FileList | null) => {
    const nextFile = fileList?.[0];

    if (!nextFile) {
      return;
    }

    if (!isValidPaymentFile(nextFile)) {
      setError("Only PNG and JPG files are allowed.");
      setFile(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      return;
    }

    setError(null);
    setFile(nextFile);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      return;
    }

    if (!isValidPaymentFile(file)) {
      setError("Only PNG and JPG files are allowed.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      const uploadedCompetition = await uploadCompetitionPayment(
        competition.id,
        file,
        (percent) => {
          setUploadProgress(percent);
        },
      );

      setCompetition((previousCompetition) => {
        if (!previousCompetition) {
          return uploadedCompetition;
        }

        return {
          ...previousCompetition,
          ...uploadedCompetition,
          data: uploadedCompetition.data ?? previousCompetition.data,
        };
      });

      setUploadProgress(100);
      setFile(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (err) {
      setError(err instanceof AxiosError ? err?.response?.data?.message : "Failed to upload payment proof. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!selectedProgram) {
    return null;
  }

  return (
    <div className="pf-reg__main pf-col-lg-8 pf-col-md-7">
      <p className="pf-eyebrow">Registration</p>
      <h1 className="pf-reg__title">{competitionStatusTitles[competition.status] || "Registration"}</h1>
      <p className="pf-text-lead pf-reg__intro">
        {competition.data.gender} &middot; {competition.data.level}
      </p>

      <div className="pf-reg__status">
        <span
          className={`pf-status-badge pf-status-badge--${competition.status.toLowerCase()}`}
        >
          <span className="pf-status-badge__dot" />
          {competition.status}
        </span>
        <span className="pf-reg__status-note">
          {competitionStatusMessages[competition.status] || "Your registration status is currently unknown."}
        </span>
      </div>

      {competition.status === "CREATED" && (
        <>
          <CompetitionPaymentInfoComponent fee={selectedProgram.fee} />

          <section className="pf-reg__card">
            <h3>Upload Payment Proof</h3>

            <form onSubmit={handleSubmit}>
              <div
                className={`pf-upload-progress ${isUploading ? "is-visible" : ""}`}
                aria-live="polite"
              >
                <div className="pf-upload-progress__track">
                  <span
                    className="pf-upload-progress__bar"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <small>
                  {isUploading
                    ? `Uploading payment proof... ${uploadProgress}%`
                    : isDragging
                      ? "Drop your file here"
                      : "PNG and JPG only"}
                </small>
              </div>

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
                  accept="image/png,image/jpeg,image/jpg"
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
                      or click to browse &middot; PNG, JPG
                    </span>
                  </>
                )}
              </label>

              {error && (
                <p className="pf-reg__error" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="pf-reg__submit"
                disabled={!file || isUploading}
              >
                {isUploading ? "Uploading..." : "Submit Payment Proof"}
              </button>
            </form>
          </section>
        </>
      )}

      <CompetitionProgramComponent selectedProgram={selectedProgram} />
    </div>
  );
}

export default CompetitionDetailComponent;
