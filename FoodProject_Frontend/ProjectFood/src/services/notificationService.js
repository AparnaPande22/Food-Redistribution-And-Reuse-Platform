import api from "./api";

// Notifications
export const sendNotification = (data) => api.post("/notifications", data);
export const getMyNotifications = () => api.get("/notifications");
export const markNotificationRead = (id) => api.put(`/notifications/${id}/read`);

export default {
    sendNotification,
    getMyNotifications,
    markNotificationRead,
};
