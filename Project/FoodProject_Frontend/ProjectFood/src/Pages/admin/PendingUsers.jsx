import { useEffect, useState } from "react";
import {
    getPendingUsers,
    approveUser,
    rejectUser,
} from "../../services/adminService";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./dashboard.css";

function PendingUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await getPendingUsers();
            setUsers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.log("Error loading pending users:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await approveUser(id);
            loadUsers();
        } catch (err) {
            alert(err.response?.data?.message || "Approval failed");
        }
    };

    const handleReject = async (id) => {
        try {
            await rejectUser(id);
            loadUsers();
        } catch (err) {
            alert(err.response?.data?.message || "Rejection failed");
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="dashboard-body">
                    <h2 style={{ marginBottom: "20px" }}>Pending User Approvals</h2>

                    {loading ? (
                        <p>Loading pending user applications...</p>
                    ) : users.length === 0 ? (
                        <p>No pending user applications to review.</p>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone || "N/A"}</td>
                                        <td>{user.accountType || user.role}</td>
                                        <td>
                                            <button
                                                className="approve-btn"
                                                onClick={() => handleApprove(user.id)}
                                                style={{ backgroundColor: "#10b981", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", marginRight: "8px", cursor: "pointer" }}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="reject-btn"
                                                onClick={() => handleReject(user.id)}
                                                style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
                                            >
                                                Reject
                                            </button>
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

export default PendingUsers;
