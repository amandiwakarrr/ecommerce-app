import mongoose from "mongoose";
// order item schema 
const OrderItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        sku: {
            type: String,
            trim: true,
            uppercase: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            validate: {
                validator: Number.isInteger,
                message: "Quantity must be a whole number.",
            },
        },
        size: {
            type: String,
            trim: true,
        },
        color: {
            type: String,
            trim: true,
        },
    },
    { _id: false }
);

// Shopping address snapshot
const ShippingAddressSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        addressLine1: {
            type: String,
            required: true,
            trim: true,
        },
        addressLine2: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        postalCode: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            default: "India",
            trim: true,
        },

    },
    { _id: false }
);

// Main order schema
const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address",
            ],
            lowercase: true,
        },
        items: {
            type: [OrderItemSchema],
            required: true,
            validate: {
                validator: (items) => items.length > 0,
                message: "Order must contain at least one item",
            },
        },
        shippingAddress: {
            type: ShippingAddressSchema,
            required: true,
        },

        // Order pricing
        subtotal: {
            type: Number,
            required: true,
            min: 0,
        },
        shippingCharge: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },


        //Payment info
        paymentMethod: {
            type: String,
            enum: ["UPI", "CARD", "COD"],
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed", "Refunded"],
            default: "Pending",
        },

        // Order status
        orderStatus: {
            type: String,
            enum: [
                "Placed",
                "Confirmed",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
            ],
            default: "Placed",
        },
    },
    { timestamps: true }
);

// Database indexis
// A database index is a data structure that helps MongoDB find documents faster without scanning every document in a collection.
// user: 1 → Sort user IDs in ascending index order.
// createdAt: -1 → Sort creation dates in descending index order (newest first).

OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ orderStatus: 1 });
const Order = mongoose.model("Order", OrderSchema);
export default Order;