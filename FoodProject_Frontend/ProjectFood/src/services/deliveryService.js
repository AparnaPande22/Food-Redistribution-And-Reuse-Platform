import api from "./api";

// Deliveries
export const createDelivery = (data) => api.post("/deliveries", data);
export const getDeliveryById = (id) => api.get(`/deliveries/${id}`);
export const getAssignedDeliveries = () => api.get("/deliveries/assigned");
export const startDelivery = (id) => api.put(`/deliveries/${id}/start`);
export const completeDelivery = (id) => api.put(`/deliveries/${id}/complete`);
export const trackDelivery = (id) => api.get(`/deliveries/${id}/track`);

export default {
    createDelivery,
    getDeliveryById,
    getAssignedDeliveries,
    startDelivery,
    completeDelivery,
    trackDelivery,
};
