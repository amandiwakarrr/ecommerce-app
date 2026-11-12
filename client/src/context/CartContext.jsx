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
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("urbanwear_guest_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading guest cart:", error);
      return [];
    }
  });
  const [cartSource, setCartSource] = useState("loading");

  // Load cart from MongoDB
  // const loadCart = async () => {
  //   try {
  //     const data = await getCart();
  //     setCart(data.cart.items);
  //     setCartSource("server");
  //   } catch (error) {
  //     console.error("Error loading cart:", error);
  //   }
  // };

  useEffect(() => {
    if (authLoading) return;

    let isMounted = true;

    const initializeCart = async () => {
      if (isAuthenticated) {
        try {
          const data = await getCart();

          if (!isMounted) return;

          setCart(data.cart.items);
          setCartSource("server");
        } catch (error) {
          if (isMounted) {
            console.error("Error loading cart:", error);
          }
        }
      } else {
        try {
          const savedCart = localStorage.getItem("urbanwear_guest_cart");
          const guestCart = savedCart ? JSON.parse(savedCart) : [];

          if (!isMounted) return;

          setCart(guestCart);
          setCartSource("guest");
        } catch (error) {
          if (!isMounted) return;

          console.error("Error loading guest cart:", error);
          setCart([]);
          setCartSource("guest");
        }
      }
    };

    initializeCart();

    return () => {
      isMounted = false;
    };
  }, [authLoading, isAuthenticated]);

  useEffect(() => {
    if (authLoading || isAuthenticated || cartSource !== "guest") {
      return;
    }

    try {
      localStorage.setItem("urbanwear_guest_cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving guest cart:", error);
    }
  }, [cart, cartSource, authLoading, isAuthenticated]);

  // Add to cart
  const addToCart = async (productData) => {
    const { product, size, color, quantity } = productData;

    // Logged-in user: save cart item in MongoDB
    if (isAuthenticated) {
      try {
        const response = await addCartItem({
          productId: product._id,
          size,
          color,
          quantity,
        });

        setCart(response.cart.items);
        setCartSource("server");
      } catch (error) {
        console.error(
          "Error adding product to cart:",
          error.response?.data?.message || error.message,
        );
        throw error;
      }

      return;
    }

    // Guest user: save cart item in localStorage
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.productId === product._id &&
          item.size === size &&
          item.color === color,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === product._id &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          productId: product._id,
          size,
          color,
          quantity,
        },
      ];
    });
  };

  // Increase quantity
  const increaseQuantity = async (item) => {
    if (isAuthenticated) {
      try {
        const response = await updateCartItem(item._id, item.quantity + 1);

        setCart(response.cart.items);
      } catch (error) {
        console.error("Error increasing quantity:", error);
        throw error;
      }
      return;
    }

    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.productId === item.productId &&
        cartItem.size === item.size &&
        cartItem.color === item.color
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      ),
    );
  };

  // Decrease quantity
  const decreaseQuantity = async (item) => {
    if (item.quantity <= 1) {
      return removeFromCart(item);
    }

    if (isAuthenticated) {
      try {
        const response = await updateCartItem(item._id, item.quantity - 1);

        setCart(response.cart.items);
      } catch (error) {
        console.error("Error decreasing quantity:", error);
        throw error;
      }
      return;
    }

    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.productId === item.productId &&
        cartItem.size === item.size &&
        cartItem.color === item.color
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem,
      ),
    );
  };

  // Remove product
  const removeFromCart = async (item) => {
    if (isAuthenticated) {
      try {
        const response = await removeCartItem(item._id);
        setCart(response.cart.items);
      } catch (error) {
        console.error("Error removing cart item:", error);
        throw error;
      }
      return;
    }

    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) =>
          !(
            cartItem.productId === item.productId &&
            cartItem.size === item.size &&
            cartItem.color === item.color
          ),
      ),
    );
  };

  // Cart count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

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
