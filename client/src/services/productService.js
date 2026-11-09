
import api from "./api";

export const getAllProducts = async () => {
 const response = await api.get("/products");

  // console.log("Products API response:", response.data);

  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
