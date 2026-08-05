import api from "./api";

// Dashboard
export const getDonorDashboard = () => api.get("/dashboard/donor").then(r => r.data);
export const getAdminDashboard = () => api.get("/dashboard/admin").then(r => r.data);
export const getImpactDashboard = () => api.get("/dashboard/impact").then(r => r.data);
export const getMonthlyStatistics = () => api.get("/dashboard/statistics").then(r => r.data);

export default { getDonorDashboard, getAdminDashboard, getImpactDashboard, getMonthlyStatistics };
