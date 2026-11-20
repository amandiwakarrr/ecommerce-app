import api from "./api.js";

// Create Razorpay Order
export const createRazorpayOrder = async (orderId) => {
  const response = await api.post("/payments/create-order", {
    orderId,
  });

  return response.data;
};

// Verify Razorpay Payment
export const verifyRazorpayPayment = async (paymentData) => {
  const response = await api.post(
    "/payments/verify-payment",
    paymentData
  );

  return response.data;
};


// QR
export const createUpiQrCode = async (orderId) => {
    const response = await api.post("/payments/create-qr", {
        orderId,
    });

    return response.data;
};

export const verifyUpiQrPayment = async (orderId) => {
    const response = await api.post("/payments/verify-qr", {
        orderId,
    });

    return response.data;
};