import api from "./api";

export const getAnalytics = async () => {
    const res = await api.get("/api/admin/analytics");
    return res.data;
};

export const getPendingUsers = async () => {
    const res = await api.get("/api/admin/pending-users");
    return res.data;
};

export const approveUser = async (id) => {
    const res = await api.put(`/api/admin/users/${id}/approve`);
    return res.data;
};

export const rejectUser = async (id) => {
    const res = await api.put(`/api/admin/users/${id}/reject`);
    return res.data;
};