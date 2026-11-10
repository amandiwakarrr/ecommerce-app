
import api from "./api.js";

// Register user
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Verify email using OTP
export const verifyEmailOTP = async (email, otp) => {
  const response = await api.post("/auth/verify-otp", {
    email,
    otp,
  });

  return response.data;
};

// Resend verification OTP
export const resendVerificationOTP = async (email) => {
  const response = await api.post("/auth/resend-otp", {
    email,
  });

  return response.data;
};

// Login user
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

// Get current authenticated user
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return { success: false, user: null };
    }

    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
