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
          className={`flex items-center border rounded cursor-pointer px-2 gap-2
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

      {selected === "card" && (
        <div className="w-full flex flex-col gap-3 p-4 border border-primary-border rounded-lg">
          <div className="flex flex-col gap-1">
            <label className="text-secondary-text">Cardholder Name</label>
            <input
              type="text"
              placeholder="Name on card"
              className="border text-primary-text  border-primary-border rounded px-2 py-2 focus:outline-btn   "
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-secondary-text">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="border text-primary-text border-primary-border rounded px-2 py-2 focus:outline-btn   "
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-secondary-text">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="border text-primary-text border-primary-border rounded px-2 py-2 focus:outline-btn   "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-secondary-text">CVV</label>
              <input
                type="password"
                placeholder="CVV"
                maxLength={4}
                className="border text-primary-text border-primary-border rounded px-2 py-2 focus:outline-btn"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentMethods;
