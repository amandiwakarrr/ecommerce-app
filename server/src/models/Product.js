
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Product title is required"],
            trim: true,
        },

        subtitle: {
            type: String,
            required: [true, "Product subtitle is required"],
            trim: true,
        },

        description: {
            type: String,
            required: [true, "Product description is required"],
            trim: true,
        },

        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0.01, "Price must be greater than zero"],
        },

        discountPrice: {
            type: Number,
            min: [0.01, "Discount price must be greater than zero"],
            validate: {
                validator: function (value) {
                    return value == null || value < this.price;
                },
                message: "Discount price must be less than the original price.",
            },
        },

        category: {
            type: String,
            required: [true, "Product category is required"],
            trim: true,
        },

        quantity: {
            type: Number,
            required: [true, "Product quantity is required"],
            min: [0, "Quantity cannot be negative"],
            validate: {
                validator: Number.isInteger,
                message: "Quantity must be a whole number",
            },
        },

        badge: {
            type: String,
            trim: true,
        },

        images: {
            type: [
                {
                    url: {
                        type: String,
                        required: true,
                        trim: true,
                    },
                    public_id: {
                        type: String,
                        required: true,
                        trim: true,
                    },
                },
            ],
            validate: {
                validator: function (images) {
                    return images.length > 0;
                },
                message: "At least one product image is required",
            },
        },

        sizes: {
            type: [String],
            default: [],
        },

        colors: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
