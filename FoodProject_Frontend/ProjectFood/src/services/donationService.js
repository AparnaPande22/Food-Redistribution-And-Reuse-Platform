import axiosConfig from "../utills/axiosConfig";

const createDonation = async (requestData) => {
    return await axiosConfig.post("/request", requestData);
};

export default {
    createDonation,
};