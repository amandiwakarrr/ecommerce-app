import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        size: {
            type: String,
            default: "",
            trim: true,

        },
        color: {
            type: String,
            default: "",
            trim: true,

        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
            validate: {
                validator: Number.isInteger,
                message: "Quantity must be a whole number.",
            },
        },
    },
);

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        items: {
            type: [cartItemSchema],
            default: [],
        },
    },
    { timestamps: true },
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;