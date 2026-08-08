import api from "./api";

export const getImpactDashboard = async () => {
    const response = await api.get("/dashboard/impact");
    return response.data;
};

export default {
    getImpactDashboard,
};