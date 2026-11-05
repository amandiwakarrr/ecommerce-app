
import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import parseArrayField from "../utils/parseArrayField.js";
import handleValidationError from "../utils/handleValidationError.js";

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
        failed: results.length - successful
    };
};

// Helper: Convert category into Cloudinary folder name
const getCategoryFolder = (category) => {
    return category.toLowerCase().trim().replace(/\s+/g, "-");
};

// Create product
const createProduct = async (req, res) => {
    let uploadedImages = [];

    try {
        const {
            title,
            subtitle,
            description,
            price,
            discountPrice,
            category,
            quantity,
            badge,
            sizes,
            colors
        } = req.body;

        // Validate category before using it
        if (!category || typeof category !== "string") {
            return res.status(400).json({
                success: false,
                message: "Product category is required"
            });
        }

        // Check uploaded images
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please upload at least one product image"
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
                message: "Some images could not be uploaded"
            });
        }

        // Create product in MongoDB
        const product = await Product.create({
            title,
            subtitle,
            description,
            price,
            discountPrice,
            category,
            quantity,
            badge,
            sizes: parseArrayField(sizes),
            colors: parseArrayField(colors),
            images: uploadedImages
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        if (uploadedImages.length > 0) {
            await deleteCloudinaryImages(uploadedImages);
        }

        console.error("Create product error:", error);

        return handleValidationError(error, res);
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            count: products.length,
            products
        });

    } catch (error) {
        console.error("Get all products error:", error);
        return handleValidationError(error, res);
    }
};

// Get single product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            product
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
        const { id } = req.params;
        const { imageAction, ...updateData } = req.body;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Preserve old images
        const oldImages = product.images.map((image) => ({
            url: image.url,
            public_id: image.public_id
        }));

        const hasNewImages = req.files && req.files.length > 0;

        // Validate image action
        if (
            hasNewImages &&
            !["add", "replace"].includes(imageAction)
        ) {
            return res.status(400).json({
                success: false,
                message: "imageAction must be 'add' or 'replace'"
            });
        }

        if (
            ["add", "replace"].includes(imageAction) &&
            !hasNewImages
        ) {
            return res.status(400).json({
                success: false,
                message: "Please select at least one image"
            });
        }

        // Upload new images
        if (hasNewImages) {
            const category = updateData.category || product.category;

            if (typeof category !== "string" || !category.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Valid product category is required"
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
                    message: "Some images could not be uploaded"
                });
            }

            if (imageAction === "add") {
                product.images.push(...uploadedImages);
            }

            if (imageAction === "replace") {
                product.images = uploadedImages;
            }
        }

        // Parse array fields from FormData
        if (updateData.sizes !== undefined) {
            updateData.sizes = parseArrayField(updateData.sizes);
        }

        if (updateData.colors !== undefined) {
            updateData.colors = parseArrayField(updateData.colors);
        }

        // Update product fields
        Object.assign(product, updateData);

        // Save product
        await product.save();

        // Delete old images only after successful database update
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
            oldImagesFailed
        });

    } catch (error) {
        // Clean up new images if database update fails
        if (uploadedImages.length > 0) {
            await deleteCloudinaryImages(uploadedImages);
        }

        console.error("Update product error:", error);

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
                message: "Product not found"
            });
        }

        // Find selected image
        const imageExists = product.images.some(
            (image) => image.public_id === decodedPublicId
        );

        if (!imageExists) {
            return res.status(404).json({
                success: false,
                message: "Product image not found"
            });
        }

        // Keep at least one image
        if (product.images.length <= 1) {
            return res.status(400).json({
                success: false,
                message: "A product must have at least one image"
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
            cloudinaryDeleted: imageDeleted
        });

    } catch (error) {
        console.error("Delete product image error:", error);
        return handleValidationError(error, res);
    }
};

// Delete complete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Delete associated Cloudinary images
        const deletionResult = await deleteCloudinaryImages(
            product.images
        );

        // Delete product from MongoDB
        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            cloudinaryImagesDeleted: deletionResult.deleted,
            cloudinaryImagesFailed: deletionResult.failed
        });

    } catch (error) {
        console.error("Delete product error:", error);
        return handleValidationError(error, res);
    }
};

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    deleteProductImage
};
