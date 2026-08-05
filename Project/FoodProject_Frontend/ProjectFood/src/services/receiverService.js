// Kept for backward compatibility with ReceiverDashboard.jsx -
// forwards to the corrected requestService/matchService/deliveryService.
import { addRequest, getActiveRequests as getActive, getMyRequests as getMine, cancelRequest as cancelReq } from "./requestService";
import { createMatch as createMatchReq } from "./matchService";
import { trackDelivery as trackDeliveryReq } from "./deliveryService";

export const getActiveRequests = async () => {
  const res = await getActive();
  return res.data;
};

export const createFoodRequest = async (requestData) => {
  const res = await addRequest(requestData);
  return res.data;
};

export const getMyRequests = async () => {
  const res = await getMine();
  return res.data;
};

export const getRequestHistory = async () => {
  const res = await getMine();
  return res.data;
};

// requestId is the request being claimed; receiverId comes from the JWT
// on the backend, but is still accepted here for compatibility.
export const createMatch = async (requestId) => {
  const res = await createMatchReq({ requestId });
  return res.data;
};

export const trackDelivery = async (deliveryId) => {
  const res = await trackDeliveryReq(deliveryId);
  return res.data;
};

export const cancelRequest = async (requestId) => {
  const res = await cancelReq(requestId);
  return res.data;
};

export default {
  getActiveRequests,
  createFoodRequest,
  getMyRequests,
  getRequestHistory,
  createMatch,
  trackDelivery,
  cancelRequest,
};
