import { useEffect, useState } from "react";
import donationService from "../../services/donationService";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./dashboard.css";

function AdminDonationsPage() {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDonations();
    }, []);

    const loadDonations = async () => {
        try {
            const data = await donationService.getAllRequests();
            setDonations(Array.isArray(data) ? data : []);
        } catch (err) {
            console.log("Error loading donations:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="dashboard-body">
                    <h2>All Food Surplus Listings</h2>
                    <p style={{ marginBottom: "20px", color: "#6b7280" }}>
                        Oversight of all food donations across the platform.
                    </p>

                    {loading ? (
                        <p>Loading donations...</p>
                    ) : donations.length === 0 ? (
                        <p>No food surplus listings found.</p>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Food Title / Type</th>
                                    <th>Quantity</th>
                                    <th>Pickup Location</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.map((item) => (
                                    <tr key={item.id}>
                                        <td>#{item.id}</td>
                                        <td>{item.title || item.foodType || "Food Donation"}</td>
                                        <td>{item.quantity} {item.unit || "kg/meals"}</td>
                                        <td>{item.pickupLocation || "N/A"}</td>
                                        <td>
                                            <span className="status">{item.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDonationsPage;
