
import { useNavigate, useLocation } from "react-router-dom";
import useOrders from "../context/useOrders";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orders, loading } = useOrders();

  const orderId = location.state?.order?._id;

  const recentOrder =
    orders.find((order) => order._id === orderId) ||
    (orderId ? location.state?.order : orders[0]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price || 0);

  const downloadInvoice = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="w-full min-h-97 flex items-center justify-center text-secondary-text">
        Loading order details...
      </div>
    );
  }

  if (!recentOrder) {
    return (
      <div className="w-full min-h-97 flex flex-col items-center justify-center gap-4">
        <h1 className="text-primary-text text-xl font-bold">
          Order details not found
        </h1>

        <button
          onClick={() => navigate("/account/orders")}
          className="px-5 py-2 bg-btn rounded cursor-pointer"
        >
          View My Orders
        </button>
      </div>
    );
  }

  const shippingAddress = recentOrder.shippingAddress || {};

  return (
    <div className="w-full min-h-97 px-5 py-10 flex flex-col items-center">
      <style>
        {`
          @media print {
            body {
              background: white !important;
              color: black !important;
            }

            .invoice-content {
              color: black !important;
              background: white !important;
              border-color: #ddd !important;
            }

            .invoice-content * {
              color: black !important;
            }

            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      <div className="w-full max-w-4xl flex flex-col gap-6">

        {/* Success Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
            <i className="pi pi-check text-green-500 text-3xl"></i>
          </div>

          <h1 className="text-primary-text text-2xl md:text-3xl font-extrabold font-syne">
            Order Placed Successfully!
          </h1>

          <p className="text-secondary-text text-sm">
            Thank you for shopping with UrbanWear.
            Your order has been received.
          </p>

          <p className="text-secondary-text text-xs">
            Order ID: #{recentOrder._id.slice(-8).toUpperCase()}
          </p>
        </div>

        {/* Order Details */}
        <div className="invoice-content border border-border rounded-lg p-5 md:p-7 flex flex-col gap-6">

          <div className="flex flex-wrap justify-between gap-4 border-b border-border pb-5">
            <div>
              <h2 className="text-primary-text text-xl font-bold font-syne">
                Order Summary
              </h2>

              <p className="text-secondary-text text-xs mt-1">
                Order placed on{" "}
                {recentOrder.createdAt
                  ? new Date(recentOrder.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "Date unavailable"}
              </p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <p className="text-primary-text">
                Order Status:{" "}
                <span className="text-green-500 font-semibold">
                  {recentOrder.orderStatus}
                </span>
              </p>

              <p className="text-primary-text">
                Payment:{" "}
                <span className="font-semibold">
                  {recentOrder.paymentStatus}
                </span>
              </p>
            </div>
          </div>

          {/* Purchased Products */}
          <div>
            <h3 className="text-primary-text font-bold mb-4">
              Items Ordered
            </h3>

            <div className="flex flex-col gap-4">
              {recentOrder.items?.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex gap-4 items-center border-b border-border pb-4"
                >
                  <div className="w-20 h-24 shrink-0 bg-secondary-bg rounded overflow-hidden">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-primary-text font-semibold text-sm">
                      {item.title}
                    </h4>

                    <p className="text-secondary-text text-xs mt-1">
                      Size: {item.size || "N/A"} | Color:{" "}
                      {item.color || "N/A"}
                    </p>

                    <p className="text-secondary-text text-xs mt-1">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-primary-text font-semibold text-sm mt-2">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Details */}
          <div className="flex flex-col gap-3 border-b border-border pb-5">
            <h3 className="text-primary-text font-bold">
              Price Details
            </h3>

            <div className="flex justify-between text-sm">
              <span className="text-secondary-text">Subtotal</span>
              <span className="text-primary-text">
                {formatPrice(recentOrder.subtotal)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-secondary-text">Shipping</span>
              <span className="text-primary-text">
                {recentOrder.shippingCharge === 0
                  ? "Free"
                  : formatPrice(recentOrder.shippingCharge)}
              </span>
            </div>

            <div className="flex justify-between text-lg font-bold pt-2">
              <span className="text-primary-text">Total</span>
              <span className="text-btn">
                {formatPrice(recentOrder.totalAmount)}
              </span>
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h3 className="text-primary-text font-bold mb-3">
              Payment Information
            </h3>

            <div className="flex flex-col gap-2 text-sm">
              <p className="text-secondary-text">
                Payment Method:{" "}
                <span className="text-primary-text">
                  {recentOrder.paymentMethod}
                </span>
              </p>

              <p className="text-secondary-text">
                Payment Status:{" "}
                <span className="text-primary-text">
                  {recentOrder.paymentStatus}
                </span>
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-primary-text font-bold mb-3">
              Shipping Address
            </h3>

            <div className="text-sm text-secondary-text leading-6">
              <p className="text-primary-text font-semibold">
                {shippingAddress.fullName}
              </p>

              <p>{shippingAddress.phone}</p>
              <p>{shippingAddress.addressLine1}</p>

              {shippingAddress.addressLine2 && (
                <p>{shippingAddress.addressLine2}</p>
              )}

              <p>
                {shippingAddress.city}, {shippingAddress.state} -{" "}
                {shippingAddress.postalCode}
              </p>

              <p>{shippingAddress.country}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="no-print flex flex-wrap justify-center gap-3">
          <button
            onClick={downloadInvoice}
            className="px-5 py-3 border border-border text-primary-text rounded cursor-pointer hover:border-btn flex items-center gap-2"
          >
            <i className="pi pi-download"></i>
            Download Invoice
          </button>

          <button
            onClick={() => navigate("/shop")}
            className="px-5 py-3 bg-btn rounded cursor-pointer"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate(`/view-order/${recentOrder._id}`)}
            className="px-5 py-3 border border-border text-primary-text rounded cursor-pointer"
          >
            View Order
          </button>
        </div>

      </div>
    </div>
  );
}

export default OrderSuccess;
