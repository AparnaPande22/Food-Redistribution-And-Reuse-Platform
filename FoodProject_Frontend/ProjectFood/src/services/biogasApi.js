import api from "./api";

export const getPendingRequests = (partnerId) =>
    partnerId ? api.get(`/waste/assigned/${partnerId}`) : api.get("/waste/waste_queue");

export const processWaste = (requestId, data) =>
    api.put(`/waste/process/${requestId}`, data);

export const getWasteHistory = () =>
    api.get("/waste/history");