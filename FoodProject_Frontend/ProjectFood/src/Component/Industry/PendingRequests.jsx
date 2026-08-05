import { useEffect, useState } from "react";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";

import { getPendingRequests, acceptRequest, rejectRequest } from "../../services/biogasService";

import "../../css/pendingRequests.css";

const PendingRequests = ({ selectedRequest, setSelectedRequest }) => {

    const [requests, setRequests] = useState([]);

    const loadRequests = () => {

        getPendingRequests()
            .then((res) => setRequests(res.data || []))
            .catch((err) => console.error("Error fetching pending requests:", err));
    };

    useEffect(() => {
        loadRequests();
    }, []);

    const viewDetails = (request) => {
        if (setSelectedRequest) {
            setSelectedRequest(request);
        }
    };

    const handleAccept = async (id) => {
        try {
            await acceptRequest(id);
            alert("Request #" + id + " accepted.");
            loadRequests();
        } catch (err) {
            console.error("Error accepting request:", err);
            alert(err.response?.data?.message || err.response?.data || "Unable to accept request.");
        }
    };

    const handleReject = async (id) => {
        try {
            await rejectRequest(id);
            alert("Request #" + id + " rejected.");
            loadRequests();
        } catch (err) {
            console.error("Error rejecting request:", err);
            alert(err.response?.data?.message || err.response?.data || "Unable to reject request.");
        }
    };

    return (

        <div className="pending-container">

            <div className="pending-header">

                <h2>
                    🚛 Pending Waste Pickups
                </h2>

                <button>
                    View All
                </button>

            </div>

            <div className="table-responsive">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Donor</th>
                            <th>Address</th>
                            <th>Meals</th>
                            <th>Status</th>
                            <th>Assigned Date</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            requests.length > 0 ? (

                                requests.map((request) => (

                                    <tr
                                        key={request.id || request.requestId}
                                        className={
                                            selectedRequest &&
                                            (selectedRequest.id || selectedRequest.requestId) ===
                                                (request.id || request.requestId)
                                                ? "row-selected"
                                                : ""
                                        }
                                    >

                                        <td>
                                            #{request.id || request.requestId}
                                        </td>

                                        <td>
                                            {request.donorName}
                                        </td>

                                        <td>
                                            {request.pickupAddress}
                                        </td>

                                        <td>
                                            {request.estimatedMeals}
                                        </td>

                                        <td>

                                            <span className="status">
                                                {request.status}
                                            </span>

                                        </td>

                                        <td>

                                            {
                                                request.assignedDate
                                                    ? new Date(request.assignedDate).toLocaleString()
                                                    : "-"
                                            }

                                        </td>

                                        <td className="action-buttons">

                                            <button
                                                className="view-btn"
                                                onClick={() => viewDetails(request)}
                                            >
                                                <FaEye />
                                            </button>

                                            <button
                                                className="accept-btn"
                                                onClick={() => handleAccept(request.id || request.requestId)}
                                            >
                                                <FaCheck />
                                                Accept
                                            </button>

                                            <button
                                                className="reject-btn"
                                                onClick={() => handleReject(request.id || request.requestId)}
                                            >
                                                <FaTimes />
                                                Reject
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="7">
                                        No Pending Waste Requests
                                    </td>
                                </tr>

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default PendingRequests;
