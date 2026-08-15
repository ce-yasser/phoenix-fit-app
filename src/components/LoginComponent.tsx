import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestOtp, registerUser, verifyOtp } from "@services/authApi";
import type { VerifyPayload, RegisterPayload } from "@interfaces";

type Step = 'email' | 'otp' | 'register';

const LoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [accessToken, setAccessToken] = useState('');
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const requestOtpForCurrentEmail = async () => {
    const data = await requestOtp({ email });
    setTimeLeft(data.expiresAfter);
    setStep('otp');
    setOtp(['', '', '', '']);
    otpInputRefs.current[0]?.focus();
  };

  // Step 1: Submit email
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await requestOtpForCurrentEmail();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');

    try {
      await requestOtpForCurrentEmail();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];

    if (value.length > 1) {
      // Handle paste
      const pastedValues = value.split('').slice(0, 4 - index);
      pastedValues.forEach((char, i) => {
        if (index + i < 4) {
          newOtp[index + i] = char;
        }
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + pastedValues.length, 3);
      otpInputRefs.current[nextIndex]?.focus();
    } else {
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        otpInputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle OTP backspace
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Step 2: Submit OTP
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');

    if (otpString.length !== 4) {
      setError('Please enter a 4-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload: VerifyPayload = { email, otp: otpString };
      const data = await verifyOtp(payload);
      setAccessToken(data.accessToken);

      if (data.isRegistered) {
        localStorage.setItem('accessToken', data.accessToken);
        navigate('/');
      } else {
        setStep('register');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Submit registration
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.length === 0 || name.length > 32) {
      setError('Name must be between 1 and 32 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload: RegisterPayload = { name };
      const data = await registerUser(payload, accessToken);

      if (data.success) {
        localStorage.setItem('accessToken', accessToken);
        navigate('/');
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {error && <div className="error-message">{error}</div>}

      {step === "email" && (
        <form onSubmit={handleEmailSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleOtpSubmit}>
          <h2>Verify OTP</h2>
          <p>Enter the 4-digit OTP sent to {email}</p>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  otpInputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
              />
            ))}
          </div>
          <>
            {timeLeft > 0 ? (
              <p className="countdown">
                Resend code <strong>{timeLeft} seconds</strong>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className="resend-otp-btn"
              >
                {loading ? "Sending..." : "Resend OTP?"}
              </button>
            )}
            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        </form>
      )}

      {step === "register" && (
        <form onSubmit={handleRegisterSubmit}>
          <h2>Complete Registration</h2>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 32))}
            maxLength={32}
            required
          />
          <p className="char-count">{name.length}/32</p>
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginComponent;
