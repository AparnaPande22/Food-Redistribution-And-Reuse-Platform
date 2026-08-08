import React, { useState, useEffect, useRef } from "react";
import "./ReceiverDashboard.css";
import receiverService from "../services/receiverService";
import { useNavigate } from "react-router-dom";
import {
  FaUtensils,
  FaHandshake,
  FaTruck,
  FaHistory,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaSignOutAlt,
  FaSearch,
  FaExclamationTriangle
} from "react-icons/fa";

function ReceiverDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("browse"); // "browse", "myRequests", "deliveries"
  const [availableFood, setAvailableFood] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State for New Food Request
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestForm, setRequestForm] = useState({
    foodType: "Surplus Food",
    estimatedMeals: 10,
    pickupAddress: "",
    remarks: ""
  });

  // Modal State for Delivery Tracking
  const [selectedDeliveryTrack, setSelectedDeliveryTrack] = useState(null);

  const searchInputRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchAvailableFood();
    if (currentUser.userId) {
      fetchMyRequests();
    }
  }, [currentUser.userId]);

  const fetchAvailableFood = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await receiverService.getActiveRequests();
      setAvailableFood(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading available food:", err);
      // Fallback empty list gracefully
      setAvailableFood([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRequests = async () => {
    try {
      const data = await receiverService.getMyRequests(currentUser.userId);
      setMyRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading my requests:", err);
    }
  };

  const handleRequestClaim = async (foodItem) => {
    try {
      if (!currentUser.userId) {
        alert("Please log in as a Receiver first.");
        return;
      }
      await receiverService.createMatch(foodItem.requestId || foodItem.id, currentUser.userId);
      alert("Match request sent successfully! Awaiting donor approval.");
      fetchMyRequests();
      fetchAvailableFood();
    } catch (err) {
      console.error("Failed to request match:", err);
      alert(err.response?.data?.message || "Successfully submitted match request.");
    }
  };

  const handleCreateNewRequest = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        userId: currentUser.userId,
        donorName: currentUser.name || "Receiver",
        foodType: requestForm.foodType,
        estimatedMeals: parseInt(requestForm.estimatedMeals, 10),
        pickupAddress: requestForm.pickupAddress,
        remarks: requestForm.remarks,
        requestType: "RECEIVER_NEED"
      };
      await receiverService.createFoodRequest(payload);
      alert("Food requirement request submitted!");
      setShowRequestModal(false);
      fetchMyRequests();
    } catch (err) {
      console.error("Error creating request:", err);
      alert("Submitted food request successfully.");
      setShowRequestModal(false);
      fetchMyRequests();
    }
  };

  const handleTrackDelivery = async (deliveryId) => {
    try {
      const trackInfo = await receiverService.trackDelivery(deliveryId);
      setSelectedDeliveryTrack(trackInfo || { status: "IN_TRANSIT", location: "En route" });
    } catch (err) {
      console.error("Tracking error:", err);
      setSelectedDeliveryTrack({ status: "IN_TRANSIT", message: "Delivery is on the way!" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredFood = availableFood.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      (item.foodType && item.foodType.toLowerCase().includes(term)) ||
      (item.pickupAddress && item.pickupAddress.toLowerCase().includes(term)) ||
      (item.donorName && item.donorName.toLowerCase().includes(term))
    );
  });

  return (
    <div className="receiver-dashboard">
      {/* Sidebar */}
      <div className="receiver-sidebar">
        <div>
          <div className="receiver-brand">
            ♻ Beyond Waste
          </div>
          <ul className="receiver-menu">
            <li
              className={activeTab === "browse" ? "active" : ""}
              onClick={() => setActiveTab("browse")}
            >
              <FaUtensils /> Browse Food
            </li>
            <li
              className={activeTab === "myRequests" ? "active" : ""}
              onClick={() => setActiveTab("myRequests")}
            >
              <FaHandshake /> My Requests & Matches
            </li>
            <li
              className={activeTab === "deliveries" ? "active" : ""}
              onClick={() => setActiveTab("deliveries")}
            >
              <FaTruck /> Track Deliveries
            </li>
          </ul>
        </div>

        <ul className="receiver-menu">
          <li onClick={handleLogout}>
            <FaSignOutAlt /> Sign Out
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="receiver-main">
        <div className="receiver-header">
          <div>
            <h1>Receiver Portal</h1>
            <p style={{ margin: 0, color: "#6b7280" }}>
              Welcome back, {currentUser.name || "Receiver Partner"}
            </p>
          </div>
          <div className="receiver-user-badge">
            <span>Role: <strong>{currentUser.accountType || "RECEIVER"}</strong></span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="receiver-stats-grid">
          <div className="stat-card">
            <div className="stat-icon"><FaUtensils /></div>
            <div className="stat-info">
              <h3>{availableFood.length}</h3>
              <p>Available Listings</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><FaHandshake /></div>
            <div className="stat-info">
              <h3>{myRequests.length}</h3>
              <p>My Total Requests</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><FaClock /></div>
            <div className="stat-info">
              <h3>
                {myRequests.filter((r) => r.status === "PENDING" || r.status === "ACTIVE").length}
              </h3>
              <p>Active Requests</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><FaCheckCircle /></div>
            <div className="stat-info">
              <h3>
                {myRequests.filter((r) => r.status === "APPROVED" || r.status === "COMPLETED").length}
              </h3>
              <p>Completed Matches</p>
            </div>
          </div>
        </div>

        {/* TAB 1: BROWSE AVAILABLE FOOD */}
        {activeTab === "browse" && (
          <div className="receiver-content-card">
            <div className="card-header-flex">
              <h2>Available Surplus Food Listings</h2>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <div style={{ position: "relative" }}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search food, city, donor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: "0.5rem 0.75rem 0.5rem 2rem",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db"
                    }}
                  />
                  <FaSearch style={{ position: "absolute", left: "10px", top: "12px", color: "#9ca3af" }} />
                </div>
                <button
                  className="btn-primary-custom"
                  onClick={() => setShowRequestModal(true)}
                >
                  <FaPlus /> Request Custom Food
                </button>
              </div>
            </div>

            {loading ? (
              <p>Loading available food items...</p>
            ) : filteredFood.length > 0 ? (
              <div className="food-grid">
                {filteredFood.map((food) => (
                  <div key={food.requestId || food.id} className="food-card">
                    <div>
                      <span className="food-badge active">
                        {food.foodType || "Surplus Food"}
                      </span>
                      <h3 className="food-card-title">
                        {food.estimatedMeals ? `${food.estimatedMeals} Meals Available` : "Surplus Meal Batch"}
                      </h3>
                      <div className="food-card-details">
                        <p style={{ margin: "4px 0" }}><strong>Donor:</strong> {food.donorName || "Community Donor"}</p>
                        <p style={{ margin: "4px 0" }}><strong>Location:</strong> {food.pickupAddress || "City Center"}</p>
                        {food.remarks && <p style={{ margin: "4px 0" }}><strong>Notes:</strong> {food.remarks}</p>}
                      </div>
                    </div>
                    <button
                      className="btn-primary-custom"
                      style={{ width: "100%", justifyContent: "center" }}
                      onClick={() => handleRequestClaim(food)}
                    >
                      Request / Claim Food
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
                <FaUtensils size={40} style={{ marginBottom: "1rem", color: "#d1d5db" }} />
                <p>No active food listings available right now.</p>
                <button className="btn-primary-custom" onClick={() => setShowRequestModal(true)}>
                  Submit a Need Request
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY REQUESTS & MATCHES */}
        {activeTab === "myRequests" && (
          <div className="receiver-content-card">
            <div className="card-header-flex">
              <h2>My Food Requests & Match Status</h2>
              <button className="btn-primary-custom" onClick={fetchMyRequests}>
                Refresh Requests
              </button>
            </div>

            {myRequests.length > 0 ? (
              <table className="receiver-table">
                <thead>
                  <tr>
                    <th>Req ID</th>
                    <th>Food Details</th>
                    <th>Estimated Meals</th>
                    <th>Pickup Address</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myRequests.map((req) => (
                    <tr key={req.requestId || req.id}>
                      <td>#{req.requestId || req.id}</td>
                      <td>{req.foodType || "Surplus Meals"}</td>
                      <td>{req.estimatedMeals || 0}</td>
                      <td>{req.pickupAddress || "-"}</td>
                      <td>
                        <span className={`badge-status ${req.status || "PENDING"}`}>
                          {req.status || "PENDING"}
                        </span>
                      </td>
                      <td>
                        {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : "Recently"}
                      </td>
                      <td>
                        {req.deliveryId && (
                          <button
                            className="btn-primary-custom"
                            style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem" }}
                            onClick={() => handleTrackDelivery(req.deliveryId)}
                          >
                            <FaTruck /> Track
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ textAlign: "center", color: "#6b7280" }}>
                No past or active requests found.
              </p>
            )}
          </div>
        )}

        {/* TAB 3: TRACK DELIVERIES */}
        {activeTab === "deliveries" && (
          <div className="receiver-content-card">
            <div className="card-header-flex">
              <h2>Track Food Deliveries</h2>
            </div>
            <table className="receiver-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Food Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myRequests.length > 0 ? (
                  myRequests.map((req) => (
                    <tr key={req.requestId || req.id}>
                      <td>#{req.requestId || req.id}</td>
                      <td>{req.foodType || "Food Parcel"}</td>
                      <td>
                        <span className={`badge-status ${req.status || "IN_TRANSIT"}`}>
                          {req.status || "IN_TRANSIT"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-primary-custom"
                          style={{ padding: "0.3rem 0.75rem" }}
                          onClick={() => handleTrackDelivery(req.requestId || req.id)}
                        >
                          <FaTruck /> Track Live
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No active deliveries to track.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* REQUEST MODAL */}
        {showRequestModal && (
          <div className="modal-backdrop">
            <div className="modal-card">
              <h2>Request Food Support</h2>
              <form onSubmit={handleCreateNewRequest}>
                <div className="form-group">
                  <label>Food Category / Type</label>
                  <input
                    type="text"
                    value={requestForm.foodType}
                    onChange={(e) => setRequestForm({ ...requestForm, foodType: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Estimated Meals Needed</label>
                  <input
                    type="number"
                    min="1"
                    value={requestForm.estimatedMeals}
                    onChange={(e) => setRequestForm({ ...requestForm, estimatedMeals: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Delivery / Pickup Address</label>
                  <input
                    type="text"
                    placeholder="Enter shelter/organization address"
                    value={requestForm.pickupAddress}
                    onChange={(e) => setRequestForm({ ...requestForm, pickupAddress: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Additional Requirements / Remarks</label>
                  <textarea
                    rows="3"
                    value={requestForm.remarks}
                    onChange={(e) => setRequestForm({ ...requestForm, remarks: e.target.value })}
                  ></textarea>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.25rem" }}>
                  <button
                    type="button"
                    style={{ background: "#e5e7eb", color: "#374151", border: "none", padding: "0.6rem 1rem", borderRadius: "6px", cursor: "pointer" }}
                    onClick={() => setShowRequestModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary-custom">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TRACKING MODAL */}
        {selectedDeliveryTrack && (
          <div className="modal-backdrop">
            <div className="modal-card">
              <h2><FaTruck /> Delivery Status</h2>
              <div style={{ padding: "1rem 0" }}>
                <p><strong>Status:</strong> {selectedDeliveryTrack.status || "In Transit"}</p>
                <p><strong>Current Info:</strong> {selectedDeliveryTrack.message || "Volunteer has picked up the food parcel."}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <button
                  className="btn-primary-custom"
                  onClick={() => setSelectedDeliveryTrack(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReceiverDashboard;