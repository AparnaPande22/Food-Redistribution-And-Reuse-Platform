import api from "./api";

/**
 * NOTE: This service assumes the backend exposes the following endpoints.
 * Adjust the paths/payloads here if your backend uses different names.
 *
 *  POST /auth/register        { name, email, phone, password, city, address, accountType }
 *                              -> creates the account (unverified) and sends an OTP to the email
 *  POST /auth/login           { email, password }
 *                              -> validates credentials and sends a login OTP to the email
 *                                 (does NOT return a token yet - see IMPORTANT note in README/chat)
 *  POST /auth/verify-otp      { email, otp, purpose }
 *                              -> purpose is one of "REGISTER" | "LOGIN" | "RESET_PASSWORD"
 *                                 for LOGIN this should return the LoginResponseDTO (token, user info)
 *  POST /auth/resend-otp      { email, purpose }
 *  POST /auth/forgot-password { email }
 *                              -> sends an OTP to the email for password reset
 *  POST /auth/reset-password  { email, otp, newPassword }
 *                              -> verifies the OTP and sets the new password in one call
 */

export const registerUser = (payload) => {
    return api.post("/auth/register", payload);
};

export const verifyOtp = (email, otp, purpose = "REGISTER") => {
    return api.post("/auth/verify-otp", { email, otp, purpose });
};

export const resendOtp = (email, purpose = "REGISTER") => {
    return api.post("/auth/resend-otp", { email, purpose });
};

// Step 1 of login: validate credentials, triggers OTP to be emailed.
export const loginUser = (email, password) => {
    return api.post("/auth/login", { email, password });
};

// Step 2 of login: verify the OTP that was emailed, returns the token/user info.
export const verifyLoginOtp = (email, otp) => {
    return api.post("/auth/verify-otp", { email, otp, purpose: "LOGIN" });
};

export const resendLoginOtp = (email) => {
    return api.post("/auth/resend-otp", { email, purpose: "LOGIN" });
};

export const forgotPassword = (email) => {
    return api.post("/auth/forgot-password", { email });
};

export const resetPassword = (email, otp, newPassword) => {
    return api.post("/auth/reset-password", { email, otp, newPassword });
};
