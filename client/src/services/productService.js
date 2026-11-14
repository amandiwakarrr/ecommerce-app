import api from "./api.js";

export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductBySlug = async (slug) => {
  const response = await api.get(`/products/${slug}`);
  return response.data;
};

export const getAllCategories = async () => {
  const response = await api.get("/products/categories");
  return response.data;
};