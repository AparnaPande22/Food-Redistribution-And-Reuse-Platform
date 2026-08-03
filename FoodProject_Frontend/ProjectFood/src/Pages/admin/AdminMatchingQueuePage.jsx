import { useEffect, useState } from "react";
import { getMatchingQueue } from "../../services/adminService";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./dashboard.css";

function AdminMatchingQueuePage() {
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadQueue();
    }, []);

    const loadQueue = async () => {
        try {
            const data = await getMatchingQueue();
            setQueue(Array.isArray(data) ? data : []);
        } catch (err) {
            console.log("Error loading matching queue:", err);
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
                    <h2>Matching Queue Oversight</h2>
                    <p style={{ marginBottom: "20px", color: "#6b7280" }}>
                        View active matches and queue pending logistics assignment.
                    </p>

                    {loading ? (
                        <p>Loading matching queue...</p>
                    ) : queue.length === 0 ? (
                        <p>No active items in the matching queue.</p>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Match ID</th>
                                    <th>Request ID</th>
                                    <th>Status</th>
                                    <th>Creation Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queue.map((item) => (
                                    <tr key={item.id}>
                                        <td>#{item.id}</td>
                                        <td>#{item.requestId || item.request?.id || "N/A"}</td>
                                        <td>
                                            <span className="status">{item.status || "PENDING"}</span>
                                        </td>
                                        <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Today"}</td>
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

export default AdminMatchingQueuePage;
