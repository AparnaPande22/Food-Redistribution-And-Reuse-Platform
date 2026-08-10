import api from "./api";

// Waste / Biogas-partner (Industry) flow.
//
// BUGFIX: the entire Industry dashboard was built against
// `biogasService.js`, which calls `/api/biogas/**` - an API that does
// not exist anywhere on the backend. The backend's real waste pipeline
// lives at `/api/waste/**` (WasteController / WasteService) and works
// directly off the same `Request` entity that donors create (flipped to
// MARKED_FOR_WASTE instead of ACTIVE - see CreateDonation.jsx's "Is this
// food still edible?" toggle). This service talks to the real endpoints.

// All donations currently sitting in the waste queue (MARKED_FOR_WASTE),
// i.e. non-edible food donated by a Donor, waiting for a Biogas partner.
export const getWasteQueue = () => api.get("/waste/waste_queue");

// Claim a waste pickup for the current partner.
export const assignWastePartner = (requestId, wastePartnerId, remarks) =>
    api.put("/waste/assign-partner", { requestId, wastePartnerId, remarks });

// Everything currently assigned to a given partner (WASTE_ASSIGNED).
export const getAssignedWaste = (partnerId) =>
    api.get(`/waste/assigned/${partnerId}`);

// Record the outcome of processing (biogas / fertilizer generated).
export const processWaste = (requestId, data) =>
    api.put(`/waste/process/${requestId}`, data);

// Give a pickup back to the queue.
export const unassignWastePartner = (requestId) =>
    api.put(`/waste/unassigned/${requestId}`);

// Everything ever fully processed (WASTE_PROCESSED) - used for history /
// monthly-style aggregates since there's no dedicated stats endpoint.
export const getWasteHistory = () => api.get("/waste/history");

// Decline a pickup - backend expects a raw JSON string body.
export const rejectWastePickup = (requestId, remark) =>
    api.put(`/waste/reject/${requestId}`, JSON.stringify(remark || ""));

export const getProcessedWaste = () => api.get("/waste/processed");
export const getProcessedWasteById = (id) => api.get(`/waste/processed/${id}`);

export default {
    getWasteQueue,
    assignWastePartner,
    getAssignedWaste,
    processWaste,
    unassignWastePartner,
    getWasteHistory,
    rejectWastePickup,
    getProcessedWaste,
    getProcessedWasteById,
};
