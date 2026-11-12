import mongoose from "mongoose"; //Validate MongoDB ObjectIds
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
    try {
        const { productId, size, color, quantity = 1 } = req.body;
        // validate product id
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID.",
            });
        }

        // validate quantity
        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive integer.",

            });
        }

        // find product in DB
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        // check product status
        if (product.status !== "active") {
            return res.status(400).json({
                success: false,
                message: "This product is currently unavailable.",
            });
        }

        // validate selected size
        if (product.sizes?.length > 0 && !product.sizes.includes(size)) {
            return res.status(400).json({
                success: false,
                message: "Selected size is unavailable.",
            });
        }

        // validate selected color
        if (product.colors?.length > 0 && !product.colors.includes(color)) {
            return res.status(400).json({
                success: false,
                message: "Selected color is unavailable."
            });
        }

        // check available stock
        if (quantity > product.quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock.",
            });
        }

        // find the login user's cart
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                items: [],
            });
        }

        // check whether the same product variant aready exist
        const existingItem = cart.items.find(
            (item) =>
                item.product.toString() === productId &&
                item.size === (size || "") &&
                item.color === (color || "")
        );

        // update the quantity
        if (existingItem) {
            // increase quantity if item already exist
            if (existingItem.quantity + quantity > product.quantity) {
                return res.status(400).json({
                    success: false,
                    message: "Insufficient stock",
                });
            }
            existingItem.quantity += quantity;
        } else {
            // add a new item if the item does not exist
            cart.items.push({
                product: productId,
                size: size || "",
                color: color || "",
                quantity,
            });
        }

        // save the item in DB
        await cart.save();
        // Fetch updated cart with populated product details
        const updatedCart = await Cart.findOne({ user: req.user._id })
            .populate("items.product");


        // send response
        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully.",
            cart: updatedCart,
        });
    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const mergeCart = async (req, res) => {
    try {
        const { items } = req.body;

        if (!Array.isArray(items)) {
            return res.status(400).json({
                success: false,
                message: "Invalid cart items.",
            });
        }

        // Find or create the logged-in user's cart
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                items: [],
            });
        }

        // Combine duplicate guest variants
        const mergedItems = new Map();

        for (const item of items) {
            const { productId, size = "", color = "", quantity } = item;

            if (
                !mongoose.Types.ObjectId.isValid(productId) ||
                !Number.isInteger(quantity) ||
                quantity < 1
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid guest cart item.",
                });
            }

            const key = `${productId}-${size}-${color}`;
            const existing = mergedItems.get(key);

            if (existing) {
                existing.quantity += quantity;
            } else {
                mergedItems.set(key, {
                    productId,
                    size,
                    color,
                    quantity,
                });
            }
        }

        // Validate every item before changing the cart
        for (const item of mergedItems.values()) {
            const product = await Product.findById(item.productId);

            if (!product || product.status !== "active") {
                return res.status(400).json({
                    success: false,
                    message: "A product in your guest cart is unavailable.",
                });
            }

            if (product.sizes?.length > 0 && !product.sizes.includes(item.size)) {
                return res.status(400).json({
                    success: false,
                    message: `Size unavailable for ${product.title}.`,
                });
            }

            if (product.colors?.length > 0 && !product.colors.includes(item.color)) {
                return res.status(400).json({
                    success: false,
                    message: `Color unavailable for ${product.title}.`,
                });
            }

            const existingItem = cart.items.find(
                (cartItem) =>
                    cartItem.product.toString() === item.productId &&
                    cartItem.size === item.size &&
                    cartItem.color === item.color
            );

            const finalQuantity =
                item.quantity + (existingItem?.quantity || 0);

            if (finalQuantity > product.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.title}.`,
                });
            }
        }

        // Merge guest items into MongoDB cart
        for (const item of mergedItems.values()) {
            const existingItem = cart.items.find(
                (cartItem) =>
                    cartItem.product.toString() === item.productId &&
                    cartItem.size === item.size &&
                    cartItem.color === item.color
            );

            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                cart.items.push({
                    product: item.productId,
                    size: item.size,
                    color: item.color,
                    quantity: item.quantity,
                });
            }
        }

        await cart.save();

        const updatedCart = await Cart.findOne({
            user: req.user._id,
        }).populate("items.product");

        return res.status(200).json({
            success: true,
            message: "Guest cart merged successfully.",
            cart: updatedCart,
        });
    } catch (error) {
        console.error("Merge cart error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export const getCart = async (req, res) => {
    try {
        // find the logged-in user's cart and populate product details
        const cart = await Cart.findOne({
            user: req.user._id,
        }).populate("items.product"); // we do this because our Cart model stores only the product's ObjectId. Populate retrieves the associated product information, including:

        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "Your cart is empty.",
                cart: {
                    items: [],
                },
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart fetched successfully.",
            cart,
        });
    } catch (error) {
        console.error("Get cart error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        // validate cart item id
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid cart item ID",
            });
        }

        // validate quantity
        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive integer",
            });
        }

        // find logged-in user cart
        const cart = await Cart.findOne({
            user: req.user._id,
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found.",
            });
        }

        // find the specefic cart item
        const cartItem = cart.items.id(itemId);

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found.",
            });
        }

        // find the associated product
        const product = await Product.findById(cartItem.product);
        if (!product || product.status !== "active") {
            return res.status(400).json({
                success: false,
                message: "Product is currently unavailable.",
            });
        }

        // check available stock
        if (quantity > product.quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock.",
            });
        }

        // update item quantity
        cartItem.quantity = quantity;

        // save updated cart
        await cart.save();

        // return updated cart with product details
        const updatedCart = await Cart.findOne({
            user: req.user._id,
        }).populate("items.product");

        return res.status(200).json({
            success: true,
            message: "Cart quantity updated successfully.",
            cart: updatedCart,
        });
    } catch (error) {
        console.error("Update cart error: ", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export const removeCartItem = async (req, res) => {
    try {

        const { itemId } = req.params;
        // validate cart item ID

        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid cart item id.",
            });
        }

        // find Logged-in user cart
        const cart = await Cart.findOne({
            user: req.user._id, // we will do this so that user can remove item from their cart not the others
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found.",
            });
        }

        // find the specefic cart item
        const cartItem = cart.items.id(itemId);

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found.",
            });
        }
        // Remove item from cart
        cart.items.pull(itemId);

        // Save updated cart
        await cart.save();
        // Fetch updated cart with populated product details
        const updatedCart = await Cart.findOne({
            user: req.user._id,
        }).populate("items.product");

        // Send response
        return res.status(200).json({
            success: true,
            message: "Product removed from cart successfully.",
            cart: updatedCart,
        });
    } catch (error) {
        console.error("Remove cart error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export const clearCart = async (req, res) => {
    try {

        // find logged-ing user cart
        const cart = await Cart.findOne({
            user: req.user._id,
        });

        if (!cart) {
            return res.status(400).json({
                success: false,
                message: "Cart not found.",
            })
        }

        // Remove all items from cart
        cart.items = [];

        // Save updated cart
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully.",
            cart,
        });

    } catch (error) {
        console.log("Clear cart error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

