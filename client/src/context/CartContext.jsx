
import { useState, useEffect } from "react";
import { CartContext } from "./CartContext.js";
import { useAuth } from "./useAuth";
import {
  getCart,
  addToCart as addCartItem,
  updateCartItem,
  removeCartItem,
} from "../services/cartService.js";

export const CartProvider = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [cart, setCart] = useState([]);

  // Load cart from MongoDB when user is authenticated
  useEffect(() => {
    if (authLoading) return;

    let isMounted = true;

    const initializeCart = async () => {
      if (!isAuthenticated) {
        setCart([]);
        return;
      }

      try {
        const data = await getCart();

        if (!isMounted) return;

        setCart(data.cart.items);
      } catch (error) {
        if (isMounted) {
          console.error("Error loading cart:", error);
          setCart([]);
        }
      }
    };

    initializeCart();

    return () => {
      isMounted = false;
    };
  }, [authLoading, isAuthenticated]);

  // Add to cart
  const addToCart = async (productData) => {
    if (!isAuthenticated) {
      throw new Error("Please login to add products to your cart.");
    }

    const { product, size, color, quantity } = productData;

    try {
      const response = await addCartItem({
        productId: product._id,
        size,
        color,
        quantity,
      });

      setCart(response.cart.items);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw error;
    }
  };

  // Increase quantity
  const increaseQuantity = async (item) => {
    if (!isAuthenticated) {
      throw new Error("Please login first.");
    }

    try {
      const response = await updateCartItem(item._id, item.quantity + 1);
      setCart(response.cart.items);
    } catch (error) {
      console.error("Error increasing quantity:", error);
      throw error;
    }
  };

  // Decrease quantity
  const decreaseQuantity = async (item) => {
    if (item.quantity <= 1) {
      return removeFromCart(item);
    }

    if (!isAuthenticated) {
      throw new Error("Please login first.");
    }

    try {
      const response = await updateCartItem(item._id, item.quantity - 1);
      setCart(response.cart.items);
    } catch (error) {
      console.error("Error decreasing quantity:", error);
      throw error;
    }
  };

  // Remove product
  const removeFromCart = async (item) => {
    if (!isAuthenticated) {
      throw new Error("Please login first.");
    }

    try {
      const response = await removeCartItem(item._id);
      setCart(response.cart.items);
    } catch (error) {
      console.error("Error removing cart item:", error);
      throw error;
    }
  };

  // Cart count
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // Cart total
  const cartTotal = cart.reduce((total, item) => {
    const product = item.product || item;
    const price = product.discountPrice ?? product.price;

    return total + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
