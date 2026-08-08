import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/food/api",
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        // Authentication endpoints should NOT send an existing JWT
        const isAuthRequest =
            config.url.includes("/auth/login") ||
            config.url.includes("/auth/register") ||
            config.url.includes("/auth/verify-otp") ||
            config.url.includes("/auth/resend-otp") ||
            config.url.includes("/auth/forgot-password") ||
            config.url.includes("/auth/reset-password");

        if (token && !isAuthRequest) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;