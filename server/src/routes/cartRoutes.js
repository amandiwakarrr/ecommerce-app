import express from "express";
import { addToCart, getCart, updateCartItem, removeCartItem, clearCart, mergeCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.post("/merge", protect, mergeCart);
router.get("/", protect, getCart);
router.patch("/:itemId", protect, updateCartItem);
router.delete("/:itemId", protect, removeCartItem);
router.delete("/", protect, clearCart);
export default router;