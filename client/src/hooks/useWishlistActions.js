import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useWishlist } from "../context/useWishlist";

const useWishlistActions = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { isAuthenticated, loading: authLoading } = useAuth();

    const {
        wishlist,
        addToWishlist,
        removeFromWishlist,
    } = useWishlist();

    // Check whether product is already wishlisted
    const isWishlisted = (productId) => {
        return wishlist.some(
            (item) =>
                item.productId?.toString() === productId?.toString()
        );
    };

    // Add or remove product from wishlist
    const toggleWishlist = async (product, onSuccess) => {
        if (authLoading) return;

        // Redirect guest user to login
        if (!isAuthenticated) {
            navigate("/login", {
                state: {
                    from: location.pathname + location.search,
                    showLogin: true,
                },
            });

            return;
        }

        if (isWishlisted(product._id)) {
            const wishlistItem = wishlist.find(
                (item) =>
                    item.productId?.toString() === product._id?.toString()
            );

            if (wishlistItem) {
                await removeFromWishlist(wishlistItem);
                onSuccess?.("Product removed from wishlist.");
            }
        } else {
            await addToWishlist(product);
            onSuccess?.("Product added to wishlist!");
        }
    };

    return {
        wishlist,
        isWishlisted,
        toggleWishlist,
        authLoading,
    };
};

export default useWishlistActions;
