import {useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { WishlistContext } from "./WishlistContext.js";
import {
  getWishlist,
  addToWishlist as addWishlistItem,
  removeWishlistItem,
} from "../services/wishlistService";

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from MongoDB when authenticated
  useEffect(() => {
    if (authLoading) return;

    let isMounted = true;

    const initializeWishlist = async () => {
      if (!isAuthenticated) {
        setWishlist([]);
        return;
      }

      try {
        const data = await getWishlist();

        if (!isMounted) return;

        setWishlist(data?.wishlist?.items || []);
      } catch (error) {
        if (isMounted) {
          console.error("Error loading wishlist:", error);
          setWishlist([]);
        }
      }
    };

    initializeWishlist();

    return () => {
      isMounted = false;
    };
  }, [authLoading, isAuthenticated]);

  // Add product to wishlist
  const addToWishlist = async (product) => {
    if (!isAuthenticated) {
      throw new Error("Please login to add products to your wishlist.");
    }

    try {
      const response = await addWishlistItem(product._id);
      setWishlist(response?.wishlist?.items || []);
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      throw error;
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (item) => {
    if (!isAuthenticated) {
      throw new Error("Please login first.");
    }

    try {
      const response = await removeWishlistItem(item._id);
      setWishlist(response?.wishlist?.items || []);
    } catch (error) {
      console.error("Error removing wishlist item:", error);
      throw error;
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
