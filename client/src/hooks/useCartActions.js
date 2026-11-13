
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import useCart from "../context/useCart";

const useCartActions = () => {
  const navigate = useNavigate();

  const { isAuthenticated, loading: authLoading } = useAuth();

  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // Add product to cart
  const handleAddToCart = async (product, size, color, quantity = 1) => {
    if (authLoading) return;

    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: `/product/${product.slug}`,
          showLogin: true,
        },
      });

      return;
    }

    await addToCart({
      product,
      size,
      color,
      quantity,
    });
  };

  // Increase quantity
  const handleIncrease = async (item) => {
    if (authLoading || !isAuthenticated) return;

    await increaseQuantity(item);
  };

  // Decrease quantity
  const handleDecrease = async (item) => {
    if (authLoading || !isAuthenticated) return;

    await decreaseQuantity(item);
  };

  // Remove product
  const handleRemove = async (item) => {
    if (authLoading || !isAuthenticated) return;

    await removeFromCart(item);
  };

  return {
    cart,
    handleAddToCart,
    handleIncrease,
    handleDecrease,
    handleRemove,
    authLoading,
  };
};

export default useCartActions;
