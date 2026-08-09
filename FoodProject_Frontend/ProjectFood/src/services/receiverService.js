
import api from "./api";

// ======================================================
// REQUEST APIs
// Backend base URL:
// http://localhost:8080/food/api
//
// Backend Controller:
// @RequestMapping("/api/requests")
// ======================================================

// ------------------------------------------------------
// CREATE RECEIVER FOOD REQUEST
// POST /api/requests
// ------------------------------------------------------
export const createFoodRequest = async (requestData) => {
  const response = await api.post("/requests", requestData);
  return response.data;
};

// ------------------------------------------------------
// GET ALL ACTIVE FOOD REQUESTS
// GET /api/requests/active
// ------------------------------------------------------
export const getActiveRequests = async () => {
  const response = await api.get("/requests/active");
  return response.data;
};

// ------------------------------------------------------
// GET RECEIVER'S OWN REQUESTS
// GET /api/requests/my/{userId}
// ------------------------------------------------------
export const getMyRequests = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const response = await api.get(`/requests/my/${userId}`);
  return response.data;
};

// ------------------------------------------------------
// GET REQUEST HISTORY
// GET /api/requests/history/{userId}
// ------------------------------------------------------
export const getRequestHistory = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const response = await api.get(`/requests/history/${userId}`);
  return response.data;
};

// ------------------------------------------------------
// GET REQUEST BY ID
// GET /api/requests/id/{id}
// ------------------------------------------------------
export const getRequestById = async (requestId) => {
  if (!requestId) {
    throw new Error("Request ID is required");
  }

  const response = await api.get(`/requests/id/${requestId}`);
  return response.data;
};

// ------------------------------------------------------
// SUBMIT REQUEST
// PUT /api/requests/submit/{id}
// ------------------------------------------------------
export const submitRequest = async (requestId) => {
  if (!requestId) {
    throw new Error("Request ID is required");
  }

  const response = await api.put(
    `/requests/submit/${requestId}`
  );

  return response.data;
};

// ------------------------------------------------------
// CANCEL REQUEST
// PUT /api/requests/cancel/{id}
// ------------------------------------------------------
export const cancelRequest = async (requestId) => {
  if (!requestId) {
    throw new Error("Request ID is required");
  }

  const response = await api.put(
    `/requests/cancel/${requestId}`
  );

  return response.data;
};

// ------------------------------------------------------
// UPDATE REQUEST
// PUT /api/requests/update/{id}
// ------------------------------------------------------
export const updateRequest = async (requestId, data) => {
  if (!requestId) {
    throw new Error("Request ID is required");
  }

  const response = await api.put(
    `/requests/update/${requestId}`,
    data
  );

  return response.data;
};

// ------------------------------------------------------
// DELETE REQUEST
// DELETE /api/requests/{id}
// ------------------------------------------------------
export const deleteRequest = async (requestId) => {
  if (!requestId) {
    throw new Error("Request ID is required");
  }

  const response = await api.delete(
    `/requests/${requestId}`
  );

  return response.data;
};

// ======================================================
// MATCH APIs
// ======================================================

// ------------------------------------------------------
// CREATE MATCH
// POST /api/match
// ------------------------------------------------------
export const createMatch = async (
  donationRequestId,
  receiverRequestId,
  matchedBy
) => {
  if (!donationRequestId) {
    throw new Error("Donation Request ID is required");
  }

  if (!receiverRequestId) {
    throw new Error("Receiver Request ID is required");
  }

  if (!matchedBy) {
    throw new Error("Matched By user ID is required");
  }

  const payload = {
    donationRequestId: Number(donationRequestId),
    receiverRequestId: Number(receiverRequestId),
    matchedBy: Number(matchedBy)
  };

  const response = await api.post(
    "/match",
    payload
  );

  return response.data;
};

// ======================================================
// DELIVERY APIs
// ======================================================

// ------------------------------------------------------
// TRACK DELIVERY
// GET /api/deliveries/{id}/track
// ------------------------------------------------------
export const trackDelivery = async (deliveryId) => {
  if (!deliveryId) {
    throw new Error("Delivery ID is required");
  }

  const response = await api.get(
    `/deliveries/${deliveryId}/track`
  );

  return response.data;
};

// ======================================================
// DEFAULT EXPORT
// ======================================================

const receiverService = {
  createFoodRequest,
  getActiveRequests,
  getMyRequests,
  getRequestHistory,
  getRequestById,
  submitRequest,
  cancelRequest,
  updateRequest,
  deleteRequest,
  createMatch,
  trackDelivery
};

export default receiverService;
