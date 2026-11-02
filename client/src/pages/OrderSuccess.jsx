import { useNavigate } from "react-router-dom";
function OrderSuccess() {
  const navigate = useNavigate();
  return (
    <div className="w-full px-5 h-97 flex flex-col items-center justify-center gap-2">
      <h1 className="text-[clamp(1rem,3vw,2.25rem)] text-primary-text font-extrabold font-syne">
        Order confirmed
      </h1>
      <p className="text-secondary-text tex-[12px]">
        Thanks for shopping with UrbanWear. Order #UW-48213 is on its way, and a
        receipt is in your inbox.
      </p>
      <button className="px-2 rounded cursor-pointer py-2 bg-btn" onClick={() => navigate("/shop")}>
        Continue shopping
      </button>
    </div>
  );
}

export default OrderSuccess;
