
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Address from "../models/Address.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const createOrder = async (req, res) => {
  let reservedItems = [];
  let createdOrder = null;

  try {
    const userId = req.user._id;
    const { addressId, paymentMethod } = req.body;

    // 1. Validate payment method
    const validPaymentMethods = ["UPI", "CARD", "COD"];

    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method.",
      });
    }

    // 2. Get user email
    const user = await User.findById(userId).select("email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // 3. Get user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    // 4. Get and validate shipping address
    const address = await Address.findOne({
      _id: addressId,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Shipping address not found.",
      });
    }

    // 5. Get products from database
    const productIds = cart.items.map((item) => item.product);

    const products = await Product.find({
      _id: { $in: productIds },
    });

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
        throw new Error(
          "A product in your cart is unavailable."
        );
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

      // Get actual product price
      const price = product.discountPrice ?? product.price;

      const itemTotal = price * cartItem.quantity;

      subtotal += itemTotal;

      // Store product snapshot
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

    // 8. Reserve product stock
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
        { new: true }
      );

      if (!updatedProduct) {
        throw new Error(
          "Product stock changed. Please try again."
        );
      }

      // Keep track of reserved stock for restoration
      reservedItems.push({
        product: item.product,
        quantity: item.quantity,
      });
    }

    // 9. Create order
    createdOrder = new Order({
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

    await createdOrder.save();

    // 10. Clear cart
    cart.items = [];
    await cart.save();

    // 11. Send success response
    return res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order: createdOrder,
    });

  } catch (error) {
    // 12. Delete created order if a later operation failed
    if (createdOrder?._id) {
      try {
        await Order.deleteOne({ _id: createdOrder._id });
      } catch (rollbackError) {
        console.error("Order rollback failed:", rollbackError);
      }
    }

    // 13. Restore reserved stock if an operation failed
    for (const item of reservedItems) {
      try {
        await Product.updateOne(
          { _id: item.product },
          {
            $inc: {
              quantity: item.quantity,
              totalSold: -item.quantity,
            },
          }
        );
      } catch (rollbackError) {
        console.error("Stock restoration failed:", rollbackError);
      }
    }

    console.error("Create order error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to place order.",
    });
  }
};
