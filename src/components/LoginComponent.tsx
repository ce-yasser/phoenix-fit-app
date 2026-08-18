import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { requestOtp, registerUser, verifyOtp } from "@services/userService";
import type { VerifyPayload, RegisterPayload } from "@interfaces";
import LoaderComponent from "@components/LoaderComponent";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  useSetShowAuth,
  useLogin,
  useSetUserData,
} from "@store/hooks/userHooks";
import { getUserData } from "@services/userService";
import { AxiosError } from "axios";
type Step = "email" | "otp" | "register";

const LoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const setShowAuth = useSetShowAuth();
  const login = useLogin();
  const setUserData = useSetUserData();

  const isAuthPage =
    location.pathname.replace(/^\/+/, "").replace(/\//g, "-") === "auth";
  const redirectTo =
    new URLSearchParams(location.search).get("redirectTo") ?? "/";

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const closeLoginForm = () => {
    setShowAuth(false);
    if (isAuthPage) {
      navigate("/", { replace: true });
    }
  };
  const requestOtpForCurrentEmail = async () => {
    const data = await requestOtp({ email });
    setTimeLeft(data.expiresAfter);
    setOtp(data.otp ?? "");
    setStep("otp");
  };

  // Step 1: Submit email
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await requestOtpForCurrentEmail();
    } catch (err) {
      setError(
        err instanceof AxiosError
          ? err?.response?.data?.message
          : "An error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      await requestOtpForCurrentEmail();
    } catch (err) {
      setError(
        err instanceof AxiosError
          ? err?.response?.data?.message
          : "Failed to resend OTP",
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit OTP
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp;

    if (!/^\d{4}$/.test(otpString)) {
      setError("Please enter a 4-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload: VerifyPayload = { email, otp: otpString };
      const data = await verifyOtp(payload);
      setAccessToken(data.accessToken);

      if (data.isRegistered) {
        loginUser(data.accessToken);
        setShowAuth(false);
        navigate(redirectTo);
      } else {
        setStep("register");
      }
    } catch (err) {
      setError(
        err instanceof AxiosError
          ? err?.response?.data?.message
          : "An error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Submit registration
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.length === 0 || name.length > 32) {
      setError("Name must be between 1 and 32 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload: RegisterPayload = { name };
      const data = await registerUser(payload, accessToken);

      if (data.success) {
        loginUser(accessToken);
        setShowAuth(false);
        navigate(redirectTo);
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      setError(
        err instanceof AxiosError
          ? err?.response?.data?.message
          : "An error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (token: string) => {
    login(token);
    const data = await getUserData();
    setUserData(data);
  };

  return (
    <div
      className={`pf-login pf-login--${step} ${isAuthPage ? "pf-login--auth" : ""}`}
    >
      <div className="pf-login__dialog">
        <div className="pf-login__header">
          <img src="/logo.png" alt="Phoenix Fit" className="pf-login__img" />
          <div onClick={closeLoginForm} className="pf-login__close">
            <IoIosCloseCircleOutline />
          </div>
        </div>
        {["email", "register"].includes(step) && (
          <aside className="pf-login__side" aria-hidden="true">
            <img src="/logo.png" alt="Phoenix Fit" className="pf-login__logo" />
            <h2 className="pf-login__headline">
              {step === "email"
                ? "Get Ready To Compete"
                : "Welcome to Phoenix Fit!"}
            </h2>
            <p className="pf-login__copy">
              {step === "email"
                ? "Sign in to continue your Phoenix Fit Calisthenics journey and manage your competition registration."
                : "Complete your registration and join the action!"}
            </p>
          </aside>
        )}

        <section className="pf-login__panel">
          {error && <p className="pf-login__error">{error}</p>}

          {step === "email" && (
            <form className="pf-login__form" onSubmit={handleEmailSubmit}>
              <h1 className="pf-login__title">Email Address</h1>
              <p className="pf-login__text">
                Enter your email to sign in or create a new account.
              </p>

              <label htmlFor="email" className="pf-login__label">
                Email
              </label>
              <input
                id="email"
                className="pf-login__email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                className="pf-login__submit"
                type="submit"
                disabled={loading || !email}
              >
                {loading ? <LoaderComponent /> : "Continue"}
              </button>
            </form>
          )}

          {step === "otp" && (
            <form className="pf-login__form" onSubmit={handleOtpSubmit}>
              <h1 className="pf-login__title">Verify OTP</h1>
              <p className="pf-login__text">
                Enter the 4-digit code sent to {email}.
              </p>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={null}
                inputType="tel"
                shouldAutoFocus
                skipDefaultStyles
                containerStyle="pf-login__otp"
                renderInput={(props) => <input {...props} />}
              />

              {timeLeft > 0 ? (
                <p className="pf-login__countdown">
                  Resend code in <strong>{timeLeft}s</strong>
                </p>
              ) : (
                <p className="pf-login__countdown">
                  Didn't receive OTP?{" "}
                  <button
                    type="button"
                    className="pf-login__resend"
                    disabled={loading}
                    onClick={handleResendOtp}
                  >
                    Send again
                  </button>
                </p>
              )}

              <button
                className="pf-login__submit"
                type="submit"
                disabled={loading || otp.length < 4}
              >
                {loading ? <LoaderComponent /> : "Verify OTP"}
              </button>
            </form>
          )}

          {step === "register" && (
            <form className="pf-login__form" onSubmit={handleRegisterSubmit}>
              <h1 className="pf-login__title">Finishing Sign Up</h1>

              <input
                id="name"
                className="pf-login__name"
                type="text"
                placeholder="First name"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 32))}
                maxLength={32}
                required
              />

              <button
                className="pf-login__submit"
                type="submit"
                disabled={loading || !name.trim()}
              >
                {loading ? <LoaderComponent /> : "Register"}
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default LoginComponent;
