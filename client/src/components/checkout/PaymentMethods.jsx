
const paymentOptions = [
  {
    id: "upi",
    title: "UPI",
    description: "Google Pay, PhonePe, Paytm and more",
    icon: "pi pi-mobile",
  },
  {
    id: "card",
    title: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay and more",
    icon: "pi pi-credit-card",
  },
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: "pi pi-wallet",
  },
];

function PaymentMethods({
  selectedPaymentMethod,
  onPaymentMethodChange,
}) {
  return (
    <div className="w-full flex flex-col gap-3">
      <h2 className="text-[clamp(1.2rem,2vw,2rem)] text-primary-text font-bold font-syne">
        Payment
      </h2>

      {paymentOptions.map((option) => (
        <label
          key={option.id}
          className={`flex items-center border rounded cursor-pointer px-3 py-3 gap-3
            ${
              selectedPaymentMethod === option.id
                ? "border-btn bg-btn/10"
                : "border-primary-border"
            }`}
        >
          <input
            type="radio"
            name="payment"
            value={option.id}
            checked={selectedPaymentMethod === option.id}
            onChange={() => onPaymentMethodChange(option.id)}
          />

          <i className={`${option.icon} text-xl text-primary-text`} />

          <div className="flex-1">
            <h3 className="text-primary-text font-semibold">
              {option.title}
            </h3>

            <p className="text-xs text-secondary-text">
              {option.description}
            </p>
          </div>
        </label>
      ))}
    </div>
  );
}

export default PaymentMethods;
