import { useEffect, useState } from "react";
import { getMatchingQueue } from "../../services/adminService";
import { approveMatch, rejectMatch, assignDeliveryPartner } from "../../services/matchService";
import { getAllUsers } from "../../services/userService";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./dashboard.css";

function AdminMatchingQueuePage() {
    const [queue, setQueue] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assignChoice, setAssignChoice] = useState({}); // { [matchId]: volunteerId }

    useEffect(() => {
        loadQueue();
        loadVolunteers();
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

    const loadVolunteers = async () => {
        try {
            const res = await getAllUsers();
            const all = res.data || [];
            setVolunteers(all.filter((u) => u.accountType === "VOLUNTEER"));
        } catch (err) {
            console.log("Error loading volunteers:", err);
        }
    };

    const handleApprove = async (matchId) => {
        try {
            await approveMatch(matchId);
            alert(`Match #${matchId} approved.`);
            loadQueue();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || err.response?.data || "Unable to approve match.");
        }
    };

    const handleReject = async (matchId) => {
        try {
            await rejectMatch(matchId);
            alert(`Match #${matchId} rejected.`);
            loadQueue();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || err.response?.data || "Unable to reject match.");
        }
    };

    const handleAssign = async (matchId) => {
        const volunteerId = assignChoice[matchId];

        if (!volunteerId) {
            alert("Please choose a volunteer to assign first.");
            return;
        }

        try {
            await assignDeliveryPartner(matchId, volunteerId);
            alert(`Delivery partner assigned to match #${matchId}. It will now appear in that volunteer's Assigned Deliveries.`);
            loadQueue();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || err.response?.data || "Unable to assign delivery partner.");
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
                        Approve or reject donor↔receiver matches, then assign a volunteer
                        to hand off the delivery once approved.
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
                                    <th>Actions</th>
                                    <th>Assign Volunteer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queue.map((item) => (
                                    <tr key={item.matchId}>
                                        <td>#{item.matchId}</td>
                                        <td>#{item.requestId || item.request?.id || "N/A"}</td>
                                        <td>
                                            <span className="status">{item.matchStatus || "PENDING"}</span>
                                        </td>
                                        <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Today"}</td>
                                        <td style={{ whiteSpace: "nowrap" }}>
                                            {item.matchStatus === "PENDING" || !item.matchStatus ? (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(item.matchId)}
                                                        style={{ marginRight: 6, background: "#16a34a", color: "#fff", border: "none", padding: "5px 10px", borderRadius: 6, cursor: "pointer" }}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(item.matchId)}
                                                        style={{ background: "#dc2626", color: "#fff", border: "none", padding: "5px 10px", borderRadius: 6, cursor: "pointer" }}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <span style={{ color: "#6b7280" }}>—</span>
                                            )}
                                        </td>
                                        <td>
                                            {item.matchStatus === "APPROVED" ? (
                                                <div style={{ display: "flex", gap: 6 }}>
                                                    <select
                                                        value={assignChoice[item.matchId] || ""}
                                                        onChange={(e) =>
                                                            setAssignChoice({ ...assignChoice, [item.matchId]: e.target.value })
                                                        }
                                                        style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #d1d5db" }}
                                                    >
                                                        <option value="">Select volunteer...</option>
                                                        {volunteers.map((v) => (
                                                            <option key={v.id} value={v.id}>
                                                                {v.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        onClick={() => handleAssign(item.matchId)}
                                                        style={{ background: "#2563eb", color: "#fff", border: "none", padding: "5px 10px", borderRadius: 6, cursor: "pointer" }}
                                                    >
                                                        Assign
                                                    </button>
                                                </div>
                                            ) : (
                                                <span style={{ color: "#9ca3af" }}>
                                                    Approve match first
                                                </span>
                                            )}
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

export default AdminMatchingQueuePage;
