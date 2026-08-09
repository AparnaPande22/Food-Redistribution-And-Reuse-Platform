import React, { useEffect, useMemo, useState } from "react";
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
  FaHistory,
  FaCog,
  FaLifeRing,
  FaBars,
  FaTimes,
  FaRoute,
  FaUserCircle,
} from "react-icons/fa";

function VolunteerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("assigned");
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setCurrentUser(JSON.parse(localStorage.getItem("user") || "{}"));
    } catch {
      setCurrentUser({});
    }
  }, []);

  useEffect(() => {
    if (currentUser?.userId) fetchDeliveries(currentUser.userId);
  }, [currentUser?.userId]);

  const fetchDeliveries = async (partnerId = currentUser?.userId) => {
    setLoading(true);
    setError("");
    try {
      const data = await volunteerService.getAssignedDeliveries(partnerId);
      setDeliveries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching volunteer deliveries:", err);
      setDeliveries([]);
      setError(err.response?.data?.message || "Unable to load assigned deliveries.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartDelivery = async (id) => {
    try {
      await volunteerService.startDelivery(id);
      await fetchDeliveries();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to start delivery.");
    }
  };

  const handleCompleteDelivery = async (id) => {
    try {
      await volunteerService.completeDelivery(id);
      await fetchDeliveries();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to complete delivery.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const activeDeliveries = useMemo(
    () => deliveries.filter((d) => ["ASSIGNED", "IN_PROGRESS", "PENDING"].includes(d.status)),
    [deliveries]
  );

  const completedDeliveries = useMemo(
    () => deliveries.filter((d) => ["COMPLETED", "DELIVERED"].includes(d.status)),
    [deliveries]
  );

  const initials = (currentUser.name || "Volunteer")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="dashboard donor-shell volunteer-shell">
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`sidebar ${sidebarOpen ? "show" : ""}`}>
        <div className="logo-area">
          <div className="logo-box">♻</div>
          <div>
            <h3>Beyond Waste</h3>
            <p>Volunteer Portal</p>
          </div>
          <button className="close-sidebar d-lg-none" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <button className="new-donation-btn volunteer-refresh" onClick={() => fetchDeliveries()}>
          <FaTruck />
          <span>Refresh Tasks</span>
        </button>

        <div className="menu">
          <button className={`menu-item ${activeTab === "assigned" ? "active" : ""}`} onClick={() => { setActiveTab("assigned"); setSidebarOpen(false); }}>
            <FaTruck /><span>Assigned Deliveries</span>
          </button>
          <button className={`menu-item ${activeTab === "history" ? "active" : ""}`} onClick={() => { setActiveTab("history"); setSidebarOpen(false); }}>
            <FaHistory /><span>Delivery History</span>
          </button>
          <button className={`menu-item ${activeTab === "route" ? "active" : ""}`} onClick={() => { setActiveTab("route"); setSidebarOpen(false); }}>
            <FaRoute /><span>Route Details</span>
          </button>
        </div>

        <div className="sidebar-bottom">
          <button className="menu-item" onClick={() => setActiveTab("settings")}><FaCog /><span>Settings</span></button>
          <button className="menu-item" onClick={() => setActiveTab("support")}><FaLifeRing /><span>Support</span></button>
          <button className="menu-item" onClick={handleLogout}><FaSignOutAlt /><span>Sign Out</span></button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="left-top">
            <button className="mobile-menu d-lg-none" onClick={() => setSidebarOpen(true)}><FaBars /></button>
            <div className="search-box volunteer-heading">
              <strong>Volunteer Delivery Center</strong>
            </div>
          </div>
          <div className="right-top">
            <div className="profile">
              <div className="profile-img">{initials}</div>
              <span>{currentUser.name || "Volunteer"}</span>
            </div>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-section">
            <h1>Welcome back, {currentUser.name || "Volunteer"}!</h1>
            <p>Manage your assigned food deliveries, pickup details, receiver information and delivery progress from one place.</p>
          </section>

          <div className="stats-grid">
            <div className="stats-card"><div className="stats-top"><div><small>Total Tasks</small><h2>{deliveries.length}</h2><span>Assigned to you</span></div><div className="stats-icon green"><FaTruck /></div></div></div>
            <div className="stats-card"><div className="stats-top"><div><small>Active Deliveries</small><h2>{activeDeliveries.length}</h2><span>Pending / in progress</span></div><div className="stats-icon darkgreen"><FaClock /></div></div></div>
            <div className="stats-card"><div className="stats-top"><div><small>Completed</small><h2>{completedDeliveries.length}</h2><span>Successfully delivered</span></div><div className="stats-icon peach"><FaCheckCircle /></div></div></div>
            <div className="stats-card"><div className="stats-top"><div><small>Current Role</small><h2 style={{fontSize:"25px"}}>VOLUNTEER</h2><span>{currentUser.city || "Beyond Waste partner"}</span></div><div className="stats-icon lightgreen"><FaUserCircle /></div></div></div>
          </div>

          {activeTab === "assigned" && (
            <div className="dashboard-card">
              <div className="section-header">
                <h4>My Assigned Deliveries</h4>
                <button className="volunteer-link-btn" onClick={() => fetchDeliveries()}>Refresh</button>
              </div>
              {error && <div className="volunteer-error">{error}</div>}
              {loading ? <p>Loading assigned deliveries...</p> : deliveries.length === 0 ? (
                <div className="empty-state"><FaTruck size={42}/><h3>No delivery assigned yet</h3><p>Once an admin assigns a volunteer to an approved match, the pickup and receiver details will appear here.</p></div>
              ) : (
                <div className="volunteer-table-wrap">
                  <table className="volunteer-table">
                    <thead><tr><th>Delivery</th><th>Donor / Pickup</th><th>Receiver / Drop</th><th>Food Match</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>
                      {deliveries.map((del) => {
                        const id = del.deliveryId || del.id;
                        return <tr key={id}>
                          <td>#{id}<br/><small>Match #{del.matchId || "-"}</small></td>
                          <td><strong>{del.donorName || "Donor"}</strong><br/><FaMapMarkerAlt /> {del.pickupAddress || "Address unavailable"}</td>
                          <td><strong>{del.receiverName || "Receiver"}</strong><br/><FaMapMarkerAlt /> {del.receiverAddress || "Address unavailable"}</td>
                          <td>Donation #{del.donationRequestId || "-"}<br/>Request #{del.receiverRequestId || "-"}</td>
                          <td><span className={`activity-badge ${del.status === "COMPLETED" ? "light" : "dark"}`}>{del.status || "ASSIGNED"}</span></td>
                          <td>
                            {(del.status === "ASSIGNED" || del.status === "PENDING") && <button className="volunteer-action-btn" onClick={() => handleStartDelivery(id)}><FaPlay /> Start</button>}
                            {del.status === "IN_PROGRESS" && <button className="volunteer-action-btn complete" onClick={() => handleCompleteDelivery(id)}><FaRegCheckCircle /> Delivered</button>}
                            {["COMPLETED","DELIVERED"].includes(del.status) && <span className="done-text">✓ Done</span>}
                          </td>
                        </tr>;
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "history" && (
            <div className="dashboard-card">
              <div className="section-header"><h4>Delivery History</h4></div>
              {completedDeliveries.length === 0 ? <div className="empty-state"><FaHistory size={38}/><p>No completed deliveries yet.</p></div> :
                <div className="volunteer-table-wrap"><table className="volunteer-table"><thead><tr><th>Delivery</th><th>Donor</th><th>Receiver</th><th>Completed</th></tr></thead><tbody>
                  {completedDeliveries.map((del) => <tr key={del.deliveryId || del.id}><td>#{del.deliveryId || del.id}</td><td>{del.donorName || "Donor"}<br/>{del.pickupAddress}</td><td>{del.receiverName || "Receiver"}<br/>{del.receiverAddress}</td><td>{del.deliveryTime ? new Date(del.deliveryTime).toLocaleString() : "Completed"}</td></tr>)}
                </tbody></table></div>}
            </div>
          )}

          {activeTab === "route" && (
            <div className="dashboard-card info-panel">
              <h4>Route Details</h4>
              <p>Each assigned delivery shows the donor pickup address and receiver drop address. Use those two locations to plan your route.</p>
              {activeDeliveries.map((del) => <div className="route-row" key={del.deliveryId || del.id}><strong>#{del.deliveryId}</strong><span>{del.pickupAddress || "Pickup"} → {del.receiverAddress || "Receiver"}</span></div>)}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="dashboard-card info-panel"><h4>Volunteer Settings</h4><p>Your account is currently signed in as <strong>{currentUser.name || "Volunteer"}</strong>.</p><p>Delivery assignments are automatically loaded for your volunteer account.</p></div>
          )}

          {activeTab === "support" && (
            <div className="dashboard-card info-panel"><h4>Support</h4><p>If a pickup address, receiver address or delivery assignment is missing, refresh the dashboard first. If it is still missing, contact the administrator managing the matching queue.</p></div>
          )}
        </div>
      </main>
    </div>
  );
}

export default VolunteerDashboard;
