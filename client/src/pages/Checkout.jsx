import { useState } from "react";
import ShippingDetails from "../components/checkout/ShippingDetails";
import CheckoutProduct from "../components/checkout/CheckoutProduct";
function Checkout() {
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("upi");
  return (
    <div className="w-full h-auto px-5 py-5 sm:px-8 lg:px-15">
      <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-5 ">
        <div className=" w-full flex flex-col items-center">
          <div className="w-full py-5 text-[14px] flex font-syne text-secondary-text gap-2 font-bold">
            <span className="text-tertiary-text">Shipping </span>
            {">"}
            <span className="text-tertiary-text">Payment</span>
            {">"}
            <span>Confirm</span>
          </div>
          {/* Shipping Details */}
          <ShippingDetails
            selectedAddressId={selectedAddressId}
            onAddressChange={setSelectedAddressId}
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentMethodChange={setSelectedPaymentMethod}
          />
        </div>
        {/* checkout order summary  and Products*/}
        <CheckoutProduct selectedAddressId={selectedAddressId}
          selectedPaymentMethod={selectedPaymentMethod} />
      </div>
    </div>
  );
}

export default Checkout;
