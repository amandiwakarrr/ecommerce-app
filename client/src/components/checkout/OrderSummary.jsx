import { useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
function OrderSummary() {
  const navigate = useNavigate();
  return (
    <div className=" w-full flex flex-col min-w-0 gap-2 sm:mt-15">
      {/* Product  */}
      <CheckoutProduct />
      {/* Order total */}
      <div className="w-full border border-primary-border p-5 rounded bg-secondary-bg ">
        <h2 className="font-syne font-bold text-primary-text">Order summary</h2>
        <div className="w-full flex flex-col border-b border-primary-border gap-2 py-1">
          <div className="w-full flex items-center justify-between text-secondary-text">
            <span>Subtotal</span>
            <span>₹149.00</span>
          </div>
          <div className="w-full flex items-center justify-between text-secondary-text">
            <span>Shipping</span>
            <span>Free</span>
          </div>
        </div>
        <div className="w-full flex items-center justify-between mt-2 text-tertiary-text">
          <span>Total</span>
          <span> ₹149.00</span>
        </div>
        <div className="w-full flex items-center justify-center mt-2 text-tertiary-text bg-dark py-1 rounded text-[12px] gap-2">
          <i className="pi pi-truck"></i>{" "}
          <span>Free shipping on order above 100</span>
        </div>
      </div>
      <div className="w-full">
        <button
          onClick={() => navigate("/order-success")}
          className="cursor-pointer w-full text-dark bg-btn py-2 px-3 rounded"
        >
          Place order
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
