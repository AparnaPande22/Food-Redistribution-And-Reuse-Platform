import api from "./api";

// Matches
export const createMatch = (data) => api.post("/matches", data);
export const getMatchById = (id) => api.get(`/matches/${id}`);
export const getAllMatches = () => api.get("/matches");
export const getPendingMatches = () => api.get("/matches/pending");
export const approveMatch = (id) => api.put(`/matches/${id}/approve`);
export const rejectMatch = (id) => api.put(`/matches/${id}/reject`);
export const assignDeliveryPartner = (id, deliveryPartnerId) =>
    api.put(`/matches/${id}/assign-delivery`, { deliveryPartnerId });

export default {
    createMatch,
    getMatchById,
    getAllMatches,
    getPendingMatches,
    approveMatch,
    rejectMatch,
    assignDeliveryPartner,
};
