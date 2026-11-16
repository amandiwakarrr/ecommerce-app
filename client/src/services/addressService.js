import api from "./api.js";

// Add address
export const addAddress = async (data) => {
    const response = await api.post("/addresses", data);
    return response.data;
}

// get all  addresses
export const getAddresses = async () => {
    const response = await api.get("/addresses");
    return response.data;
}

// get Address by id
export const getAddressById = async (addressId) => {
    const response = await api.get(`/addresses/${addressId}`);
    return response.data;
}

// update address
export const updateAddress = async (addressId, data) => {
    const response = await api.put(`/addresses/${addressId}`, data);
    return response.data;
}

// remove address
export const removeAddress = async (addressId) => {
    const response = await api.delete(`/addresses/${addressId}`);
    return response.data;
}

// set default address
export const setDefaultAddress = async (addressId) => {
    const response = await api.patch(`/addresses/${addressId}/default`);
    return response.data;
}
