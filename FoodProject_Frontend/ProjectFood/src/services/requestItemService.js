import api from "./api";

// RequestItems (line items belonging to a Request)
export const addRequestItem = (data) => api.post("/request-items", data);
export const getRequestItemById = (id) => api.get(`/request-items/${id}`);
export const getRequestItemsByRequest = (requestId) =>
    api.get(`/request-items/request/${requestId}`);
export const updateRequestItem = (id, data) => api.put(`/request-items/${id}`, data);
export const deleteRequestItem = (id) => api.delete(`/request-items/${id}`);

export default {
    addRequestItem,
    getRequestItemById,
    getRequestItemsByRequest,
    updateRequestItem,
    deleteRequestItem,
};
