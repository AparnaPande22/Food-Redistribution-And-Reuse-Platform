
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080/food/api",
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// // ======================================================
// // JWT INTERCEPTOR
// // ======================================================

// api.interceptors.request.use(
//   (config) => {

//     const token = localStorage.getItem("token");

//     // Authentication APIs should not send old JWT
//     const isAuthRequest =
//       config.url?.includes("/auth/login") ||
//       config.url?.includes("/auth/register") ||
//       config.url?.includes("/auth/verify-otp") ||
//       config.url?.includes("/auth/resend-otp") ||
//       config.url?.includes("/auth/forgot-password") ||
//       config.url?.includes("/auth/reset-password");

//     if (token && !isAuthRequest) {

//       config.headers.Authorization =
//         `Bearer ${token}`;

//       console.log(
//         "JWT attached to request:",
//         config.method?.toUpperCase(),
//         config.url
//       );

//     } else {

//       console.log(
//         "No JWT attached:",
//         config.method?.toUpperCase(),
//         config.url
//       );

//     }

//     return config;
//   },

//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // ======================================================
// // RESPONSE INTERCEPTOR
// // ======================================================

// api.interceptors.response.use(

//   (response) => {
//     return response;
//   },

//   (error) => {

//     console.error(
//       "API ERROR:",
//       error.config?.method?.toUpperCase(),
//       error.config?.url
//     );

//     console.error(
//       "STATUS:",
//       error.response?.status
//     );

//     console.error(
//       "RESPONSE:",
//       error.response?.data
//     );

//     if (error.response?.status === 401) {

//       console.error(
//         "JWT authentication failed."
//       );

//       // Do not automatically redirect during debugging.
//       // This allows us to see the actual backend error.
//     }

//     if (error.response?.status === 403) {

//       console.error(
//         "403 FORBIDDEN - Check JWT role / Spring Security configuration."
//       );

//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8080/food/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

const publicAuthPaths = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-otp",
  "/auth/resend-otp",
  "/auth/forgot-password",
  "/auth/reset-password",
];

api.interceptors.request.use(
  (config) => {
    const isPublicAuthRequest = publicAuthPaths.some(
      (path) => config.url?.includes(path)
    );

    if (!isPublicAuthRequest) {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Do not redirect during login or registration.
      const url = error.config?.url || "";
      const isAuthRequest = publicAuthPaths.some(
        (path) => url.includes(path)
      );

      if (!isAuthRequest) {
        localStorage.removeItem("token");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
