import { useState, useEffect } from "react";
import { ProductContext } from "./ProductContext";
import {
  getAllProducts,
  getAllCategories,
  getProductBrands,
} from "../services/productService";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [brandsLoading, setBrandsLoading] = useState(true);

  const [error, setError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");
  const [brandsError, setBrandsError] = useState("");

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

  // Fetch all brands
  const fetchBrands = async () => {
    try {
      setBrandsLoading(true);
      setBrandsError("");

      const response = await getProductBrands();
      setBrands(response.brands || []);
    } catch (error) {
      setBrandsError(
        error.response?.data?.message || "Failed to fetch brands.",
      );
    } finally {
      setBrandsLoading(false);
    }
  };

  // Fetch products, categories and brands on mount
  useEffect(() => {
    let isMounted = true;

    const initializeData = async () => {
      const [productsResult, categoriesResult, brandsResult] =
        await Promise.allSettled([
          getAllProducts(),
          getAllCategories(),
          getProductBrands(),
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

      if (brandsResult.status === "fulfilled") {
        setBrands(brandsResult.value.brands || []);
      } else {
        setBrandsError(
          brandsResult.reason.response?.data?.message ||
            "Failed to fetch brands.",
        );
      }

      setLoading(false);
      setCategoriesLoading(false);
      setBrandsLoading(false);
    };

    initializeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = {
    products,
    categories,
    brands,
    loading,
    categoriesLoading,
    brandsLoading,
    error,
    categoriesError,
    brandsError,
    refreshProducts: fetchProducts,
    refreshCategories: fetchCategories,
    refreshBrands: fetchBrands,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
