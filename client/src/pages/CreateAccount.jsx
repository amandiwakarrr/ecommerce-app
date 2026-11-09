import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UserSchema from "../validations/UserSchema";
import LoginSchema from "../validations/LoginSchema";
import {
  registerUser,
  loginUser,
  resendVerificationEmail,
} from "../services/authService";
import { useAuth } from "../context/useAuth";

function CreateAccount() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(() => !location.state?.showLogin);
  const [serverMessage, setServerMessage] = useState(() =>
    location.state?.showLogin
      ? "Email verified successfully. Please log in."
      : "",
  );
  const [serverError, setServerError] = useState("");
  const { setUser } = useAuth();
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(isActive ? UserSchema : LoginSchema),
    mode: "onTouched",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      phone: "",
      acceptedTerms: false,
    },
  });

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setTimeout(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const toggleForm = () => {
    setIsActive((prev) => !prev);
    setServerError("");
    setServerMessage("");
    setRequiresVerification(false);
    setResendMessage("");
    setResendCooldown(0);
    reset();
  };

  const handleResendVerification = async () => {
    setResendMessage("");
    setServerError("");

    const email = getValues("email");

    if (!email?.trim()) {
      setServerError("Please enter your email address first.");
      return;
    }

    setIsResending(true);

    try {
      const response = await resendVerificationEmail(email);

      setResendMessage(response.message);
      setResendCooldown(60);
    } catch (error) {
      const errorData = error.response?.data;

      if (error.response?.status === 429 && errorData?.retryAfter) {
        setResendCooldown(errorData.retryAfter);
      }

      setServerError(
        errorData?.message ||
          "Unable to resend verification email. Please try again.",
      );
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async (data) => {
    setServerError("");
    setServerMessage("");
    setRequiresVerification(false);
    setResendMessage("");
    try {
      let response;

      if (isActive) {
        response = await registerUser({
          name: data.fullname,
          email: data.email,
          phone: data.phone,
          password: data.password,
          acceptedTerms: data.acceptedTerms,
        });
      } else {
        response = await loginUser({
          email: data.email,
          password: data.password,
        });

        setUser(response.user);
      }

      setServerMessage(response.message);
    } catch (error) {
      const errorData = error.response?.data;

      if (errorData?.requiresVerification) {
        setRequiresVerification(true);
      }

      setServerError(
        errorData?.message || "Something went wrong. Please try again.",
      );
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-between py-10 gap-4">
      <div className="w-[90%] sm:w-[50%] min-h-120 h-auto p-2 bg-secondary-bg flex flex-col items-center  border border-primary-border rounded gap-5">
        <div className="w-full sm:w-75 grid grid-cols-2 gap-5 bg-dark rounded p-2">
          <button
            onClick={toggleForm}
            type="button"
            className={` py-2 rounded cursor-pointer  ${isActive ? "bg-dark text-primary-text" : "bg-btn"}`}
          >
            Sign in
          </button>
          <button
            onClick={toggleForm}
            type="button"
            className={` py-2 rounded cursor-pointer ${isActive ? "bg-btn" : "bg-dark text-primary-text"}`}
          >
            Create account
          </button>
        </div>
        <div className="w-full grid place-items-center sm:w-[80%]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-full grid gap-3 place-items-center p-5"
          >
            {isActive && (
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <label
                  htmlFor="fullname"
                  className="text-secondary-text text-[14px]"
                >
                  Full name
                </label>
                <input
                  type="text"
                  {...register("fullname")}
                  className="border w-full px-2 py-3 border-primary-border rounded focus:outline-amber-600 text-primary-text"
                />
                <p className="error">{errors.fullname?.message}</p>
              </div>
            )}
            <div className="w-full flex flex-col items-start justify-start gap-1">
              <label
                htmlFor="email"
                className="text-secondary-text text-[14px]"
              >
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="border w-full px-2 py-3 border-primary-border rounded focus:outline-amber-600 text-primary-text"
              />
              <p className="error">{errors.email?.message}</p>
            </div>
            <div
              className={`w-full flex flex-col items-start justify-start gap-1 ${isActive ? "flex" : "hidden"}`}
            >
              <label
                htmlFor="phone"
                className="text-secondary-text text-[14px]"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                maxLength={10}
                {...register("phone")}
                className="border w-full px-2 py-3 border-primary-border rounded focus:outline-amber-600 text-primary-text"
              />
              <p className="error">{errors.phone?.message}</p>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-1">
              <label
                htmlFor="password"
                className="text-secondary-text text-[14px]"
              >
                Password
              </label>
              <input
                {...register("password")}
                autoComplete={isActive ? "new-password" : "current-password"}
                type="password"
                className="border w-full px-2 py-3 border-primary-border rounded focus:outline-amber-600 text-primary-text"
              />
              <p className="error">{errors.password?.message}</p>
            </div>
            {isActive && (
              <div className="w-full flex gap-1 py-2">
                <input type="checkbox" {...register("acceptedTerms")} />
                <label
                  htmlFor="checkbox"
                  className=" text-[12px] text-primary-text"
                >
                  agree with the{" "}
                  <span className="text-tertiary-text">Terms</span> and{" "}
                  <span className="text-">conditions</span>
                </label>
                <p className="error">{errors.acceptedTerms?.message}</p>
              </div>
            )}
            <div className="w-full">
              {serverMessage && (
                <p className="text-green-500 text-sm">{serverMessage}</p>
              )}

              {serverError && (
                <p className="text-red-500 text-sm">{serverError}</p>
              )}
              {requiresVerification && !isActive && (
                <div className="w-full flex flex-col gap-2">
                  <p className="text-sm text-secondary-text">
                    Your email is not verified. Please verify your email to
                    access your account.
                  </p>

                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={isResending || resendCooldown > 0}
                    className="text-tertiary-text text-sm underline cursor-pointer disabled:opacity-50"
                  >
                    {isResending
                      ? "Sending..."
                      : resendCooldown > 0
                        ? `Resend available in ${resendCooldown}s`
                        : "Resend Verification Email"}
                  </button>

                  {resendMessage && (
                    <p className="text-green-500 text-sm">{resendMessage}</p>
                  )}
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2 bg-btn rounded text-dark cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? isActive
                    ? "Creating..."
                    : "Signing in..."
                  : isActive
                    ? "Create Account"
                    : "Sign in"}
              </button>
            </div>
          </form>
          <p className="text-[12px] text-primary-text">
            {!isActive ? (
              <>
                Do not have account?{" "}
                <span
                  onClick={toggleForm}
                  className="text-tertiary-text cursor-pointer"
                >
                  Create Account
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={toggleForm}
                  className="text-tertiary-text cursor-pointer"
                >
                  Sign in
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
