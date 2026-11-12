
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
              // Guest cart stores product details directly.
              // MongoDB cart stores them inside item.product.
              const product = item.product || item;

              const price =
                product.discountPrice ?? product.price ?? 0;

              const itemKey =
                item._id ||
                `${item.productId}-${item.size}-${item.color}`;

              return (
                <div
                  key={itemKey}
                  className="w-full flex items-center justify-between gap-3 border-b border-primary-border py-2 sm:py-5"
                >
                  {/* Product image */}
                  <div>
                    <img
                      className="w-16 h-16 rounded object-cover"
                      src={product.images?.[0]?.url}
                      alt={product.images?.[0]?.alt || product.title}
                    />
                  </div>

                  <div className="w-full flex justify-between gap-2">
                    {/* Product details */}
                    <div className="w-full flex flex-col justify-between gap-2">
                      <h2 className="text-[clamp(0.8rem,2vw,1.5rem)] font-syne font-bold text-primary-text">
                        {product.title}
                      </h2>

                      <div className="w-full flex flex-row flex-wrap gap-2">
                        <span className="text-[12px] text-secondary-text">
                          Size: {item.size || "N/A"}
                        </span>

                        <span className="text-[12px] text-secondary-text">
                          Color: {item.color || "N/A"}
                        </span>

                        <span className="text-[12px] text-secondary-text">
                          ₹{formatPrice(price)}
                        </span>
                      </div>

                      {/* Quantity controls */}
                      <div className="w-fit mt-1 text-primary-text border border-primary-border rounded h-8 flex items-center justify-center gap-4 px-3 text-sm">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item)}
                          className="cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item)}
                          className="cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price and remove */}
                    <div className="flex items-end flex-col justify-between">
                      <h2 className="text-[clamp(0.9rem,2vw,1.5rem)] text-tertiary-text">
                        ₹{formatPrice(price * item.quantity)}
                      </h2>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item)}
                        className="text-[12px] cursor-pointer text-primary-text"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full flex flex-col min-w-0 gap-2 mt-5 sm:mt-20">
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
              <span className="text-tertiary-text font-bold">
                Total
              </span>

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
              onClick={() => navigate("/checkout")}
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
