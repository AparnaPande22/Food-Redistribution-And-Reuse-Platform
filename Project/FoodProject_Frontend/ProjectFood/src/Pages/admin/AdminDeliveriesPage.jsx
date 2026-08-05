import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./dashboard.css";

function AdminDeliveriesPage() {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDeliveries();
    }, []);

    const loadDeliveries = async () => {
        try {
            const res = await api.get("/deliveries/assigned");
            setDeliveries(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.log("Error loading deliveries:", err);
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
                    <h2>Deliveries Overview</h2>
                    <p style={{ marginBottom: "20px", color: "#6b7280" }}>
                        Monitor active and completed food deliveries.
                    </p>

                    {loading ? (
                        <p>Loading deliveries...</p>
                    ) : deliveries.length === 0 ? (
                        <p>No active or completed deliveries found.</p>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Delivery ID</th>
                                    <th>Match ID</th>
                                    <th>Volunteer ID</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deliveries.map((item) => (
                                    <tr key={item.id}>
                                        <td>#{item.id}</td>
                                        <td>#{item.matchId || item.match?.id || "N/A"}</td>
                                        <td>{item.volunteerId || "Unassigned"}</td>
                                        <td>
                                            <span className="status">{item.status || item.deliveryStatus}</span>
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

export default AdminDeliveriesPage;
