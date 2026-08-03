import { useState, useRef } from "react";
import "./Login.css";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
//import Captcha from "./Captcha";

function Login() {

    const navigate = useNavigate();
    //const captchaRef = useRef(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        // // ---- CAPTCHA CHECK ----
        // if (!captchaRef.current.validate()) {
        //     alert("Incorrect captcha code. Please try again.");
        //     captchaRef.current.refresh();
        //     return;
        // }

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            // Save JWT Token
            localStorage.setItem("token", response.data.token);

            // Save User Details
           localStorage.setItem(
    "user",
    JSON.stringify({
        userId: response.data.userId,
        name: response.data.name,
        email: response.data.email,
        accountType: response.data.accountType
    })
);

            const role = response.data.accountType;

            switch (role) {

    case "ADMIN":
        navigate("/admin");
        break;

    case "DONOR":
        navigate("/donor");
        break;

    case "RECEIVER":
        navigate("/receiver");
        break;

    case "VOLUNTEER":
        navigate("/volunteer");
        break;

    case "BIOGAS_PARTNER":
        navigate("/industry");
        break;

    default:
        navigate("/");
}

        } catch (err) {

            console.log(err);

            if (err.response) {

                console.log("Status:", err.response.status);
                console.log("Data:", err.response.data);

                alert(err.response.data.message || "Login failed");

            } else if (err.request) {

                alert("Cannot connect to the backend.");

            } else {

                alert(err.message);
            }

          //  captchaRef.current.refresh();
        }
    };

    return (

        <div className="login-page">

            {/* Header */}

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

            {/* Main */}

            <div className="container">

                <div className="row align-items-center justify-content-center g-5">

                    {/* LEFT */}

                    <div className="col-lg-5 d-flex flex-column justify-content-center">

                        <h1 className="heading">
                            Welcome Back
                        </h1>

                        <p className="subheading">
                            Sign in to continue creating impact through Beyond Waste.
                        </p>

                        <div className="login-card">

                            <form onSubmit={handleSubmit}>

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <div className="options">

                                    <label>

                                        <input type="checkbox" />

                                        Remember Me

                                    </label>

                                    <Link to="/forgot-password">
                                        Forgot Password?
                                    </Link>

                                </div>

                                {/* { ---- CAPTCHA ---- */}
                                {/* <Captcha ref={captchaRef} /> */}

                                <button
                                    type="submit"
                                    className="signin-btn"
                                >
                                    Sign In →
                                </button> 
                                {/* } */}

                            </form>

                            <div className="divider">
                                Or continue with
                            </div>

                            <div className="row g-3 mt-2">

                                <div className="col-6">

                                    <button type="button" className="social-btn">

                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                                            alt="google"
                                        />

                                        <span>Google</span>

                                    </button>

                                </div>

                                <div className="col-6">

                                    <button type="button" className="social-btn">

                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                                            alt="linkedin"
                                        />

                                        <span>LinkedIn</span>

                                    </button>

                                </div>

                            </div>

                        </div>

                        <p className="register mt-4">

                            Don't have an account?

                            <Link to="/register">
                                Register
                            </Link>

                        </p>

                    </div>

                    {/* RIGHT */}

                    <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center image-section">

                        <div className="image-wrapper">

                            <img
                                src="/login-image.png"
                                alt="Login"
                            />

                            <div className="impact-cardlogin">

                                <small>IMPACT METRIC</small>

                                <h3>2.4M Tons</h3>

                                <p>
                                    of waste diverted from landfills collectively by our community.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Login;
