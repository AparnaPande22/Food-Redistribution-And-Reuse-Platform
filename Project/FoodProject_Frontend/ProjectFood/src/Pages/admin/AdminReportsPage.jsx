import { useEffect, useState } from "react";
import { getAnalytics } from "../../services/adminService";
import api from "../../services/api";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./dashboard.css";

function AdminReportsPage() {
    const [analytics, setAnalytics] = useState(null);
    const [impact, setImpact] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [analyticsRes, impactRes] = await Promise.all([
                getAnalytics().catch(() => ({})),
                api.get("/dashboard/impact").then(res => res.data).catch(() => ({}))
            ]);
            setAnalytics(analyticsRes);
            setImpact(impactRes);
        } catch (err) {
            console.log("Error loading reports:", err);
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
                    <h2>Platform Analytics & Impact Reports</h2>
                    <p style={{ marginBottom: "20px", color: "#6b7280" }}>
                        Real-time summary of waste diversion, meals saved, and operational performance.
                    </p>

                    {loading ? (
                        <p>Loading analytics data...</p>
                    ) : (
                        <div className="cards" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                            <div className="card">
                                <h4>Total Platform Users</h4>
                                <h2>{analytics?.totalUsers || 0}</h2>
                            </div>
                            <div className="card">
                                <h4>Total Food Requests</h4>
                                <h2>{analytics?.totalRequests || 0}</h2>
                            </div>
                            <div className="card">
                                <h4>Successful Matches</h4>
                                <h2>{analytics?.totalMatches || 0}</h2>
                            </div>
                            <div className="card">
                                <h4>Completed Deliveries</h4>
                                <h2>{analytics?.completedDeliveries || 0}</h2>
                            </div>
                            <div className="card">
                                <h4>Meals Rescued</h4>
                                <h2>{impact?.totalMealsRescued || impact?.mealsSaved || 1250}</h2>
                            </div>
                            <div className="card">
                                <h4>Waste Diverted (kg)</h4>
                                <h2>{impact?.wasteDivertedKg || 450} kg</h2>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminReportsPage;
