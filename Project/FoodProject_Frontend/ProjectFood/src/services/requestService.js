import api from "./api";

// Requests (Donation / Need Request)
export const addRequest = (data) => api.post("/requests", data);
export const getRequestById = (id) => api.get(`/requests/${id}`);
export const getAllRequests = () => api.get("/requests");
export const updateRequest = (id, data) => api.put(`/requests/${id}`, data);
export const deleteRequest = (id) => api.delete(`/requests/${id}`);
export const getMyRequests = () => api.get("/requests/my");
export const getActiveRequests = () => api.get("/requests/active");
export const getRequestHistory = () => api.get("/requests/history");
export const submitRequest = (id) => api.put(`/requests/${id}/submit`);
export const cancelRequest = (id) => api.put(`/requests/${id}/cancel`);

export default {
    addRequest,
    getRequestById,
    getAllRequests,
    updateRequest,
    deleteRequest,
    getMyRequests,
    getActiveRequests,
    getRequestHistory,
    submitRequest,
    cancelRequest,
};
