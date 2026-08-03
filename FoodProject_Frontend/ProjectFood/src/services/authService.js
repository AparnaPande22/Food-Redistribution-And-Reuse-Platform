import api from "./api";

/**
 * NOTE: This service assumes the backend exposes the following endpoints.
 * Adjust the paths/payloads here if your backend uses different names.
 *
 *  POST /auth/register     { name, email, phone, password, city, address, accountType }
 *                           -> creates the account (unverified) and sends an OTP to the email
 *  POST /auth/verify-otp   { email, otp }
 *                           -> marks the account as verified
 *  POST /auth/resend-otp   { email }
 *                           -> re-sends a fresh OTP
 *  POST /auth/login        { email, password }  (already existed)
 */

export const registerUser = (payload) => {
    return api.post("/auth/register", payload);
};

export const verifyOtp = (email, otp) => {
    return api.post("/auth/verify-otp", { email, otp });
};

export const resendOtp = (email) => {
    return api.post("/auth/resend-otp", { email });
};

export const loginUser = (email, password) => {
    return api.post("/auth/login", { email, password });
};
