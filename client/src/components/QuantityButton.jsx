
function QuantityButton({ quantity, setQuantity }) {
  return (
    <div className="w-full flex items-center justify-around px-2">
      <button
        type="button"
        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
        className="cursor-pointer"
      >
        -
      </button>

      <span>{quantity}</span>

      <button
        type="button"
        onClick={() => setQuantity((prev) => prev + 1)}
        className="cursor-pointer"
      >
        +
      </button>
    </div>
  );
}

export default QuantityButton;
