import express from "express";
import { createRazorpayOrder, createUpiQrCode, verifyUpiQrPayment, verifyRazorpayPayment, } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-order", protect, createRazorpayOrder);
router.post("/create-qr", protect, createUpiQrCode);
router.post("/verify-qr", protect, verifyUpiQrPayment);
router.post("/verify-payment", protect, verifyRazorpayPayment);
export default router;
