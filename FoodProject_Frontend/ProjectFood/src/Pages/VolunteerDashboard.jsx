import React, { useState, useEffect } from "react";
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
  FaUserCircle,
} from "react-icons/fa";

function VolunteerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("assigned"); // "assigned", "history"
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    setLoading(true);
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
    } catch (err) {
      console.error("Error starting delivery:", err);
    } finally {
      fetchDeliveries();
    }
  };

  const handleCompleteDelivery = async (id) => {
    try {
      await volunteerService.completeDelivery(id);
    } catch (err) {
      console.error("Error completing delivery:", err);
    } finally {
      fetchDeliveries();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // BUGFIX: the backend DeliveryStatus enum is ASSIGNED / IN_PROGRESS /
  // COMPLETED - this page was checking for "IN_TRANSIT", which never
  // matched anything, so "Mark Delivered" never appeared once a delivery
  // was started.
  const getId = (del) => del.deliveryId || del.id;

  const activeDeliveries = deliveries.filter(
    (d) => d.status === "ASSIGNED" || d.status === "IN_PROGRESS" || d.status === "PENDING"
  );
  const completedDeliveries = deliveries.filter(
    (d) => d.status === "COMPLETED" || d.status === "DELIVERED"
  );

  return (
    <div className="volunteer-dashboard">
      {/* Sidebar */}
      <aside className="volunteer-sidebar">
        <div>
          <div className="volunteer-brand">
            <span className="volunteer-brand-icon">♻</span>
            <div>
              <h3>Beyond Waste</h3>
              <p>Volunteer Portal</p>
            </div>
          </div>

          <ul className="volunteer-menu">
            <li
              className={activeTab === "assigned" ? "active" : ""}
              onClick={() => setActiveTab("assigned")}
            >
              <FaTruck /> <span>Assigned Deliveries</span>
            </li>
            <li
              className={activeTab === "history" ? "active" : ""}
              onClick={() => setActiveTab("history")}
            >
              <FaCheckCircle /> <span>Delivery History</span>
            </li>
          </ul>
        </div>

        <ul className="volunteer-menu volunteer-menu-bottom">
          <li onClick={handleLogout}>
            <FaSignOutAlt /> <span>Sign Out</span>
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <div className="volunteer-main">
        <div className="volunteer-header">
          <div>
            <h1>Volunteer Delivery Portal</h1>
            <p className="volunteer-subtitle">
              Welcome back, {currentUser.name || "Volunteer Partner"}
            </p>
          </div>

          {/* BUGFIX: this used to show "Role: VOLUNTEER" instead of the
              logged-in user's name - now matches the Donor/Receiver
              header pattern. */}
          <div className="volunteer-user-badge">
            <div className="volunteer-user-text">
              <h4>{currentUser.name || "Volunteer"}</h4>
              <p>{currentUser.accountType || "VOLUNTEER"}</p>
            </div>
            <div className="volunteer-avatar">
              {currentUser.name ? (
                currentUser.name.charAt(0).toUpperCase()
              ) : (
                <FaUserCircle />
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="volunteer-stats-grid">
          <div className="volunteer-card">
            <div className="volunteer-icon"><FaTruck /></div>
            <div>
              <h3>{deliveries.length}</h3>
              <p>Total Assigned Tasks</p>
            </div>
          </div>
          <div className="volunteer-card">
            <div className="volunteer-icon"><FaClock /></div>
            <div>
              <h3>{activeDeliveries.length}</h3>
              <p>Pending / In Transit</p>
            </div>
          </div>
          <div className="volunteer-card">
            <div className="volunteer-icon"><FaCheckCircle /></div>
            <div>
              <h3>{completedDeliveries.length}</h3>
              <p>Completed Deliveries</p>
            </div>
          </div>
        </div>

        {/* TAB 1: ASSIGNED DELIVERIES */}
        {activeTab === "assigned" && (
          <div className="volunteer-content-card">
            <div className="volunteer-content-header">
              <h2>Active &amp; Assigned Deliveries</h2>
              <button className="btn-outline-green" onClick={fetchDeliveries}>
                Refresh Deliveries
              </button>
            </div>

            {loading ? (
              <p>Loading assigned deliveries...</p>
            ) : activeDeliveries.length > 0 ? (
              <div className="volunteer-table-wrap">
                <table className="volunteer-table">
                  <thead>
                    <tr>
                      <th>Delivery ID</th>
                      <th>Food</th>
                      <th>Pickup (Donor)</th>
                      <th>Drop-off (Receiver)</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* BUGFIX: this previously mapped over the full
                        `deliveries` list, so completed deliveries showed
                        up here too, duplicating the History tab. Now
                        scoped to active/pending ones only. */}
                    {activeDeliveries.map((del) => (
                      <tr key={getId(del)}>
                        <td>#{getId(del)}</td>
                        <td>
                          {del.foodType || "Surplus Food"}
                          {del.estimatedMeals ? ` · ${del.estimatedMeals} meals` : ""}
                        </td>
                        <td>
                          <FaMapMarkerAlt color="#173a2d" />{" "}
                          {del.pickupAddress || "Donor Warehouse"}
                          {del.donorName ? (
                            <div className="volunteer-subtext">{del.donorName}</div>
                          ) : null}
                        </td>
                        <td>
                          <FaMapMarkerAlt color="#d45716" />{" "}
                          {del.deliveryAddress || del.dropAddress || "Receiver Shelter"}
                          {del.receiverName ? (
                            <div className="volunteer-subtext">{del.receiverName}</div>
                          ) : null}
                        </td>
                        <td>
                          <span className={`badge-del-status ${del.status || "ASSIGNED"}`}>
                            {(del.status || "ASSIGNED").replace("_", " ")}
                          </span>
                        </td>
                        <td>
                          {(del.status === "ASSIGNED" || del.status === "PENDING" || !del.status) && (
                            <button
                              className="btn-start"
                              onClick={() => handleStartDelivery(getId(del))}
                            >
                              <FaPlay /> Start Delivery
                            </button>
                          )}
                          {del.status === "IN_PROGRESS" && (
                            <button
                              className="btn-complete"
                              onClick={() => handleCompleteDelivery(getId(del))}
                            >
                              <FaRegCheckCircle /> Mark Delivered
                            </button>
                          )}
                          {del.status === "COMPLETED" && (
                            <span className="volunteer-done">✓ Done</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="volunteer-empty">
                <FaTruck size={40} />
                <p>No active delivery tasks assigned at the moment.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: HISTORY */}
        {activeTab === "history" && (
          <div className="volunteer-content-card">
            <h2 className="volunteer-content-title">Completed Deliveries History</h2>
            {completedDeliveries.length > 0 ? (
              <div className="volunteer-table-wrap">
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
                      <tr key={getId(del)}>
                        <td>#{getId(del)}</td>
                        <td>{del.pickupAddress || "Donor"}</td>
                        <td>{del.deliveryAddress || "Receiver"}</td>
                        <td>
                          <span className="badge-del-status COMPLETED">COMPLETED</span>
                        </td>
                        <td>
                          {del.deliveryTime
                            ? new Date(del.deliveryTime).toLocaleDateString()
                            : "Recently"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="volunteer-empty-text">No completed deliveries yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VolunteerDashboard;
