import { useState, useRef, useEffect } from "react";
import "./OtpModal.css";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

/**
 * Props:
 *  - email      : string shown to the user ("code sent to ...")
 *  - title      : optional heading (defaults to "Verify Your Email")
 *  - subtitle   : optional custom subtitle text
 *  - onVerify   : async (otp:string) => void   -> should throw on failure
 *  - onResend   : async () => void             -> should throw on failure
 *  - onClose    : () => void
 */
function OtpModal({ email, title, subtitle, onVerify, onResend, onClose }) {

    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const [timer, setTimer] = useState(RESEND_SECONDS);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const inputsRef = useRef([]);

    useEffect(() => {
        if (timer <= 0) return;
        const id = setTimeout(() => setTimer((t) => t - 1), 1000);
        return () => clearTimeout(id);
    }, [timer]);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    const handleChange = (index, value) => {

        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError("");

        if (value && index < OTP_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {

        const pasted = e.clipboardData.getData("text").trim();

        if (/^\d+$/.test(pasted)) {
            const digits = pasted.slice(0, OTP_LENGTH).split("");
            const newOtp = Array(OTP_LENGTH).fill("");
            digits.forEach((d, i) => (newOtp[i] = d));
            setOtp(newOtp);
            inputsRef.current[Math.min(digits.length, OTP_LENGTH - 1)]?.focus();
        }

        e.preventDefault();
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const code = otp.join("");

        if (code.length !== OTP_LENGTH) {
            setError("Please enter the complete 6-digit code");
            return;
        }

        try {
            setLoading(true);
            await onVerify(code);
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err?.response?.data ||
                "Invalid or expired OTP. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {

        if (timer > 0) return;

        try {
            setError("");
            await onResend();
            setTimer(RESEND_SECONDS);
            setOtp(Array(OTP_LENGTH).fill(""));
            inputsRef.current[0]?.focus();
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err?.response?.data ||
                "Failed to resend OTP. Please try again."
            );
        }
    };

    return (
        <div className="otp-overlay">

            <div className="otp-modal">

                <button
                    type="button"
                    className="otp-close-btn"
                    onClick={onClose}
                    title="Close"
                >
                    ×
                </button>

                <h3 className="otp-title">{title || "Verify Your Email"}</h3>

                <p className="otp-subtitle">
                    {subtitle || (
                        <>We've sent a 6-digit verification code to <strong>{email}</strong></>
                    )}
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="otp-inputs" onPaste={handlePaste}>

                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputsRef.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="otp-input-box"
                            />
                        ))}

                    </div>

                    {error && <p className="otp-error">{error}</p>}

                    <button
                        type="submit"
                        className="otp-verify-btn"
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>

                </form>

                <p className="otp-resend">
                    Didn't receive the code?{" "}
                    {timer > 0 ? (
                        <span className="otp-timer">Resend in {timer}s</span>
                    ) : (
                        <button
                            type="button"
                            className="otp-resend-btn"
                            onClick={handleResend}
                        >
                            Resend OTP
                        </button>
                    )}
                </p>

            </div>

        </div>
    );
}

export default OtpModal;
