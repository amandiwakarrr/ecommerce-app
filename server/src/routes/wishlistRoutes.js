
import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

// All wishlist routes require authentication
router.get("/", protect, getWishlist);
router.post("/", protect, addToWishlist);
router.delete("/:itemId", protect, removeFromWishlist);

export default router;
