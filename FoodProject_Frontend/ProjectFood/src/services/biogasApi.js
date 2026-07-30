import axios from "../utils/axiosConfig";

export const getPendingRequests = () =>
    axios.get("/api/biogas/requests/pending");