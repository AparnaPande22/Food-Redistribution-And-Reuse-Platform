import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    // Later replace with API

    /*
    axios.get("http://localhost:8080/api/biogas/requests/pending")
      .then(res => {
          setRequests(res.data);
      });
    */

    setRequests([
      {
        id: 101,
        donorId: 1,
        donorName: "ABC Restaurant",
        industryId: 2,
        industryName: "Green Compost Industries",
        foodName: "Vegetable Waste",
        quantity: 50,
        pricePerKg: 10,
        amount: 500,
        pickupDate: "30 Jul 2026",
        city: "Pune",
      },
      {
        id: 102,
        donorId: 3,
        donorName: "Hotel Taj",
        industryId: 2,
        industryName: "Green Compost Industries",
        foodName: "Fruit Waste",
        quantity: 80,
        pricePerKg: 8,
        amount: 640,
        pickupDate: "31 Jul 2026",
        city: "Mumbai",
      },
      {
        id: 103,
        donorId: 4,
        donorName: "Food Plaza",
        industryId: 2,
        industryName: "Green Compost Industries",
        foodName: "Bakery Waste",
        quantity: 30,
        pricePerKg: 12,
        amount: 360,
        pickupDate: "01 Aug 2026",
        city: "Nagpur",
      },
    ]);
  }, []);

  const viewDetails = (request) => {
    navigate("/industry/request-details", {
      state: request,
    });
  };

  const acceptRequest = (id) => {
    alert("Accept Request : " + id);

    // PUT /api/biogas/requests/{id}/accept
  };

  const rejectRequest = (id) => {
    alert("Reject Request : " + id);

    // PUT /api/biogas/requests/{id}/reject
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

              <tr key={request.id}>

                <td>#{request.id}</td>

                <td>{request.donorName}</td>

                <td>{request.foodName}</td>

                <td>{request.quantity} KG</td>

                <td>₹{request.amount}</td>

                <td>{request.pickupDate}</td>

                <td className="action-buttons">

                  <button
                    className="view-btn"
                    onClick={() => viewDetails(request)}
                  >
                    <FaEye />
                  </button>

                  <button
                    className="accept-btn"
                    onClick={() => acceptRequest(request.id)}
                  >
                    <FaCheck />
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => rejectRequest(request.id)}
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