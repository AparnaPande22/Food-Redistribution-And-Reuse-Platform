import api from "./api";

// Matches
// BUGFIX: backend controller is @RequestMapping("/api/match") (singular),
// but these calls previously hit "/matches" (plural) which does not exist
// on the backend -> every Admin "approve / reject / assign delivery"
// action on the Matching Queue page was silently failing (404).
export const createMatch = (data) => api.post("/match", data);
export const getMatchById = (id) => api.get(`/match/${id}`);
export const getAllMatches = () => api.get("/match");
export const getPendingMatches = () => api.get("/match/pending");
export const approveMatch = (id) => api.put(`/match/${id}/approve`);
export const rejectMatch = (id) => api.put(`/match/${id}/reject`);
export const assignDeliveryPartner = (id, deliveryPartnerId) =>
    api.put(`/match/${id}/assign-delivery`, { deliveryPartnerId });

// Matches belonging to a specific donor OR receiver user - lets the
// Donor Dashboard show "which receiver wants this food" and lets the
// Receiver Dashboard show live match status for their own requests.
export const getMatchesForUser = (userId) =>
    api.get(`/match/user/${userId}`);

export default {
    createMatch,
    getMatchById,
    getAllMatches,
    getPendingMatches,
    approveMatch,
    rejectMatch,
    assignDeliveryPartner,
    getMatchesForUser,
};
