import { useNavigate } from "react-router-dom";
import useOrders from "../context/useOrders";

function OrderSuccess() {
  const navigate = useNavigate();
  const { orders, loading } = useOrders();
  const recentOrder = orders[0];

  if (loading) {
    return (
      <div className="w-full h-97 flex items-center justify-center">
        Loading order details...
      </div>
    );
  }

  if (!recentOrder) {
    return (
      <div className="w-full h-97 flex flex-col items-center justify-center gap-3">
        <h1 className="text-primary-text text-xl font-bold">
          Order details not found
        </h1>

        <button
          onClick={() => navigate("/account/orders")}
          className="px-4 py-2 bg-btn rounded cursor-pointer"
        >
          View My Orders
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-5 h-97 flex flex-col items-center justify-center gap-2">
      <h1 className="text-[clamp(1rem,3vw,2.25rem)] text-primary-text font-extrabold font-syne">
        Order Placed
      </h1>

      <p className="text-secondary-text text-[12px] text-center">
        {`Thanks for shopping with UrbanWear. Order #${recentOrder._id
          .slice(-8)
          .toUpperCase()} is on its way, and a receipt is in your inbox.`}
      </p>

      <div className=" flex gap-2">

        <button
          className="px-4 rounded cursor-pointer py-2 bg-btn"
          onClick={() => navigate("/shop")}
        >
          Continue Shopping
        </button>
        <button

          className="px-4 rounded cursor-pointer py-2 bg-btn"
          onClick={() => navigate(`/view-order/${recentOrder._id}`)}
        >
          View Order
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
