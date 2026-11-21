import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/useWishlist";
import useOrders from "../../context/useOrders";
import { useAuth } from "../../context/useAuth";
function Overview() {

  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const { orders } = useOrders();
  const { user } = useAuth();

  const totalSpent = orders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce(
      (total, order) => total + Number(order.totalAmount || 0),
      0
    );
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const totalOrders = orders.filter(
    (order) => order.paymentStatus === "Paid"
  ).length;


  return (
    <div>
      <div className="w-full px-5 mt-2 sm:mt-10">
        <div className="w-full px-2 sm:px-5 flex items-center justify-between gap-3 border border-primary-border rounded bg-secondary-bg py-5">
          <div>
            <h2 className="text-[clamp(0.9rem,2vw,2rem)] text-primary-text font-bold font-syne">
              Welcome back, <span>{user?.name || "User"}</span>
            </h2>
            <p className="text-[10px] sm:text-[16px] text-tertiary-text">
              Member since{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                  month: "long",
                  year: "numeric",
                })
                : "—"}
            </p>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="text-[12px] cursor-pointer  bg-btn py-2 px-4 sm:text-[16px] rounded text-black whitespace-nowrap"
          >
            Continue Shopping
          </button>
        </div>
      </div>

      {/* Overview */}
      <div className="grid px-5 ">
        <div className="w-full  grid grid-cols-2 lg:grid-cols-4 gap-2 py-2 place-content-between">
          <div className="w-full p-2 flex flex-col items-center justify-center border border-primary-border rounded bg-secondary-bg">
            <span className="text-[16px] text-primary-text font-bold">
              Total orders
            </span>
            <h2 className="text-[clamp(1rem,3vw,2.25rem)] text-secondary-text">
              {totalOrders}
            </h2>
          </div>
          <div className="w-full p-2 flex flex-col items-center justify-center border border-primary-border rounded bg-secondary-bg">
            <span className="text-[16px] text-primary-text font-bold">
              Total spent
            </span>
            <h2 className="text-[clamp(1rem,3vw,2.25rem)] text-secondary-text">
              {formatCurrency(totalSpent)}
            </h2>
          </div>
          <div className="w-full p-2 flex flex-col items-center justify-center border border-primary-border rounded bg-secondary-bg">
            <span className="text-[16px] text-primary-text font-bold">
              Reward points
            </span>
            <h2 className="text-[clamp(1rem,3vw,2.25rem)] text-secondary-text">
              2,343
            </h2>
          </div>
          <div className="w-full p-2 flex flex-col items-center justify-center border border-primary-border rounded bg-secondary-bg">
            <span className="text-[16px] text-primary-text font-bold">
              Wishlist
            </span>
            <h2 className="text-[clamp(1rem,3vw,2.25rem)] text-secondary-text">
              {wishlist.length}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
