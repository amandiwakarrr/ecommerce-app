
import useCart from "../../context/useCart.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createOrder } from "../../services/orderService.js";
import useOrders from "../../context/useOrders.js";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  createUpiQrCode,
  verifyUpiQrPayment,
} from "../../services/paymentService.js";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

function CheckoutProduct({
  selectedAddressId,
  selectedPaymentMethod,
}) {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { refreshOrders } = useOrders();

  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [qrData, setQrData] = useState(null);

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const shippingPrice = cartTotal < 200 ? 49 : 0;
  const finalTotal = cartTotal + shippingPrice;

  // Verify UPI QR payment
  const handleVerifyQrPayment = async () => {
    if (!qrData?.orderId) return;

    try {
      setLoading(true);
      setOrderError("");

      await verifyUpiQrPayment(qrData.orderId);

      clearCart();
      await refreshOrders();

      navigate("/order-success", {
        state: {
          order: { _id: qrData.orderId },
        },
      });
    } catch (error) {
      setOrderError(
        error.response?.data?.message ||
          "Payment not verified yet. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      setOrderError("Please select a delivery address.");
      return;
    }

    if (!selectedPaymentMethod) {
      setOrderError("Please select a payment method.");
      return;
    }

    try {
      setLoading(true);
      setOrderError("");

      const orderData = {
        addressId: selectedAddressId,
        paymentMethod: selectedPaymentMethod.toUpperCase(),
      };

      // 1. Create order in MongoDB
      const response = await createOrder(orderData);
      const order = response.order;

      // 2. COD payment flow
      if (selectedPaymentMethod.toUpperCase() === "COD") {
        clearCart();
        await refreshOrders();

        navigate("/order-success", {
          state: { order },
        });

        return;
      }

      // 3. UPI QR payment flow
      if (selectedPaymentMethod.toUpperCase() === "UPI") {
        const qrResponse = await createUpiQrCode(order._id);

        setQrData({
          ...qrResponse.qrCode,
          orderId: order._id,
        });

        return;
      }

      // 4. Load Razorpay Checkout for Card
      const isScriptLoaded = await loadRazorpayScript();

      if (!isScriptLoaded) {
        setOrderError("Unable to load Razorpay. Please try again.");
        return;
      }

      // 5. Create Razorpay order
      const paymentResponse = await createRazorpayOrder(order._id);

      // 6. Configure Razorpay Checkout
      const options = {
        key: paymentResponse.key,
        amount: paymentResponse.razorpayOrder.amount,
        currency: paymentResponse.razorpayOrder.currency,
        name: "UrbanWear",
        description: "Order Payment",
        order_id: paymentResponse.razorpayOrder.id,

        config: {
          display: {
            hide: [
              {
                method: "upi",
                flows: ["collect"],
              },
            ],
          },
        },

        handler: async function (paymentResult) {
          try {
            setLoading(true);

            await verifyRazorpayPayment({
              orderId: order._id,
              razorpay_order_id: paymentResult.razorpay_order_id,
              razorpay_payment_id: paymentResult.razorpay_payment_id,
              razorpay_signature: paymentResult.razorpay_signature,
            });

            clearCart();
            await refreshOrders();

            navigate("/order-success", {
              state: { order },
            });
          } catch (error) {
            setOrderError(
              error.response?.data?.message ||
                "Payment verification failed. Please contact support if money was deducted."
            );
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },

        theme: {
          color: "#f5b544",
        },
      };

      // 7. Open Razorpay Checkout
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      setOrderError(
        error.response?.data?.message ||
          "Failed to place your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full sm:mt-13">
      {cart.length === 0 ? (
        <h1></h1>
      ) : (
        cart.map((item) => {
          const product = item.product || item;
          const price = product.discountPrice ?? product.price ?? 0;
          const itemKey =
            item._id || `${item.productId}-${item.size}-${item.color}`;

          return (
            <div
              key={itemKey}
              className="w-full h-auto flex justify-between gap-2 border-b border-primary-border py-2"
            >
              <div>
                <img
                  className="w-16.5 h-16.5 rounded"
                  src={product.images?.[0]?.url}
                  alt={product.images?.[0]?.alt || product.title}
                />
              </div>

              <div className="w-full h-auto flex">
                <div className="w-full h-full flex flex-col">
                  <h2 className="text-[clamp(0.7rem,2vw,1.5rem)] font-syne font-bold text-primary-text">
                    {product.title}
                  </h2>

                  <div className="text-[12px] text-secondary-text grid grid-cols-[max-content_max-content] sm:grid-cols-[repeat(4,max-content)] gap-x-2 gap-y-1">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.color && <span>Color: {item.color}</span>}
                    {item.quantity && (
                      <span>Quantity: {item.quantity}</span>
                    )}
                    <span>Price: ₹{formatPrice(price)}</span>
                  </div>
                </div>

                <div className="flex items-end flex-col">
                  <h2 className="text-[12px] sm:text-[16px] font-semibold text-tertiary-text">
                    ₹{formatPrice(price * item.quantity)}
                  </h2>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Order Summary */}
      <div className="w-full flex flex-col min-w-0 gap-2 mt-5">
        <div className="w-full border border-primary-border p-5 rounded bg-secondary-bg">
          <h2 className="font-syne font-extrabold text-primary-text">
            Order summary
          </h2>

          <div className="w-full flex flex-col border-b border-primary-border gap-2 py-2">
            <div className="w-full flex items-center justify-between text-secondary-text">
              <span>Subtotal</span>
              <span>₹{formatPrice(cartTotal)}</span>
            </div>

            <div className="w-full flex items-center justify-between text-secondary-text">
              <span>Shipping</span>

              <span>
                {shippingPrice === 0 ? (
                  <span className="text-green-500">Free</span>
                ) : (
                  `₹${shippingPrice}`
                )}
              </span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between mt-2">
            <span className="text-tertiary-text font-bold">Total</span>

            <span className="text-tertiary-text font-bold">
              ₹{formatPrice(finalTotal)}
            </span>
          </div>
        </div>

        {/* UPI QR Code */}
        {qrData && (
          <div className="w-full flex flex-col items-center gap-3 border border-primary-border p-5 rounded bg-secondary-bg">
            <h2 className="font-syne font-extrabold text-primary-text">
              Scan and Pay with UPI
            </h2>

            <p className="text-sm text-secondary-text text-center">
              Scan this QR code using Google Pay, PhonePe, Paytm or another
              UPI app.
            </p>

            <img
              src={qrData.imageUrl}
              alt="UrbanWear UPI Payment QR Code"
              className="w-56 h-56 object-contain"
            />

            <p className="text-lg font-bold text-primary-text">
              ₹{formatPrice(qrData.amount / 100)}
            </p>

            <p className="text-xs text-secondary-text">
              Order ID: {qrData.orderId}
            </p>

            <button
              type="button"
              disabled={loading}
              onClick={handleVerifyQrPayment}
              className="cursor-pointer w-full text-dark bg-btn py-2 px-3 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Checking Payment..."
                : "I've completed the payment"}
            </button>
          </div>
        )}

        {/* Checkout button */}
        {!qrData && (
          <div className="w-full">
            {orderError && (
              <p className="text-red-500 text-sm mb-2">{orderError}</p>
            )}

            <button
              type="button"
              disabled={cart.length === 0 || !selectedAddressId || loading}
              onClick={handlePlaceOrder}
              className="cursor-pointer w-full text-dark bg-btn py-2 px-3 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        )}

        {qrData && orderError && (
          <p className="text-red-500 text-sm mb-2">{orderError}</p>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
