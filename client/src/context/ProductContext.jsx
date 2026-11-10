import { useState, useEffect } from "react";
import { ProductContext } from "./ProductContext";
import { getAllProducts } from "../services/productService";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch all products
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

  // fetch products when provider mounts
  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setProducts(response.products || []);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Failed to fetch products.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const value = {
    products,
    loading,
    error,
    refreshProducts: fetchProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
