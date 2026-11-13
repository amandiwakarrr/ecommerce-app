import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

// get logged in user wishlist
export const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({
            user: req.user._id,
        });

        if (!wishlist) {
            return res.status(200).json({
                success: true,
                wishlist: {
                    items: [],
                },
            });
        }

        return res.status(200).json({
            success: true,
            wishlist,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch wishlist.",
            error: error.message,
        });
    }
};

// Add product to wishlist
export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required.",
            });
        }

        // find product in database
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        if (product.status !== "active") {
            return res.status(400).json({
                success: false,
                message: "This product is not available.",
            });
        }


        //Find or create user's  wishlist
        let wishlist = await Wishlist.findOne({
            user: req.user._id,
        });

        if (!wishlist) {
            wishlist = new Wishlist({
                user: req.user._id,
                items: [],
            });
        }

        // prevent duplicate products
        const alreadyExists = wishlist.items.some(
            (item) => item.productId.toString() === product._id.toString()
        );

        if (alreadyExists) {
            return res.status(409).json({
                success: false,
                message: "Product is already in wishlist.",
            });
        }

        // Store complete product snapshot
        wishlist.items.push({
            productId: product._id,
            title: product.title,
            slug: product.slug,
            description: product.description,
            price: product.price,
            discountPrice: product.discountPrice,
            category: product.category,
            images: product.images,
            sizes: product.sizes,
            colors: product.colors,
            badge: product.badge,
        });

        await wishlist.save();
        return res.status(201).json({
            success: true,
            message: "Product added to wishlist successfully.",
            wishlist,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to add product in wishlist.",
            error: error.message,
        });
    }
};


// Remove product from wishlist

export const removeFromWishlist = async (req, res) => {
    try {
        const { itemId } = req.params;
        const wishlist = await Wishlist.findOne({
            user: req.user._id,
        });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        const itemExists = wishlist.items.some(
            (item) => item._id.toString() === itemId
        );

        if (!itemExists) {
            return res.status(404).json({
                success: false,
                message: "Wishlist product not found.",
            });

        }
        wishlist.items.pull(itemId);
        await wishlist.save();
        return res.status(200).json({
            success: true,
            message: "Product removed from wishlist successfully.",
            wishlist,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to remove product from wishlist.",
            error: error.message,
        });
    }
};