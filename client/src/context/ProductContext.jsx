import { useState, useEffect } from "react";
import { ProductContext } from "./ProductContext";
import { getAllProducts, getAllCategories } from "../services/productService";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [error, setError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllProducts();
      setProducts(response.products || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      setCategoriesError("");

      const response = await getAllCategories();
      setCategories(response.categories || []);
    } catch (error) {
      setCategoriesError(
        error.response?.data?.message || "Failed to fetch categories.",
      );
    } finally {
      setCategoriesLoading(false);
    }
  };

  // Fetch products and categories on mount
  // Fetch products and categories on mount
  useEffect(() => {
    let isMounted = true;

    const initializeData = async () => {
      const [productsResult, categoriesResult] = await Promise.allSettled([
        getAllProducts(),
        getAllCategories(),
      ]);

      if (!isMounted) return;

      if (productsResult.status === "fulfilled") {
        setProducts(productsResult.value.products || []);
      } else {
        setError(
          productsResult.reason.response?.data?.message ||
            "Failed to fetch products.",
        );
      }

      if (categoriesResult.status === "fulfilled") {
        setCategories(categoriesResult.value.categories || []);
      } else {
        setCategoriesError(
          categoriesResult.reason.response?.data?.message ||
            "Failed to fetch categories.",
        );
      }

      setLoading(false);
      setCategoriesLoading(false);
    };

    initializeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = {
    products,
    categories,
    loading,
    categoriesLoading,
    error,
    categoriesError,
    refreshProducts: fetchProducts,
    refreshCategories: fetchCategories,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
