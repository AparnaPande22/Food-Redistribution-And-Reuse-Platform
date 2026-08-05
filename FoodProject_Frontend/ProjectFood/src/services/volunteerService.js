// Kept for backward compatibility with VolunteerDashboard.jsx -
// forwards to the corrected deliveryService (/api/deliveries).
import {
  getAssignedDeliveries as getAssigned,
  startDelivery as start,
  completeDelivery as complete,
  trackDelivery as track,
  createDelivery as create,
} from "./deliveryService";

export const getAssignedDeliveries = async () => {
  const res = await getAssigned();
  return res.data;
};

export const startDelivery = async (id) => {
  const res = await start(id);
  return res.data;
};

export const completeDelivery = async (id) => {
  const res = await complete(id);
  return res.data;
};

export const trackDelivery = async (id) => {
  const res = await track(id);
  return res.data;
};

export const createDelivery = async (deliveryData) => {
  const res = await create(deliveryData);
  return res.data;
};

export default {
  getAssignedDeliveries,
  startDelivery,
  completeDelivery,
  trackDelivery,
  createDelivery,
};
