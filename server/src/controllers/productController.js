
import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import parseArrayField from "../utils/parseArrayField.js";
import handleValidationError from "../utils/handleValidationError.js";

// Allowed product fields
const allowedProductFields = [
    "title",
    "slug",
    "sku",
    "subtitle",
    "description",
    "brand",
    "category",
    "gender",
    "material",
    "fit",
    "careInstructions",
    "price",
    "discountPrice",
    "quantity",
    "lowStockThreshold",
    "badge",
    "isFeatured",
    "status",
];

// Helper: Delete Cloudinary images
const deleteCloudinaryImages = async (images = []) => {
    const results = await Promise.allSettled(
        images.map((image) =>
            cloudinary.uploader.destroy(image.public_id)
        )
    );

    const successful = results.filter(
        (result) =>
            result.status === "fulfilled" &&
            ["ok", "not found"].includes(result.value?.result)
    ).length;

    return {
        deleted: successful,
        failed: results.length - successful,
    };
};

// Helper: Convert category into Cloudinary folder name
const getCategoryFolder = (category) => {
    return category.toLowerCase().trim().replace(/\s+/g, "-");
};

// Helper: Parse SEO data
const parseSeoField = (seo, body = {}) => {
    if (seo !== undefined) {
        if (typeof seo === "string") {
            try {
                return JSON.parse(seo);
            } catch {
                const error = new Error("SEO must be valid JSON");
                error.statusCode = 400;
                throw error;
            }
        }

        return seo;
    }

    // Support seo.title and seo.description in FormData
    if (
        body["seo.title"] !== undefined ||
        body["seo.description"] !== undefined
    ) {
        return {
            title: body["seo.title"],
            description: body["seo.description"],
        };
    }

    return undefined;
};

// Helper: Get product fields from request body
const getProductFields = (body) => {
    const fields = {};

    allowedProductFields.forEach((field) => {
        if (body[field] !== undefined) {
            fields[field] = body[field];
        }
    });

    // Parse array fields
    ["sizes", "colors", "tags"].forEach((field) => {
        if (body[field] !== undefined) {
            fields[field] = parseArrayField(body[field]);
        }
    });

    // Parse SEO
    const seo = parseSeoField(body.seo, body);

    if (seo !== undefined) {
        fields.seo = seo;
    }

    return fields;
};

// Create product
const createProduct = async (req, res) => {
    let uploadedImages = [];

    try {
        const productData = getProductFields(req.body);

        const { category } = productData;

        // Validate category
        if (
            !category ||
            typeof category !== "string" ||
            !category.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Product category is required",
            });
        }

        // Check uploaded images
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please upload at least one product image",
            });
        }

        const folderName = getCategoryFolder(category);

        // Upload images to Cloudinary
        const uploadResults = await Promise.allSettled(
            req.files.map((file) =>
                uploadToCloudinary(
                    file.buffer,
                    `urbanwear/products/${folderName}`
                )
            )
        );

        uploadedImages = uploadResults
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value);

        const hasFailedUpload = uploadResults.some(
            (result) => result.status === "rejected"
        );

        if (hasFailedUpload) {
            await deleteCloudinaryImages(uploadedImages);
            uploadedImages = [];

            return res.status(500).json({
                success: false,
                message: "Some images could not be uploaded",
            });
        }

        // Create product in MongoDB
        const product = await Product.create({
            ...productData,
            images: uploadedImages,
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });

    } catch (error) {
        if (uploadedImages.length > 0) {
            await deleteCloudinaryImages(uploadedImages);
        }

        console.error("Create product error:", error);

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        return handleValidationError(error, res);
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            count: products.length,
            products,
        });

    } catch (error) {
        console.error("Get all products error:", error);
        return handleValidationError(error, res);
    }
};

// Get single product by ID
const getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const product = await Product.findOne({slug})

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            product,
        });

    } catch (error) {
        console.error("Get product error:", error);
        return handleValidationError(error, res);
    }
};

// Update product
const updateProduct = async (req, res) => {
    let uploadedImages = [];

    try {
        const { slug } = req.params;
        const { imageAction } = req.body;

        const product = await Product.findOne({slug});

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const updateData = getProductFields(req.body);

        // Preserve old images
        const oldImages = product.images.map((image) => ({
            url: image.url,
            public_id: image.public_id,
        }));

        const hasNewImages = req.files && req.files.length > 0;

        // Validate image action
        if (
            hasNewImages &&
            !["add", "replace"].includes(imageAction)
        ) {
            return res.status(400).json({
                success: false,
                message: "imageAction must be 'add' or 'replace'",
            });
        }

        if (
            ["add", "replace"].includes(imageAction) &&
            !hasNewImages
        ) {
            return res.status(400).json({
                success: false,
                message: "Please select at least one image",
            });
        }

        // Upload new images
        if (hasNewImages) {
            const category = updateData.category || product.category;

            if (
                typeof category !== "string" ||
                !category.trim()
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Valid product category is required",
                });
            }

            const folderName = getCategoryFolder(category);

            const uploadResults = await Promise.allSettled(
                req.files.map((file) =>
                    uploadToCloudinary(
                        file.buffer,
                        `urbanwear/products/${folderName}`
                    )
                )
            );

            uploadedImages = uploadResults
                .filter((result) => result.status === "fulfilled")
                .map((result) => result.value);

            const hasFailedUpload = uploadResults.some(
                (result) => result.status === "rejected"
            );

            if (hasFailedUpload) {
                await deleteCloudinaryImages(uploadedImages);
                uploadedImages = [];

                return res.status(500).json({
                    success: false,
                    message: "Some images could not be uploaded",
                });
            }

            if (imageAction === "add") {
                product.images.push(...uploadedImages);
            }

            if (imageAction === "replace") {
                product.images = uploadedImages;
            }
        }

        // Update product fields
        Object.assign(product, updateData);

        // Save product
        await product.save();

        // Delete old images after successful database update
        let oldImagesDeleted = 0;
        let oldImagesFailed = 0;

        if (hasNewImages && imageAction === "replace") {
            const deletionResult = await deleteCloudinaryImages(oldImages);

            oldImagesDeleted = deletionResult.deleted;
            oldImagesFailed = deletionResult.failed;
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product,
            oldImagesDeleted,
            oldImagesFailed,
        });

    } catch (error) {
        // Clean up newly uploaded images if update fails
        if (uploadedImages.length > 0) {
            await deleteCloudinaryImages(uploadedImages);
        }

        console.error("Update product error:", error);

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        return handleValidationError(error, res);
    }
};

// Delete individual product image
const deleteProductImage = async (req, res) => {
    try {
        const { id, publicId } = req.params;

        const decodedPublicId = decodeURIComponent(publicId);

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Find selected image
        const imageExists = product.images.some(
            (image) => image.public_id === decodedPublicId
        );

        if (!imageExists) {
            return res.status(404).json({
                success: false,
                message: "Product image not found",
            });
        }

        // Keep at least one image
        if (product.images.length <= 1) {
            return res.status(400).json({
                success: false,
                message: "A product must have at least one image",
            });
        }

        // Remove image reference from MongoDB first
        product.images = product.images.filter(
            (image) => image.public_id !== decodedPublicId
        );

        await product.save();

        // Delete image from Cloudinary
        const cloudinaryResult = await cloudinary.uploader.destroy(
            decodedPublicId
        );

        const imageDeleted = ["ok", "not found"].includes(
            cloudinaryResult.result
        );

        return res.status(200).json({
            success: true,
            message: imageDeleted
                ? "Product image deleted successfully"
                : "Image removed from product, but Cloudinary cleanup failed",
            product,
            cloudinaryDeleted: imageDeleted,
        });

    } catch (error) {
        console.error("Delete product image error:", error);
        return handleValidationError(error, res);
    }
};

// Delete complete product
const deleteProduct = async (req, res) => {
    try {
        const { slug } = req.params;

        const product = await Product.findOne({slug});

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Delete associated Cloudinary images
        const deletionResult = await deleteCloudinaryImages(
            product.images
        );

        // Delete product from MongoDB
        await Product.findOneAndDelete({slug});

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            cloudinaryImagesDeleted: deletionResult.deleted,
            cloudinaryImagesFailed: deletionResult.failed,
        });

    } catch (error) {
        console.error("Delete product error:", error);
        return handleValidationError(error, res);
    }
};

export {
    createProduct,
    getAllProducts,
    getProductBySlug,
    updateProduct,
    deleteProduct,
    deleteProductImage,
};
