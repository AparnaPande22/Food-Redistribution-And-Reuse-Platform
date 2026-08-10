import { useEffect, useState } from "react";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";

// BUGFIX: previously imported acceptRequest/rejectRequest/getPendingRequests
// from biogasService.js, which call "/api/biogas/requests/..." - none of
// which exist on the backend. Now wired to the real waste queue.
import wasteService from "../../services/wasteService";

import "../../css/pendingRequests.css";

const PendingRequests = ({ selectedRequest, setSelectedRequest }) => {

    const [requests, setRequests] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    const loadRequests = () => {

        wasteService.getWasteQueue()
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
            // "Accept" = claim this waste pickup for myself.
            await wasteService.assignWastePartner(id, currentUser.userId);
            alert("Request #" + id + " accepted.");
            loadRequests();
        } catch (err) {
            console.error("Error accepting request:", err);
            alert(err.response?.data?.message || err.response?.data || "Unable to accept request.");
        }
    };

    const handleReject = async (id) => {
        const remark = window.prompt("Reason for rejecting this pickup (optional):", "");
        if (remark === null) return; // user cancelled

        try {
            await wasteService.rejectWastePickup(id, remark);
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

                <button onClick={loadRequests}>
                    Refresh
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
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            requests.length > 0 ? (

                                requests.map((request) => (

                                    <tr
                                        key={request.requestId}
                                        className={
                                            selectedRequest?.requestId === request.requestId
                                                ? "row-selected"
                                                : ""
                                        }
                                    >

                                        <td>
                                            #{request.requestId}
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

                                        <td className="action-buttons">

                                            <button
                                                className="view-btn"
                                                onClick={() => viewDetails(request)}
                                            >
                                                <FaEye />
                                            </button>

                                            <button
                                                className="accept-btn"
                                                onClick={() => handleAccept(request.requestId)}
                                            >
                                                <FaCheck />
                                                Accept
                                            </button>

                                            <button
                                                className="reject-btn"
                                                onClick={() => handleReject(request.requestId)}
                                            >
                                                <FaTimes />
                                                Reject
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="6">
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
