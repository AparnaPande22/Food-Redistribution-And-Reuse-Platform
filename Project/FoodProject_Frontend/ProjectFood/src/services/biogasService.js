import api from "./api";

// Biogas / Industry partner
export const getDashboard = () => api.get("/biogas/dashboard");
export const getPendingRequests = () => api.get("/biogas/requests/pending");
export const getRequestHistory = () => api.get("/biogas/requests/history");
export const getRequestById = (id) => api.get(`/biogas/requests/${id}`);
export const acceptRequest = (id) => api.put(`/biogas/requests/${id}/accept`);
export const rejectRequest = (id) => api.put(`/biogas/requests/${id}/reject`);
export const markProcessing = (id) => api.put(`/biogas/requests/${id}/processing`);
export const completeRequest = (id) => api.put(`/biogas/requests/${id}/complete`);
export const getProfile = () => api.get("/biogas/profile");
export const updateProfile = (data) => api.put("/biogas/profile", data);
export const changePassword = (data) => api.put("/biogas/change-password", data);
export const getStatistics = () => api.get("/biogas/statistics");
export const getNotifications = () => api.get("/biogas/notifications");
export const markNotificationRead = (id) => api.put(`/biogas/notifications/${id}/read`);

// Optional APIs
export const getTodayPickups = () => api.get("/biogas/pickups/today");
export const getUpcomingPickups = () => api.get("/biogas/pickups/upcoming");
export const getMonthlyReport = () => api.get("/biogas/reports/monthly");
export const getYearlyReport = () => api.get("/biogas/reports/yearly");
export const getEnvironmentalImpact = () => api.get("/biogas/environmental-impact");

export default {
    getDashboard,
    getPendingRequests,
    getRequestHistory,
    getRequestById,
    acceptRequest,
    rejectRequest,
    markProcessing,
    completeRequest,
    getProfile,
    updateProfile,
    changePassword,
    getStatistics,
    getNotifications,
    markNotificationRead,
    getTodayPickups,
    getUpcomingPickups,
    getMonthlyReport,
    getYearlyReport,
    getEnvironmentalImpact,
};
