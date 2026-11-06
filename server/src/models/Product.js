
import mongoose from "mongoose";

// Product image schema
const ProductImageSchema = new mongoose.Schema(
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
        alt: {
            type: String,
            trim: true,
        },
    },
    { _id: false }
);

// SEO schema
const SeoSchema = new mongoose.Schema(
    {
        title: { type: String, trim: true },
        description: { type: String, trim: true },
    },
    { _id: false }
);

// Ratings schema
const RatingsSchema = new mongoose.Schema(
    {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        count: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { _id: false }
);

const ProductSchema = new mongoose.Schema(
    {
        // Basic information
        title: {
            type: String,
            required: [true, "Product title is required"],
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        sku: {
            type: String,
            unique: true,
            sparse: true,
            uppercase: true,
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

        // Classification
        brand: {
            type: String,
            default: "UrbanWear",
            trim: true,
        },
        category: {
            type: String,
            required: [true, "Product category is required"],
            trim: true,
        },
        tags: {
            type: [String],
            default: [],
            lowercase: true,
            trim: true,
        },
        gender: {
            type: String,
            enum: ["Men", "Women", "Unisex"],
            default: "Men",
        },
        material: {
            type: String,
            trim: true,
        },
        fit: {
            type: String,
            trim: true,
        },
        careInstructions: {
            type: String,
            trim: true,
        },

        // Pricing
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
                message: "Discount price must be less than original price.",
            },
        },

        // Inventory
        quantity: {
            type: Number,
            required: [true, "Product quantity is required"],
            min: [0, "Quantity cannot be negative"],
            validate: {
                validator: Number.isInteger,
                message: "Quantity must be a whole number",
            },
        },
        lowStockThreshold: {
            type: Number,
            default: 5,
            min: 0,
            validate: {
                validator: Number.isInteger,
                message: "Low stock threshold must be a whole number",
            },
        },

        // Product images
        images: {
            type: [ProductImageSchema],
            required: true,
            validate: {
                validator: function (images) {
                    return images.length > 0;
                },
                message: "At least one product image is required",
            },
        },

        // Variants
        sizes: {
            type: [String],
            default: [],
        },
        colors: {
            type: [String],
            default: [],
        },

        // Store display
        badge: {
            type: String,
            trim: true,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },

        // Sales
        totalSold: {
            type: Number,
            default: 0,
            min: 0,
            validate: {
                validator: Number.isInteger,
                message: "Total sold must be a whole number",
            },
        },

        // Product status
        status: {
            type: String,
            enum: ["draft", "active", "archived"],
            default: "active",
        },

        // Ratings and SEO
        ratings: {
            type: RatingsSchema,
            default: () => ({}),
        },
        seo: {
            type: SeoSchema,
            default: () => ({}),
        },
    },
    { timestamps: true }
);

// Automatically generate a unique slug
ProductSchema.pre("validate", async function () {
    if (this.title && !this.slug) {
        const baseSlug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        let slug = baseSlug;
        let counter = 1;

        while (
            await mongoose.models.Product.exists({
                slug,
                _id: { $ne: this._id },
            })
        ) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        this.slug = slug;
    }
});

// Database indexes
ProductSchema.index({ category: 1, status: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ tags: 1 });
ProductSchema.index({ totalSold: -1 });
ProductSchema.index({ isFeatured: 1, status: 1 });

const Product = mongoose.model("Product", ProductSchema);

export default Product;
