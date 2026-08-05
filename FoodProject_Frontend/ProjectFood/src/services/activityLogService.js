import api from "./api";

// ActivityLogs
export const getAllLogs = () => api.get("/activity-logs");
export const getLogById = (id) => api.get(`/activity-logs/${id}`);
export const getUserActivity = (userId) => api.get(`/activity-logs/user/${userId}`);

export default {
    getAllLogs,
    getLogById,
    getUserActivity,
};
