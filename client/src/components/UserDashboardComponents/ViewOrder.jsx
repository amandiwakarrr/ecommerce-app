
import { useParams, useNavigate } from "react-router-dom";
import useOrders from "../../context/useOrders";

function ViewOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { orders, loading } = useOrders();

  const order = orders.find((item) => item._id === id);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <p className="text-center py-10 text-secondary-text">
        Loading order details...
      </p>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold text-primary-text">
          Order not found
        </h2>

        <button
          onClick={() => navigate("/account/orders")}
          className="mt-4 bg-btn px-5 py-2 rounded text-black"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const address = order.shippingAddress;

  return (
    <div className="px-4 sm:px-5 py-5 space-y-5">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary-text font-syne">
            Order Details
          </h1>

          <p className="text-sm text-secondary-text mt-1">
            Order ID: {order._id.slice(-8).toUpperCase()}
          </p>

          <p className="text-sm text-secondary-text mt-1">
            Placed on: {formatDate(order.createdAt)}
          </p>
        </div>

        <button
          onClick={() => navigate("/account/orders")}
          className="border border-primary-border px-4 py-2 rounded text-primary-text hover:bg-secondary-bg"
        >
          Back to Orders
        </button>
      </div>

      {/* Order Status */}
      <div className="bg-secondary-bg border border-primary-border rounded p-4">
        <h2 className="font-bold text-primary-text mb-3">
          Order Status
        </h2>

        <div className="flex flex-wrap gap-3">
          <span className="bg-primary-bg border border-primary-border rounded px-3 py-2 text-sm text-primary-text">
            Order: {order.orderStatus}
          </span>

          <span className="bg-primary-bg border border-primary-border rounded px-3 py-2 text-sm text-primary-text">
            Payment: {order.paymentStatus}
          </span>
        </div>
      </div>

      {/* Ordered Products */}
      <div className="bg-secondary-bg border border-primary-border rounded p-4">
        <h2 className="text-lg font-bold text-primary-text mb-4">
          Ordered Products ({order.items?.length || 0})
        </h2>

        <div className="space-y-4">
          {order.items?.map((item, index) => (
            <div
              key={`${item.product}-${index}`}
              className="flex flex-col sm:flex-row gap-4 border-b border-primary-border pb-4 last:border-0 last:pb-0"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-28 object-cover rounded bg-primary-bg"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-primary-text">
                  {item.title}
                </h3>

                <p className="text-sm text-secondary-text mt-2">
                  Price: {formatCurrency(item.price)}
                </p>

                <p className="text-sm text-secondary-text">
                  Quantity: {item.quantity}
                </p>

                {item.size && (
                  <p className="text-sm text-secondary-text">
                    Size: {item.size}
                  </p>
                )}

                {item.color && (
                  <p className="text-sm text-secondary-text">
                    Color: {item.color}
                  </p>
                )}

                <p className="font-semibold text-primary-text mt-2">
                  Item Total: {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-secondary-bg border border-primary-border rounded p-4">
        <h2 className="text-lg font-bold text-primary-text mb-3">
          Shipping Address
        </h2>

        {address ? (
          <div className="text-sm text-secondary-text space-y-2">
            <p className="font-semibold text-primary-text">
              {address.fullName}
            </p>

            <p>{address.phone}</p>

            <p>{address.addressLine1}</p>

            {address.addressLine2 && <p>{address.addressLine2}</p>}

            <p>
              {address.city}, {address.state} - {address.postalCode}
            </p>

            <p>{address.country}</p>
          </div>
        ) : (
          <p className="text-secondary-text">
            Shipping address unavailable.
          </p>
        )}
      </div>

      {/* Payment Details */}
      <div className="bg-secondary-bg border border-primary-border rounded p-4">
        <h2 className="text-lg font-bold text-primary-text mb-3">
          Payment Details
        </h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <span className="text-secondary-text">Payment Method</span>
            <span className="text-primary-text font-medium">
              {order.paymentMethod}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-secondary-text">Payment Status</span>
            <span className="text-primary-text font-medium">
              {order.paymentStatus}
            </span>
          </div>

          {order.razorpayPaymentId && (
            <div className="flex flex-col gap-1">
              <span className="text-secondary-text">
                Payment ID
              </span>
              <span className="text-primary-text break-all">
                {order.razorpayPaymentId}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-secondary-bg border border-primary-border rounded p-4">
        <h2 className="text-lg font-bold text-primary-text mb-4">
          Price Summary
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary-text">Subtotal</span>
            <span className="text-primary-text">
              {formatCurrency(order.subtotal)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-secondary-text">Shipping Charge</span>
            <span className="text-primary-text">
              {Number(order.shippingCharge) === 0
                ? "Free"
                : formatCurrency(order.shippingCharge)}
            </span>
          </div>

          <div className="border-t border-primary-border pt-3 flex justify-between">
            <span className="font-bold text-primary-text">
              Total Amount
            </span>

            <span className="font-bold text-btn text-lg">
              {formatCurrency(order.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Continue Shopping */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/shop")}
          className="bg-btn text-black px-5 py-3 rounded font-semibold hover:opacity-90"
        >
          Continue Shopping
        </button>
      </div>

    </div>
  );
}

export default ViewOrder;
