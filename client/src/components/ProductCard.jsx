import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useWishlistActions from "../hooks/useWishlistActions";
import useCartActions from "../hooks/useCartActions";

function ProductCard({ product }) {
  const [adding, setAdding] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const {
    handleAddToCart,
  } = useCartActions();

  const {
    isWishlisted,
    toggleWishlist,
    authLoading,
  } = useWishlistActions();

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const toastTimer = useRef(null);

  const image = product.images?.[0]?.url;
  const displayPrice = product.discountPrice ?? product.price;

  const hasDiscount =
    product.discountPrice != null && product.discountPrice < product.price;

  const wishlisted = isWishlisted(product._id);

  // Toast notification
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    clearTimeout(toastTimer.current);

    toastTimer.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  // Quick Add to Cart
  const handleQuickAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (authLoading || adding) return;

    try {
      setAdding(true);

      await handleAddToCart(
        product,
        product.sizes?.[0] || "",
        product.colors?.[0] || "",
        1
      );

      showToast("Product added to cart successfully!");
    } catch (error) {
      showToast(
        error.response?.data?.message ||
          error.message ||
          "Unable to add product.",
        "error"
      );
    } finally {
      setAdding(false);
    }
  };

  // Add or remove from Wishlist
  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (authLoading || wishlistLoading) return;

    try {
      setWishlistLoading(true);

      await toggleWishlist(product, showToast);
    } catch (error) {
      showToast(
        error.response?.data?.message ||
          error.message ||
          "Unable to update wishlist.",
        "error"
      );
    } finally {
      setWishlistLoading(false);
    }
  };

  useEffect(() => {
    return () => clearTimeout(toastTimer.current);
  }, []);

  return (
    <div className="w-full">
      <div className="card group grid place-items-center cursor-pointer w-full h-full rounded gap-2">
        <div className="grid place-items-center w-full h-auto pb-5 bg-secondary-bg rounded pt-2">
          <div className="w-full flex px-1 justify-between">
            <span className="text-[12px] p-2 rounded font-bold text-tertiary-text font-syne">
              {product.badge || ""}
            </span>

            <button
              type="button"
              onClick={handleWishlist}
              disabled={wishlistLoading || authLoading}
              aria-label={
                wishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              className="text-[12px] p-2 rounded-full flex items-center disabled:opacity-50 cursor-pointer"
            >
              <i
                className={`pi pi-heart-fill ${
                  wishlisted ? "text-red-600" : "text-primary-text"
                }`}
              />
            </button>
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="w-full grid place-items-center"
          >
            <img
              className="w-[80%] aspect-3/4 object-cover h-[90%] rounded"
              src={image}
              alt={product.images?.[0]?.alt || product.title}
              loading="lazy"
            />
          </Link>

          <div className="relative w-full h-8.75 flex justify-center items-center">
            <span className="group-hover:invisible font-syne text-primary-text">
              {product.category}
            </span>

            <button
              onClick={handleQuickAdd}
              disabled={adding || authLoading}
              className="font-syne absolute inset-0 mx-auto w-[90%] bg-btn py-2 rounded text-black cursor-pointer opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
            >
              {adding ? "Adding..." : "Quick add"}
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-0.1 text-gray-200">
          <Link to={`/product/${product.slug}`} className="text-left">
            <h1 className="text-[clamp(12px,1vw,2rem)] font-bold font-syne">
              {product.title}
            </h1>
          </Link>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[clamp(12px,1vw,2rem)] font-bold">
              ₹{displayPrice.toLocaleString("en-IN")}
            </span>

            {hasDiscount && (
              <span className="text-xs text-tertiary-text line-through">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-xl text-white ${
            toast.type === "success" ? "bg-[#202820]" : "bg-[#351c1c]"
          }`}
        >
          <i
            className={`pi ${
              toast.type === "success"
                ? "pi-check-circle text-green-400"
                : "pi-exclamation-circle text-red-400"
            }`}
          />

          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
