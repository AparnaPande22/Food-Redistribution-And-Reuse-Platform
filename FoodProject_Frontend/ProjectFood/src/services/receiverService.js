import api from "./api";

export const getActiveRequests = async () => {
    const res = await api.get("/request/active");
    return res.data;
};

export const createFoodRequest = async (requestData) => {
    const res = await api.post("/request", requestData);
    return res.data;
};

export const getMyRequests = async (userId) => {
    const res = await api.get(`/request/my/${userId}`);
    return res.data;
};

export const getRequestHistory = async (userId) => {
    const res = await api.get(`/request/history/${userId}`);
    return res.data;
};

export const createMatch = async (requestId, receiverId) => {
    const res = await api.post("/match", { requestId, receiverId });
    return res.data;
};

export const trackDelivery = async (deliveryId) => {
    const res = await api.get(`/deliveries/${deliveryId}/track`);
    return res.data;
};

export const cancelRequest = async (requestId) => {
    const res = await api.put(`/request/cancel/${requestId}`);
    return res.data;
};

export default {
    getActiveRequests,
    createFoodRequest,
    getMyRequests,
    getRequestHistory,
    createMatch,
    trackDelivery,
    cancelRequest
};
