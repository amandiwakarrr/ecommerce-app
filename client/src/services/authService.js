import api from "./api.js";
export const registerUser = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
}
export const resendVerificationEmail = async (email) => {
    const response = await api.post("/auth/resend-verification", {
        email,
    });

    return response.data;
};
export const loginUser = async (userData) => {
    const response = await api.post("/auth/login", userData);
    return response.data;
}
export const getCurrentUser = async () => {
    try {
        const response = await api.get("/auth/me");
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            return { success: false, user: null };
        }

        throw error;
    }
};
export const logoutUser = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
};