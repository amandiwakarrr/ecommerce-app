
import mongoose from "mongoose";
import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import crypto from "crypto";

// Create Razorpay Order
export const createRazorpayOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const userId = req.user._id;

        // 1. Validate order ID
        if (
            typeof orderId !== "string" ||
            !/^[0-9a-fA-F]{24}$/.test(orderId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID.",
            });
        }

        // 2. Find user's order
        const order = await Order.findOne({
            _id: orderId,
            user: userId,
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found.",
            });
        }

        // 3. Validate payment method
        if (!["UPI", "CARD"].includes(order.paymentMethod)) {
            return res.status(400).json({
                success: false,
                message: "This order does not support online payment.",
            });
        }

        // 4. Validate payment status
        if (order.paymentStatus !== "Pending") {
            return res.status(400).json({
                success: false,
                message: "This order cannot be paid again.",
            });
        }

        // 5. Reuse existing Razorpay order
        if (order.razorpayOrderId) {
            const existingRazorpayOrder = await razorpay.orders.fetch(
                order.razorpayOrderId
            );

            return res.status(200).json({
                success: true,
                message: "Existing Razorpay order retrieved.",
                razorpayOrder: existingRazorpayOrder,
                key: process.env.RAZORPAY_KEY_ID,
            });
        }

        // 6. Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(order.totalAmount * 100),
            currency: "INR",
            receipt: order._id.toString(),
            checkout_config_id: "config_U2QbJ4uKJwOyuB",
        });

        // 7. Save Razorpay order ID
        order.razorpayOrderId = razorpayOrder.id;
        await order.save();

        return res.status(201).json({
            success: true,
            message: "Razorpay order created successfully.",
            razorpayOrder,
            key: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error("Create Razorpay order error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create Razorpay order.",
        });
    }
};

// Verify Razorpay Payment
export const verifyRazorpayPayment = async (req, res) => {
    try {
        const {
            orderId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const userId = req.user._id;

        // 1. Validate required fields
        if (
            typeof orderId !== "string" ||
            !/^[0-9a-fA-F]{24}$/.test(orderId) ||
            typeof razorpay_order_id !== "string" ||
            typeof razorpay_payment_id !== "string" ||
            typeof razorpay_signature !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment verification details.",
            });
        }

        // 2. Find user's order
        const order = await Order.findOne({
            _id: orderId,
            user: userId,
            razorpayOrderId: razorpay_order_id,
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found.",
            });
        }

        // 3. Prevent duplicate verification
        if (order.paymentStatus === "Paid") {
            return res.status(200).json({
                success: true,
                message: "Payment already verified.",
            });
        }

        if (order.paymentStatus !== "Pending") {
            return res.status(400).json({
                success: false,
                message: "This order cannot be verified.",
            });
        }

        // 4. Verify Razorpay signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        const expectedBuffer = Buffer.from(generatedSignature);
        const receivedBuffer = Buffer.from(razorpay_signature);

        if (
            expectedBuffer.length !== receivedBuffer.length ||
            !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment signature verification failed.",
            });
        }

        // 5. Fetch actual payment details from Razorpay
        const payment = await razorpay.payments.fetch(razorpay_payment_id);

        // 6. Verify payment details
        if (
            payment.order_id !== razorpay_order_id ||
            payment.amount !== Math.round(order.totalAmount * 100) ||
            payment.currency !== "INR"
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment details do not match the order.",
            });
        }

        // 7. Ensure payment is captured
        if (payment.status !== "captured") {
            return res.status(400).json({
                success: false,
                message: "Payment has not been captured yet.",
            });
        }

        // 8. Verify actual payment method
        const actualPaymentMethod =
            payment.method === "upi"
                ? "UPI"
                : payment.method === "card"
                    ? "CARD"
                    : null;

        if (!actualPaymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Unsupported payment method.",
            });
        }

        // 9. Update stock, clear cart and mark order as paid
        const session = await mongoose.startSession();

        try {
            await session.withTransaction(async () => {
                // Recheck order inside transaction
                const currentOrder = await Order.findOne({
                    _id: orderId,
                    user: userId,
                    razorpayOrderId: razorpay_order_id,
                }).session(session);

                if (!currentOrder) {
                    throw new Error("Order not found.");
                }

                // Prevent duplicate stock updates
                if (currentOrder.paymentStatus === "Paid") {
                    return;
                }

                if (currentOrder.paymentStatus !== "Pending") {
                    throw new Error("Order is no longer pending.");
                }

                // Combine quantities if the same product appears more than once
                const productQuantities = new Map();

                for (const item of currentOrder.items) {
                    const productId = item.product.toString();

                    productQuantities.set(
                        productId,
                        (productQuantities.get(productId) || 0) + item.quantity
                    );
                }

                // Decrease stock and update totalSold
                for (const [productId, quantity] of productQuantities) {
                    const updatedProduct = await Product.findOneAndUpdate(
                        {
                            _id: productId,
                            quantity: { $gte: quantity },
                        },
                        {
                            $inc: {
                                quantity: -quantity,
                                totalSold: quantity,
                            },
                        },
                        {
                            new: true,
                            session,
                        }
                    );

                    if (!updatedProduct) {
                        const error = new Error(
                            "Insufficient stock for one or more products."
                        );
                        error.statusCode = 409;
                        throw error;
                    }
                }

                // Clear MongoDB cart only after successful payment
                const cart = await Cart.findOne({ user: userId }).session(session);

                if (cart) {
                    cart.items = [];
                    await cart.save({ session });
                }

                // Mark order as paid
                currentOrder.paymentMethod = actualPaymentMethod;
                currentOrder.razorpayPaymentId = razorpay_payment_id;
                currentOrder.paymentStatus = "Paid";

                await currentOrder.save({ session });
            });

            return res.status(200).json({
                success: true,
                message: "Payment verified successfully.",
            });
        } finally {
            await session.endSession();
        }
    } catch (error) {
        console.error("Verify Razorpay payment error:", error);

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Payment verification failed.",
        });
    }
};
