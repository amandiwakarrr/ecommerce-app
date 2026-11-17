
import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Address from "../models/Address.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userId = req.user._id;
    const { addressId, paymentMethod } = req.body;

    // 1. Validate payment method
    const validPaymentMethods = ["UPI", "CARD", "COD"];

    if (!validPaymentMethods.includes(paymentMethod)) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Invalid payment method.",
      });
    }

    // 2. Get user email
    const user = await User.findById(userId)
      .select("email")
      .session(session);

    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // 3. Get user's cart
    const cart = await Cart.findOne({ user: userId }).session(session);

    if (!cart || cart.items.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    // 4. Get and validate shipping address
    const address = await Address.findOne({
      _id: addressId,
      user: userId,
    }).session(session);

    if (!address) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "Shipping address not found.",
      });
    }

    // 5. Get products from database
    const productIds = cart.items.map((item) => item.product);

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

    // 6. Validate cart items and calculate subtotal
    for (const cartItem of cart.items) {
      if (
        !Number.isInteger(cartItem.quantity) ||
        cartItem.quantity < 1
      ) {
        throw new Error("Invalid product quantity.");
      }

      const product = productMap.get(
        cartItem.product.toString()
      );

      if (!product || product.status !== "active") {
        throw new Error("A product in your cart is unavailable.");
      }

      if (product.quantity < cartItem.quantity) {
        throw new Error(
          `Insufficient stock for ${product.title}.`
        );
      }

      // Validate selected size
      if (
        product.sizes?.length > 0 &&
        !product.sizes.includes(cartItem.size)
      ) {
        throw new Error(
          `Please select a valid size for ${product.title}.`
        );
      }

      // Validate selected color
      if (
        product.colors?.length > 0 &&
        !product.colors.includes(cartItem.color)
      ) {
        throw new Error(
          `Please select a valid color for ${product.title}.`
        );
      }

      const price = product.discountPrice ?? product.price;
      const itemTotal = price * cartItem.quantity;

      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        sku: product.sku,
        title: product.title,
        image: product.images[0]?.url,
        price,
        quantity: cartItem.quantity,
        size: cartItem.size,
        color: cartItem.color,
      });
    }

    // 7. Calculate shipping charge
    const shippingCharge = subtotal < 200 ? 49 : 0;
    const totalAmount = subtotal + shippingCharge;

    // 8. Create order
    const [order] = await Order.create(
      [
        {
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
        },
      ],
      { session }
    );

    // 9. Reduce product stock and update total sold
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
        throw new Error(
          "Product stock changed. Please try again."
        );
      }
    }

    // 10. Clear cart
    cart.items = [];
    await cart.save({ session });

    // 11. Commit transaction
    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to place order.",
    });
  } finally {
    await session.endSession();
  }
};
