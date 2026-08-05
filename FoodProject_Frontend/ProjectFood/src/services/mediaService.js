import api from "./api";

// Media
export const uploadImage = (formData) =>
  api.post("/media", formData, { headers: { "Content-Type": "multipart/form-data" } }).then(r => r.data);
export const getMediaById = (id) => api.get(`/media/${id}`).then(r => r.data);
export const deleteImage = (id) => api.delete(`/media/${id}`).then(r => r.data);

export default { uploadImage, getMediaById, deleteImage };
