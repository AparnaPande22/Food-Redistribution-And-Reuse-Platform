import api from "./api";

export const getAssignedDeliveries = async () => {
    const res = await api.get("/deliveries/assigned");
    return res.data;
};

export const startDelivery = async (id) => {
    const res = await api.put(`/deliveries/${id}/start`);
    return res.data;
};

export const completeDelivery = async (id) => {
    const res = await api.put(`/deliveries/${id}/complete`);
    return res.data;
};

export const trackDelivery = async (id) => {
    const res = await api.get(`/deliveries/${id}/track`);
    return res.data;
};

export const createDelivery = async (deliveryData) => {
    const res = await api.post("/deliveries", deliveryData);
    return res.data;
};

export default {
    getAssignedDeliveries,
    startDelivery,
    completeDelivery,
    trackDelivery,
    createDelivery
};
