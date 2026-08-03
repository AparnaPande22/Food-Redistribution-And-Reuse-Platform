import { useEffect, useState } from "react";
import { getPendingRequests, approveRequest, rejectRequest } from "../../services/adminService";
import "./dashboard.css";

function PendingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getPendingRequests();
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Error loading pending requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveRequest(id);
      loadRequests();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to approve request");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRequest(id);
      loadRequests();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reject request");
    }
  };

  return (
    <div className="table-card">
      <h2>Pending Requests Review</h2>

      {loading ? (
        <p>Loading pending requests...</p>
      ) : requests.length === 0 ? (
        <p>No pending requests waiting for approval.</p>
      ) : (
        requests.map((req) => (
          <div className="request-card" key={req.id}>
            <div>
              <h4>{req.title || req.foodType || `Request #${req.id}`}</h4>
              <p>{req.quantity} {req.unit || "meals/kg"} - {req.pickupLocation}</p>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => handleApprove(req.id)} className="approve-btn">
                Approve
              </button>
              <button onClick={() => handleReject(req.id)} className="reject-btn">
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PendingRequests;
