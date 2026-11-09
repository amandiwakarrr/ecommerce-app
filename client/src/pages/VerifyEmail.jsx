import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyUserEmail = async () => {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token || !email) {
        setStatus("error");
        setMessage("Invalid verification link.");
        return;
      }

      try {
        const response = await api.post("/auth/verify-email", {
          token,
          email,
        });

        setStatus("success");
        setMessage(response.data.message);
        navigate("/account", {
          replace: true,
          state: { showLogin: true },
        });
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Email verification failed. Please try again.",
        );
      }
    };

    verifyUserEmail();
  }, [searchParams, navigate]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border p-8 text-center">
        {status === "loading" && (
          <h2 className="text-xl font-semibold">Verifying your email...</h2>
        )}

        {status === "success" && (
          <>
            <h2 className="mb-3 text-2xl font-bold text-green-600">
              Email Verified!
            </h2>
            <p className="mb-6">{message}</p>
            <Link
              to="/account"
              state={{ showLogin: true }}
              className="inline-block rounded-md bg-[#F5B544] px-6 py-3 font-semibold text-black"
            >
              Login to Your Account
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="mb-3 text-2xl font-bold text-red-600">
              Verification Failed
            </h2>
            <p className="mb-6">{message}</p>
            <Link to="/account" className="font-semibold underline">
              Back to Account
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
