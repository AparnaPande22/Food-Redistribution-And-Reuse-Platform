
import api from "./api";

/*
 * Receiver Service
 *
 * Backend base URL:
 * http://localhost:8080/food/api
 *
 * Backend RequestController:
 * /api/request
 */

// ======================================================
// REQUEST APIs
// ======================================================

/**
 * Create receiver food request
 *
 * Backend:
 * POST /api/request
 */
export const createFoodRequest = async (requestData) => {
  const response = await api.post("/request", requestData);
  return response.data;
};


/**
 * Get all active food requests
 *
 * Backend:
 * GET /api/request/active
 */
export const getActiveRequests = async () => {
  const response = await api.get("/request/active");
  return response.data;
};


/**
 * Get receiver's own requests
 *
 * Backend:
 * GET /api/request/my/{userId}
 */
export const getMyRequests = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const response = await api.get(`/request/my/${userId}`);
  return response.data;
};


/**
 * Get receiver request history
 *
 * Backend:
 * GET /api/request/history/{userId}
 */
export const getRequestHistory = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const response = await api.get(`/request/history/${userId}`);
  return response.data;
};


/**
 * Get request by ID
 *
 * Backend:
 * GET /api/request/id/{id}
 */
export const getRequestById = async (requestId) => {
  const response = await api.get(`/request/id/${requestId}`);
  return response.data;
};


/**
 * Submit receiver request
 *
 * Backend:
 * PUT /api/request/submit/{id}
 */
export const submitRequest = async (requestId) => {
  const response = await api.put(
    `/request/submit/${requestId}`
  );

  return response.data;
};


/**
 * Cancel receiver request
 *
 * Backend:
 * PUT /api/request/cancel/{id}
 */
export const cancelRequest = async (requestId) => {
  const response = await api.put(
    `/request/cancel/${requestId}`
  );

  return response.data;
};


/**
 * Update receiver request
 *
 * Backend:
 * PUT /api/request/update/{id}
 */
export const updateRequest = async (requestId, data) => {
  const response = await api.put(
    `/request/update/${requestId}`,
    data
  );

  return response.data;
};


/**
 * Delete receiver request
 *
 * Backend:
 * DELETE /api/request/{id}
 */
export const deleteRequest = async (requestId) => {
  const response = await api.delete(
    `/request/${requestId}`
  );

  return response.data;
};


// ======================================================
// MATCH APIs
// ======================================================

/**
 * Create a match between donation request and receiver request.
 *
 * Backend MatchDTO requires:
 *
 * {
 *   donationRequestId,
 *   receiverRequestId,
 *   matchedBy
 * }
 */
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

/**
 * Track delivery
 *
 * Backend:
 * GET /api/deliveries/{id}/track
 */
export const trackDelivery = async (deliveryId) => {
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

