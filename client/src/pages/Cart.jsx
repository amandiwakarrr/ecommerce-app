import { useNavigate } from "react-router-dom";
import useCart from "../context/useCart";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="w-full h-auto px-5 py-5 sm:px-8 lg:px-15">
      <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 gap-5 place-items-start">
        {/* Cart items */}
        <div className="w-full gap-4 min-w-0">
          <div className="w-full pb-5">
            <h2 className="text-[clamp(1rem,2vw,3rem)] font-extrabold font-syne text-primary-text">
              Your cart ({cart.length})
            </h2>
          </div>

          {cart.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center gap-4 py-12 border-b border-primary-border">
              <i className="pi pi-shopping-bag text-4xl text-secondary-text"></i>

              <h2 className="font-syne font-extrabold text-primary-text text-xl">
                Your cart is empty
              </h2>

              <span className="text-secondary-text text-center">
                Add something you like and it will show up here.
              </span>

              <button
                type="button"
                onClick={() => navigate("/shop")}
                className="py-3 px-5 cursor-pointer bg-btn rounded text-dark"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const product = item.product || item;
              const price = product.discountPrice ?? product.price ?? 0;

              const itemKey =
                item._id || `${item.productId}-${item.size}-${item.color}`;

              return (
                <div
                  key={itemKey}
                  className="w-full flex items-center gap-3 sm:gap-5 p-3 sm:p-4 bg-secondary-bg border border-primary-border rounded-lg hover:border-[#f5b544]/50 transition-colors mb-2"
                >
                  {/* Product Image */}
                  <div className="shrink-0 w-20 h-22 sm:w-36 sm:h-40 bg-white rounded-md overflow-hidden flex items-center justify-center">
                    <img
                      className="w-full h-full object-contain p-2 transition-transform duration-300 hover:scale-110"
                      src={product.images?.[0]?.url}
                      alt={product.images?.[0]?.alt || product.title}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center gap-2 sm:gap-3">
                    <h2 className="text-sm sm:text-xl font-syne font-bold text-primary-text line-clamp-2">
                      {product.title}
                    </h2>

                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] sm:text-sm text-secondary-text">
                      <span>Size: {item.size || "N/A"}</span>
                      <span>Color: {item.color || "N/A"}</span>
                    </div>

                    <span className="text-sm sm:text-base font-semibold text-primary-text">
                      ₹{formatPrice(price)}
                    </span>

                    {/* Quantity Controls */}
                    <div className="w-fit flex items-center gap-4 px-3 h-8 border border-primary-border rounded text-primary-text text-sm">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item)}
                        className="cursor-pointer hover:text-[#f5b544]"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item)}
                        className="cursor-pointer hover:text-[#f5b544]"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price and Remove */}
                  <div className="shrink-0 flex flex-col items-end justify-between self-stretch">
                    <span className="text-sm sm:text-xl font-semibold text-tertiary-text">
                      ₹{formatPrice(price * item.quantity)}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item)}
                      className="flex items-center gap-1 text-xs sm:text-sm text-secondary-text hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <i className="pi pi-trash text-xs" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full flex flex-col min-w-0 gap-2 mt-5 sm:mt-17">
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
              Go to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
