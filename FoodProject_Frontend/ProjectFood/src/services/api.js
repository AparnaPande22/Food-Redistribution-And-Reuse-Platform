import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/food/api",
});

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        // Don't send JWT for login and registration
        if (
            token &&
            !config.url.includes("/auth/login") &&
            !config.url.includes("/auth/register")
        ) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // console.log("=== AXIOS REQUEST ===");
        // console.log(config.data);

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;