
import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    testEmail,
    verifyEmailOTP,
    resendVerificationOTP,
} from "../controllers/authController.js";

import { protect, optionalProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Registration
router.post("/register", registerUser);

// Email OTP verification
router.post("/verify-otp", verifyEmailOTP);

// Resend verification OTP
router.post("/resend-otp", resendVerificationOTP);

// Login and logout
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Get authenticated user
router.get("/me", optionalProtect, (req, res) => {
    res.status(200).json({
        success: true,
        message: req.user
            ? "User authenticated successfully."
            : "User is not logged in.",
        user: req.user,
    });
});

// Temporary email testing route
router.post("/test-email", testEmail);

export default router;
