import api from "./api";

// Match controller base path is /api/match.
export const createMatch = (data) => api.post("/match", data);
export const getMatchById = (id) => api.get(`/match/${id}`);
export const getAllMatches = () => api.get("/match");
export const getPendingMatches = () => api.get("/match/pending");
export const getMatchesByDonation = (donationRequestId) =>
    api.get(`/match/donation/${donationRequestId}`);
export const approveMatch = (id) => api.put(`/match/${id}/approve`);
export const rejectMatch = (id) => api.put(`/match/${id}/reject`);
export const assignDeliveryPartner = (id, deliveryPartnerId) =>
    api.put(`/match/${id}/assign-delivery`, { deliveryPartnerId });

export default {
    createMatch,
    getMatchById,
    getAllMatches,
    getPendingMatches,
    getMatchesByDonation,
    approveMatch,
    rejectMatch,
    assignDeliveryPartner,
};
