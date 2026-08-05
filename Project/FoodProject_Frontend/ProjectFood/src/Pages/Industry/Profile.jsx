import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "../../Component/Industry/Navbar";
import { getProfile, updateProfile } from "../../services/biogasService";

import "../../css/industryDashboard.css";
import "../../css/industryResponsive.css";
import "../../css/industryExtraPages.css";

const Profile = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        companyName: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        getProfile()
            .then((res) => {
                setForm((prev) => ({ ...prev, ...(res.data || {}) }));
            })
            .catch((err) => console.error("Failed to load profile:", err))
            .finally(() => setLoading(false));

    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setSaving(true);

        try {

            await updateProfile(form);
            alert("Profile updated successfully.");

        } catch (err) {

            console.error("Failed to update profile:", err);
            alert(err.response?.data?.message || err.response?.data || "Unable to update profile.");

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

                        <h2>My Profile</h2>

                        {loading ? (

                            <p>Loading profile...</p>

                        ) : (

                            <form onSubmit={handleSubmit}>

                                <div className="extra-form-group">
                                    <label>Company / Facility Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={form.companyName || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="extra-form-group">
                                    <label>Contact Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="extra-form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email || ""}
                                        disabled
                                    />
                                </div>

                                <div className="extra-form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={form.phone || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="extra-form-group">
                                    <label>Address</label>
                                    <textarea
                                        name="address"
                                        rows="3"
                                        value={form.address || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="extra-save-btn"
                                    disabled={saving}
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>

                            </form>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );
};

export default Profile;
