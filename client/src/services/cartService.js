import api from "./api.js";

export const getCart = async () => {
    const response = await api.get("/cart");
    return response.data;
}

export const addToCart = async (productData) => {
    const response = await api.post("/cart/add", productData);
    return response.data;
}

export const updateCartItem = async (itemId, quantity) => {
    const response = await api.patch(`/cart/${itemId}`, {
        quantity,
    });
    return response.data;
}

export const removeCartItem = async (itemId) => {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
}

export const clearCart = async () => {
    const response = await api.delete("/cart");
    return response.data;
}

// export const mergeCart = async (items) => {
//   const response = await api.post("/cart/merge", {
//     items,
//   });

//   return response.data;
// };  