import axios from "axios";

const BASE_URL = "https://localhost:7186/api/payment";

export const createOrder = async (paymentData) => {
    const response = await axios.post(
        `${BASE_URL}/create-order`,
        paymentData
    );

    return response.data;
};

export const verifyPayment = async (paymentData) => {
    const response = await axios.post(
        `${BASE_URL}/verify`,
        paymentData
    );

    return response.data;
};

export const getPayment = async (orderId) => {
    const response = await axios.get(
        `${BASE_URL}/${orderId}`
    );

    return response.data;
};

export const donorHistory = async (donorId) => {
    const response = await axios.get(
        `${BASE_URL}/donor/${donorId}`
    );

    return response.data;
};

export const industryHistory = async (industryId) => {
    const response = await axios.get(
        `${BASE_URL}/industry/${industryId}`
    );

    return response.data;
};