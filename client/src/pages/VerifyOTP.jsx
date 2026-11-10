
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  verifyEmailOTP,
  resendVerificationOTP,
} from "../services/authService.js";

function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);

  // Resend countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setTimeout(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsVerifying(true);

    try {
      const response = await verifyEmailOTP(email, otp);

      setMessage(response.message);

      navigate("/account", {
        replace: true,
        state: { showLogin: true },
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "OTP verification failed. Please try again.",
      );
    } finally {
      setIsVerifying(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setError("");
    setMessage("");

    setIsResending(true);

    try {
      const response = await resendVerificationOTP(email);

      setMessage(response.message);
      setOtp("");
      setResendCooldown(60);
    } catch (error) {
      const errorData = error.response?.data;

      if (
        error.response?.status === 429 &&
        errorData?.retryAfter
      ) {
        setResendCooldown(errorData.retryAfter);
      }

      setError(
        errorData?.message ||
          "Unable to resend OTP. Please try again.",
      );
    } finally {
      setIsResending(false);
    }
  };

  // Handle missing email
  if (!email) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4">
        <h2 className="text-xl font-semibold text-primary-text">
          Verification email not found
        </h2>

        <p className="text-secondary-text text-sm text-center">
          Please register again or return to the login page.
        </p>

        <Link
          to="/account"
          className="text-tertiary-text underline"
        >
          Go to Account
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-secondary-bg border border-primary-border rounded-lg p-6 sm:p-8 flex flex-col gap-5">

        <div className="text-center flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-primary-text">
            Verify Your Email
          </h1>

          <p className="text-sm text-secondary-text">
            We've sent a 6-digit verification code to
          </p>

          <p className="text-tertiary-text font-medium break-all">
            {email}
          </p>
        </div>

        <form
          onSubmit={handleVerifyOTP}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="otp"
              className="text-sm text-secondary-text"
            >
              Enter verification code
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="Enter 6-digit OTP"
              className="w-full border border-primary-border rounded px-3 py-3 text-center text-xl tracking-[8px] text-primary-text focus:outline-none focus:border-amber-600"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          {message && (
            <p className="text-green-500 text-sm">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isVerifying || otp.length !== 6}
            className="w-full py-3 bg-btn text-dark rounded cursor-pointer disabled:opacity-50"
          >
            {isVerifying ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-secondary-text">
            Didn't receive the code?
          </p>

          <button
            type="button"
            onClick={handleResendOTP}
            disabled={isResending || resendCooldown > 0}
            className="text-tertiary-text text-sm underline cursor-pointer disabled:opacity-50"
          >
            {isResending
              ? "Sending..."
              : resendCooldown > 0
                ? `Resend OTP in ${resendCooldown}s`
                : "Resend OTP"}
          </button>

          <p className="text-xs text-secondary-text">
            Your OTP expires in 5 minutes.
          </p>
        </div>

      </div>
    </div>
  );
}

export default VerifyOTP;
