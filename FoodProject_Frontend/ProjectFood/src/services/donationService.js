// Kept for backward compatibility with existing Donor/Admin pages -
// forwards to the corrected requestService (/api/requests) under the hood.
import {
  addRequest,
  getRequestById,
  getAllRequests,
  getActiveRequests,
  getMyRequests,
  updateRequest,
  cancelRequest,
} from "./requestService";

const createDonation = async (data) => {
  const res = await addRequest(data);
  return res.data;
};

const getMyDonations = async () => {
  const res = await getMyRequests();
  return res.data;
};

const getDonationById = async (id) => {
  const res = await getRequestById(id);
  return res.data;
};

const getAllDonations = async () => {
  const res = await getAllRequests();
  return res.data;
};

const getActiveDonations = async () => {
  const res = await getActiveRequests();
  return res.data;
};

const updateDonation = async (id, data) => {
  const res = await updateRequest(id, data);
  return res.data;
};

const cancelDonation = async (id) => {
  const res = await cancelRequest(id);
  return res.data;
};

export default {
  createDonation,
  getMyDonations,
  getDonationById,
  getAllRequests: getAllDonations,
  getActiveRequests: getActiveDonations,
  updateDonation,
  cancelDonation,
};
