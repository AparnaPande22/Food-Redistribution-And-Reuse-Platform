import api from "./api";

// Documents
export const uploadDocument = (formData) =>
    api.post("/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
export const getDocumentById = (id) => api.get(`/documents/${id}`);
export const getUserDocuments = (userId) => api.get(`/documents/user/${userId}`);
export const verifyDocument = (id) => api.put(`/documents/${id}/verify`);
export const rejectDocument = (id) => api.put(`/documents/${id}/reject`);

export default {
    uploadDocument,
    getDocumentById,
    getUserDocuments,
    verifyDocument,
    rejectDocument,
};
