import { useState } from "react";
const paymentOptions = [
  {
    id: "upi",
    title: "UPI",
    description: "Google Pay, PhonePe, Paytm",
    icon: "pi pi-mobile",
  },
  {
    id: "card",
    title: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay",
    icon: "pi pi-credit-card",
  },
  {
    id: "netbanking",
    title: "Net Banking",
    description: "All major banks supported",
    icon: "pi pi-building-columns",
  },
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: "pi pi-wallet",
  },
];
function PaymentMethods() {
  const [selected, setSelected] = useState("upi");
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-[clamp(1.2rem,2vw,2rem)] text-primary-text font-old font-syne">
        Payment
      </h2>
      {paymentOptions.map((option) => (
        <label
          key={option.id}
          className={`flex items-center  border rounded cursor-pointer px-2 gap-2
                     ${
                       selected === option.id
                         ? "border-black bg-btn text-dark"
                         : "text-primary-text border border-primary-border"
                     }`}
        >
          <input
            type="radio"
            name="payment"
            value={option.id}
            checked={selected === option.id}
            onChange={() => setSelected(option.id)}
          />

          <i className={`${option.icon}`}></i>

          <div className="w-full flex flex-col">
            <h3>{option.title}</h3>
            <p className="text-[12px] ">{option.description}</p>
          </div>
        </label>
      ))}
    </div>
  );
}

export default PaymentMethods;
