import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";
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

        // 2. Find user's existing order
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

        // 4. Check payment status
        if (order.paymentStatus !== "Pending") {
            return res.status(400).json({
                success: false,
                message: "This order cannot be paid again.",
            });
        }
        // 5. Reuse existing Razorpay order if available
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

        // 6. Create Razorpay payment order
        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(order.totalAmount * 100),
            currency: "INR",
            receipt: order._id.toString(),
        });

        // 6. Save Razorpay order ID
        order.razorpayOrderId = razorpayOrder.id;
        await order.save();
        return res.status(200).json({
            success: true,
            message: "Payment verified successfully.",
        });

        // 7. Send response
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


// Create Razorpay UPI QR Code
export const createUpiQrCode = async (req, res) => {
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
        if (order.paymentMethod !== "UPI") {
            return res.status(400).json({
                success: false,
                message: "This order is not a UPI order.",
            });
        }

        // 4. Check payment status
        if (order.paymentStatus !== "Pending") {
            return res.status(400).json({
                success: false,
                message: "This order cannot be paid again.",
            });
        }

        // 5. Reuse existing active QR code
        if (order.razorpayQrCodeId) {
            const existingQr = await razorpay.qrCode.fetch(
                order.razorpayQrCodeId
            );

            if (existingQr.status === "active") {
                return res.status(200).json({
                    success: true,
                    message: "Existing QR code retrieved.",
                    qrCode: {
                        id: existingQr.id,
                        imageUrl: existingQr.image_url,
                        amount: existingQr.payment_amount,
                    },
                });
            }
        }

        // 6. Create a new single-use UPI QR code
        const qrCode = await razorpay.qrCode.create({
            type: "upi_qr",
            name: "UrbanWear Order",
            usage: "single_use",
            fixed_amount: true,
            payment_amount: Math.round(order.totalAmount * 100),
            description: `Payment for order ${order._id}`,
            notes: {
                order_id: order._id.toString(),
            },
        });

        // 7. Save QR details
        order.razorpayQrCodeId = qrCode.id;
        order.razorpayQrCodeUrl = qrCode.image_url;

        await order.save();

        // 8. Send response
        return res.status(201).json({
            success: true,
            message: "UPI QR code created successfully.",
            qrCode: {
                id: qrCode.id,
                imageUrl: qrCode.image_url,
                amount: qrCode.payment_amount,
            },
        });

    } catch (error) {
        console.error("Create UPI QR error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create UPI QR code.",
        });
    }
};


// Verify UPI QR Payment
export const verifyUpiQrPayment = async (req, res) => {
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

        // 3. Check whether already paid
        if (order.paymentStatus === "Paid") {
            return res.status(200).json({
                success: true,
                message: "Payment already verified.",
            });
        }

        // 4. Validate order
        if (
            order.paymentMethod !== "UPI" ||
            order.paymentStatus !== "Pending" ||
            !order.razorpayQrCodeId
        ) {
            return res.status(400).json({
                success: false,
                message: "Order is not eligible for QR payment verification.",
            });
        }

        // 5. Fetch payments for this QR code
        const payments = await razorpay.qrCode.fetchAllPayments(
            order.razorpayQrCodeId,
            { count: 100 }
        );

        // 6. Find a successful payment matching the order
        const payment = payments.items.find((item) =>
            item.status === "captured" &&
            item.captured === true &&
            item.amount === Math.round(order.totalAmount * 100) &&
            item.currency === "INR" &&
            item.method === "upi" &&
            (item.amount_refunded || 0) === 0
        );

        if (!payment) {
            return res.status(400).json({
                success: false,
                message: "Payment has not been received yet.",
            });
        }

        // 7. Save payment details
        order.razorpayPaymentId = payment.id;
        order.paymentMethod = "UPI";
        order.paymentStatus = "Paid";

        await order.save();

        return res.status(200).json({
            success: true,
            message: "UPI QR payment verified successfully.",
        });

    } catch (error) {
        console.error("Verify UPI QR payment error:", error);

        return res.status(500).json({
            success: false,
            message: "UPI QR payment verification failed.",
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

        // 4. Generate expected signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        // 5. Compare signatures safely
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

        // 6. Fetch actual payment details from Razorpay
        const payment = await razorpay.payments.fetch(razorpay_payment_id);

        // 7. Verify payment details
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

        // 8. Ensure payment is captured
        if (payment.status !== "captured") {
            return res.status(400).json({
                success: false,
                message: "Payment has not been captured yet.",
            });
        }

        // 9. Save actual payment method
        if (payment.method === "upi") {
            order.paymentMethod = "UPI";
        } else if (payment.method === "card") {
            order.paymentMethod = "CARD";
        } else {
            return res.status(400).json({
                success: false,
                message: "Unsupported payment method.",
            });
        }

        // 10. Update payment status
        order.razorpayPaymentId = razorpay_payment_id;
        order.paymentStatus = "Paid";

        await order.save();
    } catch (error) {
        console.error("Verify Razorpay payment error:", error);

        return res.status(500).json({
            success: false,
            message: "Payment verification failed.",
        });
    }
};
