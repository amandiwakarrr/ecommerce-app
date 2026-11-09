import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    testEmail,
    verifyEmail,
    resendVerificationEmail
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/test-email", testEmail);
router.get("/me", protect, (req, res) => {
    res.status(200).json({
        success: true,
        message: "User authenticated successfully.",
        user: req.user,
    });
});



export default router;