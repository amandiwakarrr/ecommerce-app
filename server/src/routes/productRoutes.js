import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
    createProduct,
    deleteProduct,
    deleteProductImage,
    getAllProducts,
    getProductBySlug,
    updateProduct,
    getProductCategories
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", upload.array("images", 5), createProduct);
router.get("/", getAllProducts);
// Keep specific routes before dynamic routes
router.get("/categories", getProductCategories);
// Dynamic routes
router.get("/:slug", getProductBySlug);
router.put("/:slug", upload.array("images", 5), updateProduct);

// Delete individual product image
router.delete("/:id/images/:publicId", deleteProductImage);

// Delete complete product
router.delete("/:slug", deleteProduct);

export default router;