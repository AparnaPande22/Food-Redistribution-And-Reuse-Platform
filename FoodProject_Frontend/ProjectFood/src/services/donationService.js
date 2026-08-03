import api from "./api";

const createDonation = async (data) => {
  const response = await api.post("/request", data);
  return response.data;
};

const getMyDonations = async (userId) => {
  const response = await api.get(`/request/history/${userId}`);
  return response.data;
};

const getDonationById = async (id) => {
  const response = await api.get(`/request/id/${id}`);
  return response.data;
};

export default {
  createDonation,
  getMyDonations,
  getDonationById,
};