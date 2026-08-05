import { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/food/api/auth/forgot-password",
                {
                    email
                }
            );

            alert("Password reset link sent to your email.");

        } catch {

            alert("Unable to send reset link.");

        }

    };

    return (

        <div className="forgot-page">

            <div className="forgot-card">

                <h3 className="logo">
                    Beyond Waste
                </h3>

                <h1 className="title">
                    Reset Password
                </h1>

                <p className="subtitle">
                    Enter your email address and we'll send you
                    instructions to reset your password.
                </p>

                <form onSubmit={handleSubmit}>

                    <label>Email Address</label>

                    <div className="input-box">

                        <FaEnvelope className="icon"/>

                        <input
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="reset-btn"
                    >
                        Send Reset Link →
                    </button>

                </form>

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