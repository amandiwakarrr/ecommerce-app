import mongoose from "mongoose";

const wishlistItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        description: String,
        price: {
            type: Number,
            required: true,
        },
        discountPrice: Number,
        category: String,
        images: [
            {
                url: String,
                public_id: String,
            },
        ],
        sizes: [String],
        colors: [String],
        badge: String,
    },
    { _id: true }
);

const wishlistSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        items: [wishlistItemSchema],

    },
    { timestamps: true }
);
const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;