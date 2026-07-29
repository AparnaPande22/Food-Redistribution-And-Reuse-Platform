import axios from "axios";

const BASE_URL = "http://localhost:8080/food/api"; // Change if your backend URL is different

const createDonation = async (requestData) => {
  const response = await axios.post(`${BASE_URL}/requests`, requestData);
  return response.data;
};

const getMyDonations = async (userId) => {
  const response = await axios.get(`${BASE_URL}/requests/user/${userId}`);
  return response.data;
};

const getDonationById = async (id) => {
  const response = await axios.get(`${BASE_URL}/requests/${id}`);
  return response.data;
};

export default {
  createDonation,
  getMyDonations,
  getDonationById,
};