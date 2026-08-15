import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestOtp, verifyOtp } from "@services/authApi";
import LoginComponent from "@components/LoginComponent";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expiresAfter, setExpiresAfter] = useState<number>(0);
  const expiryInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    // Prevent creating duplicate intervals if clicked multiple times
    if (expiryInterval.current !== null) return;

    expiryInterval.current = setInterval(() => {
      setExpiresAfter((prev) => {
        if (prev <= 1) {
          stopTimer();
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (expiryInterval.current !== null) {
      clearInterval(expiryInterval.current);
      expiryInterval.current = null; // Reset the ref
    }
  };

  useEffect(() => {
    return () => {
      if (expiryInterval.current !== null) {
        clearInterval(expiryInterval.current);
        expiryInterval.current = null; // Reset the ref
      }
    };
  }, []);

  const handleRequestOtp = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await requestOtp({ email });
      console.log('response:', response);
      setExpiresAfter(response.expiresAfter);
      setStep("otp");
      startTimer();
    } catch {
      setError("Failed to send OTP. Please check your email and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await verifyOtp({ email, otp });
      localStorage.setItem("accessToken", response.accessToken);
      navigate("/competition");
    } catch {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", textAlign: "center" }}>
      <h2>Login</h2>
      <p>OTP will expires after {expiresAfter} seconds</p>

      {step === "email" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRequestOtp();
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={loading || !email}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {step === "otp" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerifyOtp();
          }}
        >
          <p>Enter the OTP sent to {email}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit" disabled={loading || !otp}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      <LoginComponent />
    </div>
  );
}

export default LoginPage;
