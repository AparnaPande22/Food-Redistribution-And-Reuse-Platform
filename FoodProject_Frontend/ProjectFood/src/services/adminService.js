import api from "./api";

export const getAnalytics = async () => {
    const res = await api.get("/admin/analytics");
    return res.data;
};

export const getAdminDashboard = async () => {
    const res = await api.get("/dashboard/admin");
    return res.data;
};

export const getPendingUsers = async () => {
    const res = await api.get("/admin/pending-users");
    return res.data;
};

export const approveUser = async (id) => {
    const res = await api.put(`/admin/users/${id}/approve`);
    return res.data;
};

export const rejectUser = async (id) => {
    const res = await api.put(`/admin/users/${id}/reject`);
    return res.data;
};

export const getAllUsers = async () => {
    const res = await api.get("/users");
    return res.data;
};

export const deleteUser = async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
};

export const getPendingRequests = async () => {
    const res = await api.get("/admin/pending-requests");
    return res.data;
};

export const approveRequest = async (id) => {
    const res = await api.put(`/admin/requests/${id}/approve`);
    return res.data;
};

export const rejectRequest = async (id) => {
    const res = await api.put(`/admin/requests/${id}/reject`);
    return res.data;
};

export const getMatchingQueue = async () => {
    const res = await api.get("/admin/matching-queue");
    return res.data;
};