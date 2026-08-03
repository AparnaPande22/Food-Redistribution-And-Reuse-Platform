import axios from "axios";

const BASE_URL = "http://localhost:7186/api/payment";

const paymentApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

paymentApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const createOrder = async (paymentData) => {
    const response = await paymentApi.post(
        "/create-order",
        paymentData
    );
    return response.data;
};

export const verifyPayment = async (paymentData) => {
    const response = await paymentApi.post(
        "/verify",
        paymentData
    );
    return response.data;
};

export const getPayment = async (orderId) => {
    const response = await paymentApi.get(
        `/${orderId}`
    );
    return response.data;
};

export const donorHistory = async (donorId) => {
    const response = await paymentApi.get(
        `/donor/${donorId}`
    );
    return response.data;
};

export const industryHistory = async (industryId) => {
    const response = await paymentApi.get(
        `/industry/${industryId}`
    );
    return response.data;
};

export default {
    createOrder,
    verifyPayment,
    getPayment,
    donorHistory,
    industryHistory
};