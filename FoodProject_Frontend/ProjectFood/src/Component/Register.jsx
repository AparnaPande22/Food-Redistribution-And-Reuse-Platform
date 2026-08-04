import { useState, useRef } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, verifyOtp, resendOtp } from "../services/authService";
import Captcha from "./Captcha";
import OtpModal from "./OtpModal";

function Register() {

    const navigate = useNavigate();
    const captchaRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        city: "",
        address: "",
        accountType: "DONOR"
    });

    const [showOtpModal, setShowOtpModal] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value   //e.target.name suppose give "name" and e.target.value will give user entered name
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // ---- CAPTCHA CHECK ----
        if (!captchaRef.current.validate()) {
            alert("Incorrect captcha code. Please try again.");
            captchaRef.current.refresh();
            return;
        }

        try {

            await registerUser({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                city: formData.city,
                address: formData.address,
                accountType: formData.accountType
            });

            // Registration succeeded -> backend has sent an OTP to the email.
            // Show the OTP modal instead of navigating straight to /login.
            setShowOtpModal(true);

        } catch (err) {

            console.log(err);

            if (err.response) {
                alert(err.response.data?.message || err.response.data);
            } else {
                alert("Unable to connect to server");
            }

            captchaRef.current.refresh();

        }

    };

    const handleVerifyOtp = async (otp) => {
        await verifyOtp(formData.email, otp, "REGISTER");
        alert("Email verified successfully! Please log in.");
        setShowOtpModal(false);
        navigate("/login");
    };

    const handleResendOtp = async () => {
        await resendOtp(formData.email, "REGISTER");
    };

    return (

        <div className="register-page">

            {/* HEADER */}

            <div className="container py-3">

                <div className="d-flex justify-content-between align-items-center">

                    <h3 className="brand">
                        Beyond Waste
                    </h3>

                    <Link to="/" className="help">
                        Help
                    </Link>

                </div>

            </div>

            {/* MAIN */}

            <div className="container">

                <div className="row align-items-center justify-content-center g-5">

                    {/* LEFT */}

                    <div className="col-lg-5">

                        <h1 className="heading">
                            Create Account
                        </h1>

                        <p className="subheading">
                            Join Beyond Waste and help reduce food waste by connecting
                            donors with people in need.
                        </p>

                        <div className="register-card">

                            <form onSubmit={handleSubmit}>

                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />

                                <textarea
                                    placeholder="Address"
                                    name="address"
                                    rows="3"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                ></textarea>

                                <select
                                    name="accountType"
                                    value={formData.accountType}
                                    onChange={handleChange}
                                >
                                    <option value="DONOR">Donor</option>
                                    <option value="RECEIVER">Receiver</option>
                                    <option value="VOLUNTEER">Volunteer</option>
                                     <option value="BIOGAS_PARTNER">Industry Partner</option>
                                </select>

                                {/* ---- CAPTCHA ---- */}
                                <Captcha ref={captchaRef} />

                                <button
                                    type="submit"
                                    className="register-btn"
                                >
                                    Create Account →
                                </button>

                            </form>

                            <div className="divider">
                                Or continue with
                            </div>

                            <div className="row g-3 mt-1">

                                <div className="col-6">

                                    <button
                                        type="button"
                                        className="social-btn"
                                    >
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                                            alt="Google"
                                        />

                                        <span>Google</span>

                                    </button>

                                </div>

                                <div className="col-6">

                                    <button
                                        type="button"
                                        className="social-btn"
                                    >
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                                            alt="LinkedIn"
                                        />

                                        <span>LinkedIn</span>

                                    </button>

                                </div>

                            </div>

                        </div>

                        <p className="login-link mt-4">

                            Already have an account?

                            <Link to="/login">
                                Sign In
                            </Link>

                        </p>

                    </div>

                    {/* RIGHT */}

                    <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">

                        <div className="image-wrapper">

                            <img
                                src="/register-image.png"
                                alt="Register"
                            />

                            <div className="impact-cardregister">

                                <small>JOIN OUR MISSION</small>

                                <h3>10K+</h3>

                                <p>
                                    People have already joined Beyond Waste to reduce
                                    food waste and support communities.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {showOtpModal && (
                <OtpModal
                    email={formData.email}
                    title="Verify Your Email"
                    onVerify={handleVerifyOtp}
                    onResend={handleResendOtp}
                    onClose={() => setShowOtpModal(false)}
                />
            )}

        </div>

    );

}

export default Register;
