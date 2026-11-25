import { useState } from "react";
import CreditCardSim from "../../assets/creditcardsim.webp";
import NFClogo from "../../assets/NFC.svg";

function Payment() {
  const [cards, setCards] = useState([
    {
      id: 1,
      bank: "SBI BANK",
      holder: "AMAN DIWAKAR",
      last4: "0297",
      expiry: "06/39",
      type: "VISA",
      isDefault: true,
      gradient: "from-[#252d46] via-[#172033] to-[#101522]",
    },
    {
      id: 2,
      bank: "RBI BANK",
      holder: "GAURAV BHIKHARI",
      last4: "9457",
      expiry: "06/29",
      type: "MASTERCARD",
      isDefault: false,
      gradient: "from-[#422b25] via-[#29201f] to-[#171414]",
    },
  ]);

  const removeCard = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const setDefault = (id) => {
    setCards((prev) =>
      prev.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-primary-text">
            Payment Methods
          </h2>
          <p className="text-sm text-secondary-text mt-1">
            Manage your saved cards and payment preferences.
          </p>
        </div>

        <button
          className="bg-btn cursor-pointer text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition">
          + Add New Card
        </button>
      </div>

      {/* Cards */}
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col gap-4"
            >
              {/* Credit Card */}
              <div
                className={`relative w-full h-52 overflow-hidden rounded-2xl p-5 bg-linear-to-br ${card.gradient} border border-white/10 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                {/* Decorative circles */}
                <div className="absolute -right-12 -top-16 w-48 h-48 rounded-full border border-white/10" />
                <div className="absolute -right-5 -top-9 w-32 h-32 rounded-full border border-white/10" />

                {/* Bank name and default badge */}
                <div className="relative flex justify-between items-center">
                  <h3 className="text-white font-semibold tracking-wider text-sm">
                    {card.bank}
                  </h3>

                  {card.isDefault && (
                    <span className="text-[10px] bg-white/15 text-white px-2.5 py-1 rounded-full">
                      DEFAULT
                    </span>
                  )}
                </div>

                {/* Chip and NFC */}
                <div className="relative flex justify-between items-center mt-5">
                  <img
                    src={CreditCardSim}
                    alt="Card chip"
                    className="w-11 h-9 object-contain"
                  />

                  <img
                    src={NFClogo}
                    alt="Contactless"
                    className="w-7 h-7 brightness-0 invert opacity-80"
                  />
                </div>

                {/* Masked number */}
                <div className="relative flex items-center gap-3 mt-5 text-white text-lg sm:text-xl tracking-[3px]">
                  <span>••••</span>
                  <span>••••</span>
                  <span>••••</span>
                  <span>{card.last4}</span>
                </div>

                {/* Card details */}
                <div className="relative flex justify-between items-end mt-5">
                  <div>
                    <p className="text-[9px] text-white/50 uppercase mb-1">
                      Card Holder
                    </p>
                    <p className="text-white text-xs font-medium tracking-wider">
                      {card.holder}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] text-white/50 uppercase mb-1">
                      Expires
                    </p>
                    <p className="text-white text-xs font-medium">
                      {card.expiry}
                    </p>
                  </div>

                  <span className="text-white font-bold italic text-sm">
                    {card.type}
                  </span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => removeCard(card.id)}
                  className="text-red-500 text-sm hover:text-red-400 transition"
                >
                  Remove Card
                </button>

                {!card.isDefault && (
                  <button
                    onClick={() => setDefault(card.id)}
                    className="text-primary-text text-sm border border-primary-border px-3 py-2 rounded-lg hover:bg-secondary-bg transition"
                  >
                    Set as Default
                  </button>
                )}

                {card.isDefault && (
                  <span className="text-green-500 text-sm font-medium">
                    ✓ Primary Card
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-primary-border rounded-2xl">
          <div className="text-4xl mb-3">💳</div>
          <h3 className="text-primary-text font-semibold">
            No payment methods yet
          </h3>
          <p className="text-secondary-text text-sm mt-2">
            Add a card to make your checkout faster.
          </p>
        </div>
      )}
    </div>
  );
}

export default Payment;
