import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        originalPrice: {
            type: Number,
            min: 0,
            validate: {
                validator: function (v) {
                    return v == null || v >= this.price;
                },
                message: "Oginal price must be greater than or equal to price",
            }
        },
        category: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        images: [{ type: String }],
        sizes: [{ type: String }],
        colors: [
            {
                id: false,
                name: { type: String },
                hex: { type: String },
            },
        ],
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        numReviews: {
            type: Number,
            default: 0,
            min: 0,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isNewArrival: {
            type: Boolean,
            default: false,
        },
        isBestSeller: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        tags: [{ type: String, trim: true }],
    },
    {
        timestamps: true,
    }
);


ProductSchema.index({ category: 1, isActive: 1 });
ProductSchema.index({ name: "text", description: "text", tags: "text" });

const Product =
    mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;