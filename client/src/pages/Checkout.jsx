import ShippingDetails from "../components/checkout/ShippingDetails";
import OrderSummary from "../components/checkout/OrderSummary";
function Checkout() {
  return (
    <div className="w-full h-auto px-5 py-5 sm:px-8 lg:px-15">
      <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 gap-5 ">
        <div className=" w-full flex flex-col items-center justify-between">
          <div className="w-full py-5 text-[14px] flex font-syne text-secondary-text gap-2 font-bold">
            <span className="text-tertiary-text">Shipping </span>
            {">"}
            <span className="text-tertiary-text">Payment</span>
            {">"}
            <span>Confirm</span>
          </div>
          {/* Shipping Details */}
          <ShippingDetails />
        </div>
        {/* checkout order summary */}
        <OrderSummary />
      </div>
    </div>
  );
}

export default Checkout;
