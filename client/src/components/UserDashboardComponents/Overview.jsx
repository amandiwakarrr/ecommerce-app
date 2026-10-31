import { useNavigate } from "react-router-dom";
function Overview() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full px-5 mt-2 sm:mt-10">
        <div className="w-full px-2 sm:px-5 flex items-center justify-between gap-3 border border-primary-border rounded bg-secondary-bg py-5">
          <div>
            <h2 className="text-[clamp(0.9rem,2vw,2rem)] text-primary-text font-bold font-syne">
              Welcome back, <span>Aman</span>
            </h2>
            <p className="text-[10px] sm:text-[16px] text-secondary-text">
              Member since March 2024
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
              23
            </h2>
          </div>
          <div className="w-full p-2 flex flex-col items-center justify-center border border-primary-border rounded bg-secondary-bg">
            <span className="text-[16px] text-primary-text font-bold">
              Total spent
            </span>
            <h2 className="text-[clamp(1rem,3vw,2.25rem)] text-secondary-text">
              $23,234
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
              5
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
