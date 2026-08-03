import api from "./api";

const createDonation = async (data) => {
  const response = await api.post("/request", data);
  return response.data;
};

const getMyDonations = async (userId) => {
  const response = await api.get(`/request/my/${userId}`);
  return response.data;
};

const getDonationById = async (id) => {
  const response = await api.get(`/request/id/${id}`);
  return response.data;
};

const getAllRequests = async () => {
  const response = await api.get("/request");
  return response.data;
};

const getActiveRequests = async () => {
  const response = await api.get("/request/active");
  return response.data;
};

const updateDonation = async (id, data) => {
  const response = await api.put(`/request/update/${id}`, data);
  return response.data;
};

const cancelDonation = async (id) => {
  const response = await api.put(`/request/cancel/${id}`);
  return response.data;
};

export default {
  createDonation,
  getMyDonations,
  getDonationById,
  getAllRequests,
  getActiveRequests,
  updateDonation,
  cancelDonation,
};
