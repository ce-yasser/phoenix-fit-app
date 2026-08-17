import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { submitRegistration } from "@services/competitionApi";
import type { August2026DtoInterface } from "@interfaces";

const initialFormData: August2026DtoInterface = {
  gender: "male",
  name: "",
  category: "strength",
  level: "beginner",
  age: 12,
  phone: "",
};

function CompetitionPage() {
  const [formData, setFormData] = useState<August2026DtoInterface>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const next = { ...prev };

      if (name === "age") {
        const parsedAge = Number(value);
        next.age = Number.isNaN(parsedAge) ? 0 : parsedAge;

        if (next.age <= 15) {
          next.level = "beginner";
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

      if (name === "name") {
        next.name = value;
      }

      if (name === "phone") {
        next.phone = value;
      }

      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const phonePattern = /^01\d{9}$/;
    if (!phonePattern.test(formData.phone)) {
      setError("Phone number must be 11 digits and start with 01.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const competition = await submitRegistration(formData);
      console.log('competition', competition);
      // navigate("/competition?success=true");
    } catch (err) {
      console.log(err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isJunior = formData.age <= 15;

  if (success) {
    return (
      <div style={{ maxWidth: 500, margin: "80px auto", textAlign: "center" }}>
        <h2>Registration submitted!</h2>
        <p>Your registration is pending admin approval.</p>
      </div>
    );
  }

  return (
    <div className="pf-container">
      <h2>Competition Registration</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="name">Name</label>
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

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            name="phone"
            pattern="^01\d{9}$"
            minLength={11}
            maxLength={11}
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            name="age"
            min={12}
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="strength">Strength</option>
            <option value="endurance">Endurance</option>
            <option value="flexibility">Flexibility</option>
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="level">Level</label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          >
            <option value="beginner">Beginner</option>
            {!isJunior && (
              <>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </>
            )}
          </select>
        </div>

        {isJunior && (
          <p style={{ fontSize: 12, color: "gray" }}>
            Participants age 15 and under are automatically set to Beginner.
          </p>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Registration"}
        </button>
      </form>
    </div>
  );
}

export default CompetitionPage;
