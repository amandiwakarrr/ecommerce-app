import ProductCard from "../components/ProductCard";
import QuantityButton from "../components/QuantityButton";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useProduct } from "../context/useProduct";
import { Link } from "react-router-dom";
import useCartActions from "../hooks/useCartActions";
import useWishlistActions from "../hooks/useWishlistActions";

// Product details component
function ProductDetails({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const { handleAddToCart, authLoading } = useCartActions();

  const { isWishlisted, toggleWishlist } = useWishlistActions();

  const wishlisted = isWishlisted(product._id);

  // Toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const toastTimer = useRef(null);

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    clearTimeout(toastTimer.current);

    toastTimer.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  // Clear toast timer when component unmounts
  useEffect(() => {
    return () => clearTimeout(toastTimer.current);
  }, []);

  // Add product to cart
  const handleCart = async () => {
    if (authLoading || adding) return;

    try {
      setAdding(true);

      await handleAddToCart(product, selectedSize, selectedColor, quantity);

      showToast("Product added to cart successfully!");
    } catch (error) {
      showToast(
        error.response?.data?.message ||
          error.message ||
          "Unable to add product to cart.",
        "error",
      );
    } finally {
      setAdding(false);
    }
  };

  // Add or remove product from wishlist
  const handleWishlist = async () => {
    if (authLoading || wishlistLoading) return;

    try {
      setWishlistLoading(true);

      await toggleWishlist(product, showToast);
    } catch (error) {
      showToast(
        error.response?.data?.message ||
          error.message ||
          "Unable to update wishlist.",
        "error",
      );
    } finally {
      setWishlistLoading(false);
    }
  };

  const colorMap = {
    Black: "#000000",
    White: "#FFFFFF",
    "Navy Blue": "#000080",
    Red: "#FF0000",
    Green: "#008000",
    Grey: "#808080",
    Gray: "#808080",
    Beige: "#F5F5DC",
    Brown: "#8B4513",
    Blue: "#0000FF",
    Pink: "#FFC0CB",
  };

  return (
    <div className="w-full h-auto py-2 grid place-items-center px-5 sm:px-8 md:px-15 lg:px-18">
      <div className="w-full grid">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm flex-wrap pb-2">
          <Link
            to="/"
            className="text-tertiary-text hover:text-primary-text transition-colors"
          >
            Home
          </Link>

          <span className="text-secondary-text">/</span>

          <Link
            to={`/shop?category=${encodeURIComponent(product.category)}`}
            className="text-tertiary-text hover:text-primary-text transition-colors"
          >
            {product.category}
          </Link>

          <span className="text-secondary-text">/</span>

          <span className="text-secondary-text" aria-current="page">
            {product.title}
          </span>
        </nav>

        <div className="w-full grid sm:grid-cols-2 gap-5">
          {/* Left: Product images */}
          <div className="w-full flex flex-col gap-3">
            <div className="w-full bg-white rounded h-42.5 sm:h-125 flex items-center justify-center overflow-hidden group cursor-zoom-in">
              <img
                className="w-[60%] sm:w-[70%] rounded object-contain transition-transform duration-500 ease-in-out group-hover:scale-150"
                src={product.images?.[selectedImage]?.url}
                alt={product.title}
              />
            </div>

            <div className="w-full grid grid-cols-4 gap-2">
              {product.images?.map((image, index) => (
                <div key={image.public_id || index}>
                  <img
                    className="rounded cursor-pointer"
                    src={image.url}
                    onClick={() => setSelectedImage(index)}
                    alt={image.alt || `${product.title} ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product information */}
          <div className="w-full flex flex-col gap-2">
            <h1 className="font-extrabold font-syne text-[clamp(2rem,3vw,4rem)] text-primary-text">
              {product.title}
            </h1>

            {/* Price */}
            <div className="w-full flex items-start gap-2">
              <span className="text-primary-text">
                ₹
                {(product.discountPrice ?? product.price).toLocaleString(
                  "en-IN",
                )}
              </span>

              {product.discountPrice != null &&
                product.discountPrice < product.price && (
                  <span className="line-through text-secondary-text">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                )}
            </div>

            <p className="text-secondary-text">{product.description}</p>

            {/* Color selection */}
            {product.colors?.length > 0 && (
              <div className="w-full flex flex-col gap-2">
                <div className="flex gap-2">
                  <span className="text-primary-text">Color :</span>
                  <span className="text-tertiary-text">{selectedColor}</span>
                </div>

                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      title={color}
                      aria-label={`Select ${color}`}
                      aria-pressed={selectedColor === color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        backgroundColor: colorMap[color] || color,
                      }}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                        selectedColor === color
                          ? "border-white outline outline-gray-400"
                          : "border-primary-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            {product.sizes?.length > 0 && (
              <div className="w-70 flex flex-col gap-2">
                <div className="w-full flex gap-2">
                  <span className="text-primary-text">Size :</span>
                  <span className="text-tertiary-text">{selectedSize}</span>
                </div>

                <div className="w-70 grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-1 rounded cursor-pointer text-primary-text border border-primary-border ${
                        selectedSize === size ? "bg-btn text-black" : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity, Cart and Wishlist */}
            <div className="w-full order grid grid-col-2 md:grid-cols-5 gap-3">
              <div className="col-span-1 order-1 bg-dark text-primary-text py-2 rounded border border-primary-border">
                <QuantityButton quantity={quantity} setQuantity={setQuantity} />
              </div>

              <button
                onClick={handleCart}
                disabled={authLoading || adding}
                className="col-span-3 cursor-pointer order-3 sm:order-2 bg-btn text-black py-2 rounded border border-primary-border disabled:opacity-50"
              >
                {adding ? "Adding..." : "Quick add"}
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                disabled={authLoading || wishlistLoading}
                aria-label={
                  wishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                className="col-span-1 cursor-pointer order-2 sm:order-3 flex items-center justify-center gap-1 bg-dark text-primary-text py-2 rounded border border-primary-border disabled:opacity-50"
              >
                <i
                  className={`pi pi-heart-fill ${
                    wishlisted ? "text-red-600" : ""
                  }`}
                />
                Wishlist
              </button>
            </div>

            {/* Delivery information */}
            <div className="w-full flex flex-col items-center justify-around p-2 gap-2 bg-secondary-bg border border-primary-border rounded text-secondary-text">
              <div className="w-full flex items-center justify-between">
                <span>Delivery</span>
                <span>3–5 business days</span>
              </div>

              <div className="w-full flex items-center justify-between">
                <span>Returns</span>
                <span>Free within 30 days</span>
              </div>

              <div className="w-full flex items-center justify-between">
                <span>Fabric</span>
                <span>80% cotton, 20% polyester</span>
              </div>
            </div>
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

// Main Product component
function Product() {
  const { slug } = useParams();
  const { products, loading, error } = useProduct();

  const product = products.find((item) => item.slug === slug);

  if (loading) {
    return <div className="py-20 text-center">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="py-20 text-center text-red-500">
        {error || "Product not found."}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Product details */}
      <ProductDetails key={slug} product={product} />

      {/* Recommended products */}
      <div className="w-full mt-10 px-5 sm:px-8 md:px-15 lg:px-18">
        <div className="w-full grid gap-5 max-[425px]:py-2">
          <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-primary-text font-extrabold font-syne">
            You may also like
          </h1>

          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 place-items-center">
            {products
              .filter(
                (item) =>
                  item.slug !== product.slug &&
                  item.category === product.category,
              )
              .slice(0, 4)
              .map((item) => (
                <div key={item._id} className="w-full">
                  <ProductCard product={item} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
