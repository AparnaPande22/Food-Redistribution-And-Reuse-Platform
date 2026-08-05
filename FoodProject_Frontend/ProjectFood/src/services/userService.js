import api from "./api";

// Users
export const addUser = (data) => api.post("/users", data);
export const getUserById = (id) => api.get(`/users/${id}`);
export const getAllUsers = () => api.get("/users");
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const getUserByEmail = (email) => api.get(`/users/email/${email}`);
export const updateProfile = (data) => api.put("/users/profile", data);

export default {
    addUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserByEmail,
    updateProfile,
};
