import { useState } from "react";
function QuantityButton() {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="w-full flex items-center justify-around px-2">
      <button
        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
        className="cursor-pointer"
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        onClick={() => setQuantity((prev) => prev + 1)}
        className="cursor-pointer"
      >
        +
      </button>
    </div>
  );
}

export default QuantityButton;
