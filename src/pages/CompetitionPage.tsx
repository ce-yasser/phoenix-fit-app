import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { submitRegistration } from "@services/competitionApi";
import {
  useFetchPrograms,
  useProgramsData,
  useProgramsLoading,
} from "@store/hooks/programsHooks";
import type { August2026DtoInterface, ProgramCategory } from "@interfaces";
import { AxiosError } from "axios";

const initialFormData: August2026DtoInterface = {
  gender: "male",
  name: "",
  category: "strength",
  level: "intermediate",
  age: 18,
  phone: "",
};

const genderOptions: Array<{
  value: August2026DtoInterface["gender"];
  label: string;
}> = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const categoryOptions: Array<{
  value: August2026DtoInterface["category"];
  label: string;
}> = [
  { value: "strength", label: "Strength" },
  { value: "endurance", label: "Endurance" },
  { value: "flexibility", label: "Flexibility" },
];

const levelOptions: Array<{
  value: August2026DtoInterface["level"];
  label: string;
}> = [
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "elite", label: "Elite" },
];

function CompetitionPage() {
  const navigate = useNavigate();
  const programs = useProgramsData();
  const loading = useProgramsLoading();
  const fetchPrograms = useFetchPrograms();
  const [formData, setFormData] =
    useState<August2026DtoInterface>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!programs && !loading) {
      fetchPrograms();
    }
  }, [fetchPrograms, loading, programs]);

  const isJunior = formData.age < 18;

  const selectedProgram = useMemo<ProgramCategory | undefined>(() => {
    if (!programs) {
      return undefined;
    }

    if (isJunior) {
      return programs.kids;
    }

    const division = formData.gender === "male" ? programs.men : programs.women;
    return (
      division.find(
        (program) => program.title.toLowerCase() === formData.level,
      ) ?? division[0]
    );
  }, [formData.level, formData.gender, isJunior, programs]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      const next = { ...prev };

      if (name === "name") {
        next.name = value;
        return next;
      }

      if (name === "age") {
        const parsedAge = Number.parseInt(value, 10);
        const safeAge = Number.isNaN(parsedAge) ? 0 : parsedAge;

        next.age = safeAge;

        if (safeAge < 18) {
          next.category = "strength";
          next.level = "intermediate";
        } else {
          next.category = prev.category || "strength";
          next.level = prev.level;
        }

        return next;
      }

      if (name === "gender") {
        next.gender = value as August2026DtoInterface["gender"];
        return next;
      }

      if (name === "category") {
        next.category = value as August2026DtoInterface["category"];
        return next;
      }

      if (name === "level") {
        next.level = value as August2026DtoInterface["level"];
        return next;
      }

      return next;
    });
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 11);
    setFormData((prev) => ({ ...prev, phone: digits }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      ...formData,
      category: formData.age < 18 ? "strength" : formData.category,
    };

    if (!/^01\d{9}$/.test(payload.phone)) {
      setError("Phone number must be 11 digits and start with 01.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const competition = await submitRegistration(payload);
      navigate(`/competition/${competition.id}`, {
        state: { status: competition.status },
      });
    } catch (err) {
      setError(
        err instanceof AxiosError
          ? err?.response?.data?.message
          : "Registration failed. Please try again.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pf-competition">
      <section className="pf-competition__hero">
        <div className="pf-container">
          <div className="pf-competition__hero-inner">
            <p className="pf-home__hero-eyebrow">September 2026 Event</p>
            <h1>Competition Registration</h1>
          </div>
        </div>
      </section>

      <div className="pf-container pf-competition__layout">
        <section className="pf-competition__panel pf-competition__panel--form">
          <form className="pf-competition__form" onSubmit={handleSubmit}>
            <div className="pf-competition__field">
              <label className="pf-competition__label" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pf-competition__field">
              <p className="pf-competition__label">Gender</p>
              <div className="pf-competition__radio-group">
                {genderOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`pf-competition__radio-option ${formData.gender === option.value ? "is-selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={option.value}
                      checked={formData.gender === option.value}
                      onChange={handleChange}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pf-competition__field">
              <label className="pf-competition__label" htmlFor="age">
                Age
              </label>
              <input
                id="age"
                type="number"
                name="age"
                min={12}
                max={80}
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            {!isJunior && (
              <div className="pf-competition__field">
                <p className="pf-competition__label">Category</p>
                <div className="pf-competition__radio-group">
                  {categoryOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`pf-competition__radio-option ${formData.category === option.value ? "is-selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={option.value}
                        checked={formData.category === option.value}
                        onChange={handleChange}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {!isJunior && (
              <div className="pf-competition__field">
                <p className="pf-competition__label">Level</p>
                <div className="pf-competition__radio-group">
                  {levelOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`pf-competition__radio-option ${formData.level === option.value ? "is-selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="level"
                        value={option.value}
                        checked={formData.level === option.value}
                        onChange={handleChange}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="pf-competition__field">
              <label className="pf-competition__label" htmlFor="phone">
                Phone Number
              </label>
              <div className="pf-competition__phone-field">
                <span className="pf-competition__phone-prefix">+2</span>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  name="phone"
                  placeholder="01XXXXXXXXX"
                  value={formData.phone}
                  maxLength={11}
                  onChange={handlePhoneChange}
                  required
                />
              </div>
            </div>

            {isJunior && (
              <p className="pf-competition__note">
                Athletes under 18 are automatically placed in the junior division
                and compete in the Strength category.
              </p>
            )}

            {error && <p className="pf-competition__error">{error}</p>}

            <button
              className="pf-competition__submit"
              type="submit"
              disabled={isSubmitting || loading}
            >
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </button>
          </form>
        </section>

        <aside className="pf-competition__panel pf-competition__panel--program">
          <p className="pf-competition__eyebrow">Selected Program</p>
          {!programs || loading ? (
            <div className="pf-competition__program-loading">
              Loading program details...
            </div>
          ) : selectedProgram ? (
            <>
              <div className="pf-competition__program-head">
                <h2>
                  {isJunior
                    ? "Junior"
                    : formData.gender === "male"
                      ? "Men"
                      : "Women"}
                </h2>
                <span>EGP {selectedProgram.fee}</span>
              </div>

              <div className="pf-competition__program-card">
                <h3>{selectedProgram.title}</h3>

                <div className="pf-competition__program-section">
                  <h4>Qualifier</h4>
                  <ul>
                    {(selectedProgram.qualifier ?? []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="pf-competition__program-section">
                  <h4>Final</h4>
                  <ul>
                    {(selectedProgram.final ?? []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <p className="pf-competition__program-empty">
              No program available for this selection.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

export default CompetitionPage;
