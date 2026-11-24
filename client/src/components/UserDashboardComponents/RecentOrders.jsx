import { Link } from "react-router-dom";
import CurrentOrder from "./CurrentOrder";
import useOrders from "../../context/useOrders.js";

function RecentOrders() {
  const { orders, loading } = useOrders();

  // Loading state
  if (loading) {
    return (
      <div className="w-full p-5 text-center text-secondary-text">
        Loading recent orders...
      </div>
    );
  }

  // No orders found
  if (orders.length === 0) {
    return (
      <div className="w-full flex flex-col px-5 sm:px-5 py-2">
        <CurrentOrder />

        <div className="w-full p-8 mt-5 text-center border border-primary-border rounded">
          <i className="pi pi-shopping-bag text-3xl text-tertiary-text"></i>

          <h2 className="text-xl font-semibold text-primary-text mt-3">
            No orders found
          </h2>

          <p className="text-secondary-text mt-2">
            You haven't placed any orders yet.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-4 bg-btn text-black px-5 py-2 rounded"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col px-3 sm:px-5 py-2">
      <CurrentOrder />
      <div className="w-full flex flex-col border border-primary-border p-2 rounded">

        {/* Heading */}
        <div className="w-full">
          <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-primary-text font-bold font-syne">
            Recent orders
          </h1>
        </div>

        {/* Table Header */}
        <div className="w-full grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 pb-2">
          <p className="w-full text-tertiary-text col-span-2 sm:col-span-1">
            Order
          </p>

          <p className="w-full text-tertiary-text">
            Date
          </p>

          <p className="w-full text-tertiary-text hidden sm:flex">
            Amount
          </p>

          <p className="w-full text-tertiary-text">
            Status
          </p>

          <p className="w-full text-tertiary-text hidden md:flex">
            Payment
          </p>

          <p className="w-full text-tertiary-text hidden lg:flex">
            View
          </p>
        </div>

        {/* Previous Orders */}
        <div className="w-full flex flex-col">
          {orders.slice(1).length === 0 ? (
            <p className="text-secondary-text text-center py-5">
              No previous orders found.
            </p>
          ) : (
            orders.slice(1).map((order) => (
              <div
                key={order._id}
                className="w-full even:bg-dark odd:bg-secondary-bg grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 py-4"
              >
                <Link
                  to={`/account/view-order//${order._id}`}
                  className="w-full hover:text-tertiary-text sm:hover:text-primary-text cursor-pointer text-primary-text col-span-2 sm:col-span-1">
                  #{order._id.slice(-8).toUpperCase()}
                </Link>

                <p className="w-full text-primary-text">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <p className="w-full text-primary-text hidden sm:flex">
                  ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                </p>

                <p className="w-full text-green-700">
                  {order.orderStatus}
                </p>

                <p className="w-full text-primary-text hidden md:flex">
                  {order.paymentMethod}
                </p>

                <p className="w-full text-primary-text hidden lg:flex items-center">
                  <Link
                    className="w-full flex items-center"
                    to={`/account/view-order//${order._id}`}
                  >
                    <i className="cursor-pointer pl-2 pi pi-eye hover:text-tertiary-text"></i>
                  </Link>
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentOrders;
