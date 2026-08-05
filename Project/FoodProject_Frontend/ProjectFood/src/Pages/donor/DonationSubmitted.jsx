import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DonationSubmitted.css";

function DonationSubmitted() {

    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        if (loggedUser) {
            setUser(loggedUser);
        }
    }, []);

    const handleDashboard = () => {
        navigate("/donor/");
    };

    return (
        <div className="submitted-page">

            {/* Main Card */}

            <div className="submitted-card">

                {/* Badge */}

                <div className="impact-badge">
              <span>🌱</span>
<span>Positive Impact</span>  </div>

                {/* Image */}

                <div className="success-image">

                    <img
                        src="/donation-success.jpg"
                        alt="Donation Success"
                    />

                </div>

                {/* Heading */}

                <h1>
                    Donation Submitted
                </h1>

                {/* Message */}

                <p className="message">

                    Thank you
                    {user?.name ? `, ${user.name}` : ""}!

                    <br />

                    Our system will coordinate with community
                    requirements and notify you when a suitable
                    match is found.

                </p>

                {/* Progress */}

                <div className="progress-wrapper">

                    <div className="progress-bar">

                        <div className="progress-fill"></div>

                    </div>

                    <p className="progress-text">

                        OPTIMIZING COMMUNITY LOGISTICS

                    </p>

                </div>

                {/* Button */}

                <button
                    className="dashboard-btn"
                    onClick={handleDashboard}
                >
                    Return to Dashboard →
                </button>

            </div>

            {/* Footer */}

            <footer className="submitted-footer">

                <div className="footer-left">

                    <strong>Beyond Waste</strong>

                </div>

                <div className="footer-center">

                    © 2026 Beyond Waste. All Rights Reserved.

                </div>

                <div className="footer-right">

                    <span>Privacy Policy</span>

                    <span>Contact Support</span>

                </div>

            </footer>

        </div>
    );
}

export default DonationSubmitted;