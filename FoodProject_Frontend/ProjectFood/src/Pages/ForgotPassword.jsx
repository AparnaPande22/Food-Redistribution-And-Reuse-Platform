import { useEffect, useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft, FaKey, FaLock } from "react-icons/fa";
import { forgotPassword, resetPassword } from "../services/authService";

const RESEND_SECONDS = 30;

function ForgotPassword() {

    // step 1 = enter email, step 2 = enter OTP + new password
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        if (timer <= 0) return;
        const id = setTimeout(() => setTimer((t) => t - 1), 1000);
        return () => clearTimeout(id);
    }, [timer]);

    const handleSendOtp = async (e) => {

        e.preventDefault();

        try {

            await forgotPassword(email);

            alert("A verification code has been sent to your email.");
            setStep(2);
            setTimer(RESEND_SECONDS);

        } catch (err) {

            alert(err?.response?.data?.message || err?.response?.data || "Unable to send verification code.");
        }
    };

    const handleResendOtp = async () => {

        if (timer > 0) return;

        try {

            await forgotPassword(email);
            setTimer(RESEND_SECONDS);
            alert("A new verification code has been sent to your email.");

        } catch (err) {

            alert(err?.response?.data?.message || err?.response?.data || "Unable to resend verification code.");
        }
    };

    const handleResetPassword = async (e) => {

        e.preventDefault();

        if (otp.trim().length !== 6) {
            alert("Please enter the complete 6-digit code.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {

            await resetPassword(email, otp, newPassword);

            alert("Password reset successfully! Please log in.");
            window.location.href = "/login";

        } catch (err) {

            alert(
                err?.response?.data?.message ||
                err?.response?.data ||
                "Invalid or expired code. Please try again."
            );
        }
    };

    return (

        <div className="forgot-page">

            <div className="forgot-card">

                <h3 className="logo">
                    Beyond Waste
                </h3>

                {step === 1 && (

                    <>
                        <h1 className="title">
                            Reset Password
                        </h1>

                        <p className="subtitle">
                            Enter your email address and we'll send you a
                            verification code to reset your password.
                        </p>

                        <form onSubmit={handleSendOtp}>

                            <label>Email Address</label>

                            <div className="input-box">

                                <FaEnvelope className="icon" />

                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="reset-btn"
                            >
                                Send Verification Code →
                            </button>

                        </form>
                    </>
                )}

                {step === 2 && (

                    <>
                        <h1 className="title">
                            Enter Code &amp; New Password
                        </h1>

                        <p className="subtitle">
                            We've sent a 6-digit code to <strong>{email}</strong>.
                            Enter it below along with your new password.
                        </p>

                        <form onSubmit={handleResetPassword}>

                            <label>Verification Code</label>

                            <div className="input-box">

                                <FaKey className="icon" />

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="6"
                                    placeholder="6-digit code"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                    required
                                />

                            </div>

                            <label>New Password</label>

                            <div className="input-box">

                                <FaLock className="icon" />

                                <input
                                    type="password"
                                    placeholder="New password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />

                            </div>

                            <label>Confirm New Password</label>

                            <div className="input-box">

                                <FaLock className="icon" />

                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="reset-btn"
                            >
                                Reset Password →
                            </button>

                        </form>

                        <p className="subtitle mt-2">
                            Didn't receive the code?{" "}
                            {timer > 0 ? (
                                <span>Resend in {timer}s</span>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", padding: 0 }}
                                >
                                    Resend Code
                                </button>
                            )}
                        </p>
                    </>
                )}

                <Link
                    to="/login"
                    className="back-link"
                >
                    <FaArrowLeft />
                    Back to Login
                </Link>

            </div>

        </div>

    );

}

export default ForgotPassword;