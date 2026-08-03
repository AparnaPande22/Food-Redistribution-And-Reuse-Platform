import { useEffect, useState } from "react";
import { getPendingRequests, approveRequest, rejectRequest } from "../../services/adminService";
import "./dashboard.css";

function PendingRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getPendingRequests();
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading pending requests:", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveRequest(id);
      alert(`Request #${id} Approved`);
      loadRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRequest(id);
      alert(`Request #${id} Rejected`);
      loadRequests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="table-card">
      <h2>Pending Food Requests</h2>

      {requests.length > 0 ? (
        requests.map((request, index) => (
          <div className="request-card" key={request.requestId || request.id || index}>
            <div>
              <h4>{request.donorName || request.foodType || "Food Request"}</h4>
              <p>{request.estimatedMeals || 0} Meals Required</p>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="approve-btn" onClick={() => handleApprove(request.requestId || request.id)}>
                Approve
              </button>
              <button className="reject-btn" onClick={() => handleReject(request.requestId || request.id)}>
                Reject
              </button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>No pending requests requiring action.</p>
      )}
    </div>
  );
}

export default PendingRequests;