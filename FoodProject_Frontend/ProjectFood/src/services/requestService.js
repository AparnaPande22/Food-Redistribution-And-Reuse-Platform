import api from "./api";

// Requests (Donation / Need Request)

export const addRequest = (data) =>
    api.post("/requests", data);

export const getRequestById = (id) =>
    api.get(`/requests/id/${id}`);

export const getAllRequests = () =>
    api.get("/requests");

export const updateRequest = (id, data) =>
    api.put(`/requests/update/${id}`, data);

export const deleteRequest = (id) =>
    api.delete(`/requests/${id}`);

export const getMyRequests = (userId) =>
    api.get(`/requests/my/${userId}`);

export const getActiveRequests = () =>
    api.get("/requests/active");

export const getRequestHistory = (userId) =>
    api.get(`/requests/history/${userId}`);

export const submitRequest = (id) =>
    api.put(`/requests/submit/${id}`);

export const cancelRequest = (id) =>
    api.put(`/requests/cancel/${id}`);

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