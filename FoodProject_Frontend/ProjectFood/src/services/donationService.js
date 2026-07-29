import axios from "axios";

const BASE_URL = "http://localhost:8080/food/api/request";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const createDonation = async (data) => {
  const response = await axios.post(BASE_URL, data, authHeader());
  return response.data;
};

const getMyDonations = async (userId) => {
  const response = await axios.get(
    `${BASE_URL}/history/${userId}`,
    authHeader()
  );
  return response.data;
};

const getDonationById = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/id/${id}`,
    authHeader()
  );
  return response.data;
};

export default {
  createDonation,
  getMyDonations,
  getDonationById,
};