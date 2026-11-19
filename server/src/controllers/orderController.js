
import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Address from "../models/Address.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

// Helper for client-side validation errors
const createClientError = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
};

// Create Order
// Method	Purpose
// mongoose.startSession()	Starts a MongoDB session
// session.withTransaction()	Executes operations in a transaction
// .session(session)	Associates database reads with the transaction
// { session }	Associates database writes with the transaction
// session.endSession()	Closes the session
export const createOrder = async (req, res) => {
  // Validate request data before starting transaction
  const userId = req.user._id;
  const { addressId, paymentMethod } = req.body;

  const validPaymentMethods = ["UPI", "CARD", "COD"];

  if (!validPaymentMethods.includes(paymentMethod)) {
    return res.status(400).json({
      success: false,
      message: "Invalid payment method.",
    });
  }

  if (!mongoose.isValidObjectId(addressId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid shipping address ID.",
    });
  }

  // Start MongoDB session
  const session = await mongoose.startSession();

  try {
    let createdOrder;

    // Execute all database operations in one transaction
    await session.withTransaction(async () => {

      // 1. Get user email
      const user = await User.findById(userId)
        .select("email")
        .session(session);

      if (!user) {
        const error = new Error("User not found.");
        error.statusCode = 404;
        throw error;
      }

      // 2. Get user's cart
      const cart = await Cart.findOne({ user: userId })
        .session(session);

      if (!cart || cart.items.length === 0) {
        const error = new Error("Your cart is empty.");
        error.statusCode = 400;
        throw error;
      }

      // 3. Get shipping address
      const address = await Address.findOne({
        _id: addressId,
        user: userId,
      }).session(session);

      if (!address) {
        const error = new Error("Shipping address not found.");
        error.statusCode = 404;
        throw error;
      }

      // 4. Get products
      const productIds = cart.items.map(
        (item) => item.product
      );

      const products = await Product.find({
        _id: { $in: productIds },
      }).session(session);

      const productMap = new Map(
        products.map((product) => [
          product._id.toString(),
          product,
        ])
      );

      let subtotal = 0;
      const orderItems = [];

      // 5. Validate cart items and calculate subtotal
      for (const cartItem of cart.items) {
        if (
          !Number.isInteger(cartItem.quantity) ||
          cartItem.quantity < 1
        ) {
          const error = new Error("Invalid product quantity.");
          error.statusCode = 400;
          throw error;
        }

        const product = productMap.get(
          cartItem.product.toString()
        );

        if (!product || product.status !== "active") {
          const error = new Error(
            "A product in your cart is unavailable."
          );
          error.statusCode = 400;
          throw error;
        }

        if (product.quantity < cartItem.quantity) {
          const error = new Error(
            `Insufficient stock for ${product.title}.`
          );
          error.statusCode = 400;
          throw error;
        }

        // Validate selected size
        if (
          product.sizes?.length > 0 &&
          !product.sizes.includes(cartItem.size)
        ) {
          const error = new Error(
            `Please select a valid size for ${product.title}.`
          );
          error.statusCode = 400;
          throw error;
        }

        // Validate selected color
        if (
          product.colors?.length > 0 &&
          !product.colors.includes(cartItem.color)
        ) {
          const error = new Error(
            `Please select a valid color for ${product.title}.`
          );
          error.statusCode = 400;
          throw error;
        }

        // Get actual product price
        const price = product.discountPrice ?? product.price;

        if (!Number.isFinite(price) || price < 0) {
          throw new Error(
            `Invalid price for product ${product.title}.`
          );
        }

        const itemTotal = price * cartItem.quantity;
        subtotal += itemTotal;

        // Product snapshot
        orderItems.push({
          product: product._id,
          sku: product.sku,
          title: product.title,
          image: product.images?.[0]?.url,
          price,
          quantity: cartItem.quantity,
          size: cartItem.size,
          color: cartItem.color,
        });
      }

      // 6. Calculate shipping
      const shippingCharge = subtotal < 200 ? 49 : 0;
      const totalAmount = subtotal + shippingCharge;

      // 7. Reserve product stock
      for (const item of cart.items) {
        const updatedProduct = await Product.findOneAndUpdate(
          {
            _id: item.product,
            status: "active",
            quantity: { $gte: item.quantity },
          },
          {
            $inc: {
              quantity: -item.quantity,
              totalSold: item.quantity,
            },
          },
          {
            new: true,
            session,
          }
        );

        if (!updatedProduct) {
          const error = new Error(
            "Product stock changed. Please try again."
          );
          error.statusCode = 400;
          throw error;
        }
      }

      // 8. Create order
      const order = new Order({
        user: userId,
        email: user.email,
        items: orderItems,
        shippingAddress: {
          fullName: address.fullName,
          phone: address.phone,
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
        },
        subtotal,
        shippingCharge,
        totalAmount,
        paymentMethod,
        paymentStatus: "Pending",
        orderStatus: "Placed",
      });

      await order.save({ session });

      createdOrder = order;

      // 9. Clear cart
      cart.items = [];
      await cart.save({ session });
    });

    // Transaction committed successfully
    return res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order: createdOrder,
    });

  } catch (error) {
    console.error("Create order error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "An unexpected error occurred while placing your order.",
    });

  } finally {
    // Always close the session
    await session.endSession();
  }
};


// Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.error("Fetch orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
};
