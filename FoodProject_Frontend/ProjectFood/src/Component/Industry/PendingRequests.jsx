import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEye,
  FaCheck,
  FaTimes,
  FaCreditCard,
} from "react-icons/fa";

import "../../css/pendingRequests.css";

const PendingRequests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
   axios.get("http://localhost:8080/food/api/waste/waste_queue")
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const viewDetails = (request) => {
    navigate("/industry/request-details", {
      state: request,
    });
  };

  const acceptRequest = (id) => {
    alert("Accept Request : " + id);

    // axios.put(`http://localhost:8080/food/api/biogas/requests/${id}/accept`);
  };

  const rejectRequest = (id) => {
    alert("Reject Request : " + id);

    // axios.put(`http://localhost:8080/food/api/biogas/requests/${id}/reject`);
  };

  const payNow = (request) => {
    navigate("/payment", {
      state: request,
    });
  };

  return (
    <div className="pending-container">
      <div className="pending-header">
        <h2>📋 Pending Requests</h2>

        <button>View All</button>
      </div>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Donor</th>
              <th>Food</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Pickup</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.requestId}>
                <td>#{request.requestId}</td>

                <td>{request.donorName}</td>

                <td>"Waste Food"</td>

                <td>{request.estimatedMeals} KG</td>

                <td>₹{"--"}</td>

                <td>{request.wasteAssignedDate}</td>

                <td className="action-buttons">
                  <button
                    className="view-btn"
                    onClick={() => viewDetails(request)}
                  >
                    <FaEye />
                  </button>

                  <button
                    className="accept-btn"
                    onClick={() => acceptRequest(request.requestId)}
                  >
                    <FaCheck />
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => rejectRequest(request.requestId)}
                  >
                    <FaTimes />
                  </button>

                  <button
                    className="pay-btn"
                    onClick={() => payNow(request)}
                  >
                    <FaCreditCard />
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRequests;