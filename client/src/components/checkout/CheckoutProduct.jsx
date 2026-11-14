import useCart from "../../context/useCart";
import { useNavigate } from "react-router-dom";
// import OrderSummary from "./OrderSummary";
function CheckoutProduct() {
  const navigate = useNavigate();
  const { cart, cartTotal } = useCart();

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  return (
    <div className={`w-full sm:mt-13`}>
      {cart.length === 0 ? (
        <h1></h1>
      ) : (
        cart.map((item) => {
          const product = item.product || item;
          const price = product.discountPrice ?? product.price ?? 0;
          const itemKey =
            item._id || `${item.productId}-${item.size}-${item.color}`;

          return (
            <div
              key={itemKey}
              className="w-full h-auto flex justify-between gap-2 border-b border-primary-border py-2"
            >
              <div>
                <img
                  className="w-16.5 h-16.5 rounded"
                  src={product.images?.[0]?.url}
                  alt={product.images?.[0]?.alt || product.title}
                />
              </div>
              <div className="w-full h-auto flex ">
                <div className="w-full h-full flex flex-col">
                  <h2 className="text-[clamp(0.7rem,2vw,1.5rem)] font-syne font-bold text-primary-text">
                    {product.title}
                  </h2>
                  <div className="text-[12px] text-secondary-text grid grid-cols-[max-content_max-content]  sm:grid-cols-[repeat(4,max-content)] gap-x-2 gap-y-1">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.color && <span>Color: {item.color}</span>}
                    {item.quantity && <span>Quantity: {item.quantity}</span>}
                    <span>Price: ₹{formatPrice(price)}</span>
                  </div>
                </div>
                <div className="flex items-end flex-col">
                  <h2 className="text-[12px] sm:text-xl font-semibold text-tertiary-text">
                    ₹{formatPrice(price * item.quantity)}
                  </h2>
                </div>
              </div>
            </div>
          );
        })
      )}
      {/* Order Summary */}
      <div className="w-full flex flex-col min-w-0 gap-2 mt-5 ">
        <div className="w-full border border-primary-border p-5 rounded bg-secondary-bg">
          <h2 className="font-syne font-extrabold text-primary-text">
            Order summary
          </h2>

          <div className="w-full flex flex-col border-b border-primary-border gap-2 py-2">
            <div className="w-full flex items-center justify-between text-secondary-text">
              <span>Subtotal</span>

              <span>₹{formatPrice(cartTotal)}</span>
            </div>

            <div className="w-full flex items-center justify-between text-secondary-text">
              <span>Shipping</span>

              <span>Free</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between mt-2">
            <span className="text-tertiary-text font-bold">Total</span>

            <span className="text-tertiary-text font-bold">
              ₹{formatPrice(cartTotal)}
            </span>
          </div>
        </div>

        {/* Checkout button */}
        <div className="w-full">
          <button
            type="button"
            disabled={cart.length === 0}
            onClick={() => {
              navigate("/checkout");
            }}
            className="cursor-pointer w-full text-dark bg-btn py-2 px-3 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutProduct;
