import api from "./api";

// RequestItems (line items belonging to a Request)
// BUGFIX: backend controller is @RequestMapping("/api/request-item")
// (singular), but these calls previously hit "/request-items" (plural),
// which doesn't exist on the backend -> every food-item save/read/update
// silently 404'd, which is why Donation Details always showed "No food
// items available for this donation."
export const addRequestItem = (data) => api.post("/request-item", data);
export const getRequestItemById = (id) => api.get(`/request-item/${id}`);
export const getRequestItemsByRequest = (requestId) =>
    api.get(`/request-item/request/${requestId}`);
export const updateRequestItem = (id, data) => api.put(`/request-item/${id}`, data);
export const deleteRequestItem = (id) => api.delete(`/request-item/${id}`);

export default {
    addRequestItem,
    getRequestItemById,
    getRequestItemsByRequest,
    updateRequestItem,
    deleteRequestItem,
};
