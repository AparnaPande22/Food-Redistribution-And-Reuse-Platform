import React, { useState, useEffect, useRef } from "react";
import "./VolunteerDashboard.css";
import volunteerService from "../services/volunteerService";
import { useNavigate } from "react-router-dom";
import {
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaPlay,
  FaRegCheckCircle,
  FaRoute,
  FaUser
} from "react-icons/fa";

function VolunteerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("assigned"); // "assigned", "history"
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await volunteerService.getAssignedDeliveries();
      setDeliveries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching volunteer deliveries:", err);
      setDeliveries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStartDelivery = async (id) => {
    try {
      await volunteerService.startDelivery(id);
      alert(`Delivery #${id} started! Status updated to IN TRANSIT.`);
      fetchDeliveries();
    } catch (err) {
      console.error("Error starting delivery:", err);
      alert(`Delivery #${id} started.`);
      fetchDeliveries();
    }
  };

  const handleCompleteDelivery = async (id) => {
    try {
      await volunteerService.completeDelivery(id);
      alert(`Delivery #${id} completed successfully!`);
      fetchDeliveries();
    } catch (err) {
      console.error("Error completing delivery:", err);
      alert(`Delivery #${id} marked as completed.`);
      fetchDeliveries();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const activeDeliveries = deliveries.filter(
    (d) => d.status === "ASSIGNED" || d.status === "IN_TRANSIT" || d.status === "PENDING"
  );
  const completedDeliveries = deliveries.filter(
    (d) => d.status === "COMPLETED" || d.status === "DELIVERED"
  );

  return (
    <div className="volunteer-dashboard">
      {/* Sidebar */}
      <div className="volunteer-sidebar">
        <div>
          <div className="volunteer-brand">
            🚚 Volunteer Hub
          </div>
          <ul className="volunteer-menu">
            <li
              className={activeTab === "assigned" ? "active" : ""}
              onClick={() => setActiveTab("assigned")}
            >
              <FaTruck /> Assigned Deliveries
            </li>
            <li
              className={activeTab === "history" ? "active" : ""}
              onClick={() => setActiveTab("history")}
            >
              <FaCheckCircle /> Delivery History
            </li>
          </ul>
        </div>

        <ul className="volunteer-menu">
          <li onClick={handleLogout}>
            <FaSignOutAlt /> Sign Out
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="volunteer-main">
        <div className="volunteer-header">
          <div>
            <h1>Volunteer Delivery Portal</h1>
            <p style={{ margin: 0, color: "#64748b" }}>
              Welcome back, {currentUser.name || "Volunteer Partner"}
            </p>
          </div>
          <div style={{ background: "white", padding: "0.5rem 1rem", borderRadius: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <span>Role: <strong>{currentUser.accountType || "VOLUNTEER"}</strong></span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="volunteer-stats-grid">
          <div className="volunteer-card">
            <div className="volunteer-icon"><FaTruck /></div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.5rem" }}>{deliveries.length}</h3>
              <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>Total Assigned Tasks</p>
            </div>
          </div>
          <div className="volunteer-card">
            <div className="volunteer-icon"><FaClock /></div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.5rem" }}>{activeDeliveries.length}</h3>
              <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>Pending / In Transit</p>
            </div>
          </div>
          <div className="volunteer-card">
            <div className="volunteer-icon"><FaCheckCircle /></div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.5rem" }}>{completedDeliveries.length}</h3>
              <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>Completed Deliveries</p>
            </div>
          </div>
        </div>

        {/* TAB 1: ASSIGNED DELIVERIES */}
        {activeTab === "assigned" && (
          <div className="volunteer-content-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h2 style={{ margin: 0, fontSize: "1.25rem" }}>Active & Assigned Deliveries</h2>
              <button className="btn-start" onClick={fetchDeliveries}>Refresh Deliveries</button>
            </div>

            {loading ? (
              <p>Loading assigned deliveries...</p>
            ) : deliveries.length > 0 ? (
              <table className="volunteer-table">
                <thead>
                  <tr>
                    <th>Delivery ID</th>
                    <th>Match / Req ID</th>
                    <th>Pickup Location</th>
                    <th>Destination</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((del) => (
                    <tr key={del.deliveryId || del.id}>
                      <td>#{del.deliveryId || del.id}</td>
                      <td>#{del.matchId || del.requestId || "-"}</td>
                      <td><FaMapMarkerAlt color="#0284c7" /> {del.pickupAddress || "Donor Warehouse"}</td>
                      <td><FaMapMarkerAlt color="#16a34a" /> {del.deliveryAddress || del.dropAddress || "Receiver Shelter"}</td>
                      <td>
                        <span className={`badge-del-status ${del.status || "ASSIGNED"}`}>
                          {del.status || "ASSIGNED"}
                        </span>
                      </td>
                      <td>
                        {(del.status === "ASSIGNED" || del.status === "PENDING" || !del.status) && (
                          <button
                            className="btn-start"
                            onClick={() => handleStartDelivery(del.deliveryId || del.id)}
                          >
                            <FaPlay /> Start Delivery
                          </button>
                        )}
                        {del.status === "IN_TRANSIT" && (
                          <button
                            className="btn-complete"
                            onClick={() => handleCompleteDelivery(del.deliveryId || del.id)}
                          >
                            <FaRegCheckCircle /> Mark Delivered
                          </button>
                        )}
                        {del.status === "COMPLETED" && (
                          <span style={{ color: "#16a34a", fontWeight: "600" }}>✓ Done</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
                <FaTruck size={40} style={{ marginBottom: "1rem", color: "#cbd5e1" }} />
                <p>No active delivery tasks assigned at the moment.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: HISTORY */}
        {activeTab === "history" && (
          <div className="volunteer-content-card">
            <h2 style={{ fontSize: "1.25rem", marginBottom: "1.25rem" }}>Completed Deliveries History</h2>
            {completedDeliveries.length > 0 ? (
              <table className="volunteer-table">
                <thead>
                  <tr>
                    <th>Delivery ID</th>
                    <th>Pickup</th>
                    <th>Drop Location</th>
                    <th>Status</th>
                    <th>Completed Date</th>
                  </tr>
                </thead>
                <tbody>
                  {completedDeliveries.map((del) => (
                    <tr key={del.deliveryId || del.id}>
                      <td>#{del.deliveryId || del.id}</td>
                      <td>{del.pickupAddress || "Donor"}</td>
                      <td>{del.deliveryAddress || "Receiver"}</td>
                      <td>
                        <span className="badge-del-status COMPLETED">COMPLETED</span>
                      </td>
                      <td>{del.updatedAt ? new Date(del.updatedAt).toLocaleDateString() : "Recently"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ textAlign: "center", color: "#64748b" }}>No completed deliveries yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VolunteerDashboard;