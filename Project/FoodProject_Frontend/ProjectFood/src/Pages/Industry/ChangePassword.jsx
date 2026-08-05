import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "../../Component/Industry/Navbar";
import { changePassword } from "../../services/biogasService";

import "../../css/industryDashboard.css";
import "../../css/industryResponsive.css";
import "../../css/industryExtraPages.css";

const ChangePassword = () => {

    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            alert("New passwords do not match.");
            return;
        }

        if (form.newPassword.length < 6) {
            alert("New password must be at least 6 characters.");
            return;
        }

        setSaving(true);

        try {

            await changePassword({
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
            });

            alert("Password changed successfully.");

            setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });

        } catch (err) {

            console.error("Failed to change password:", err);
            alert(err.response?.data?.message || err.response?.data || "Unable to change password.");

        } finally {
            setSaving(false);
        }
    };

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="extra-page-content">

                    <div className="extra-card">

                        <h2>Change Password</h2>

                        <form onSubmit={handleSubmit}>

                            <div className="extra-form-group">
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={form.currentPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="extra-form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="extra-form-group">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="extra-save-btn"
                                disabled={saving}
                            >
                                {saving ? "Updating..." : "Update Password"}
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default ChangePassword;
