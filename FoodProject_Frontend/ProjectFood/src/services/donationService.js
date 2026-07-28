import axiosConfig from "../utills/axiosConfig";

const createDonation = async (requestData) => {
  return await axiosConfig.post("/request", requestData);
};

const getDonationHistory = async (userId) => {
  return await axiosConfig.get(`/request/history/${userId}`);
};

export default {
  createDonation,
  getDonationHistory,
};