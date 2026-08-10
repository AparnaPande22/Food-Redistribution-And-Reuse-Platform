
import { useEffect, useState } from "react";
import {
    FaEye,
    FaCheck,
    FaTimes,
    FaCreditCard
} from "react-icons/fa";

import wasteService from "../../services/wasteService";

import "../../css/pendingRequests.css";

const PendingRequests = ({
    selectedRequest,
    setSelectedRequest,
    onPayNow
}) => {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [payingRequestId, setPayingRequestId] = useState(null);

    const currentUser = JSON.parse(
        localStorage.getItem("user") || "{}"
    );


    // ==========================================
    // LOAD REQUESTS
    // ==========================================
    const loadRequests = async () => {

        setLoading(true);

        try {

            const res =
                await wasteService.getWasteQueue();

            setRequests(
                Array.isArray(res.data)
                    ? res.data
                    : []
            );

        } catch (err) {

            console.error(
                "Error fetching pending requests:",
                err
            );

            setRequests([]);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadRequests();

    }, []);


    // ==========================================
    // VIEW DETAILS
    // ==========================================
    const viewDetails = (request) => {

        setSelectedRequest?.(request);

    };


    // ==========================================
    // ACCEPT
    // ==========================================
    const handleAccept = async (id) => {

        if (!currentUser.userId) {

            alert(
                "User session not found. Please login again."
            );

            return;

        }

        try {

            await wasteService.assignWastePartner(
                id,
                currentUser.userId
            );

            alert(
                `Request #${id} accepted successfully.`
            );

            await loadRequests();

        } catch (err) {

            console.error(
                "Error accepting request:",
                err
            );

            alert(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to accept request."
            );

        }

    };


    // ==========================================
    // REJECT
    // ==========================================
    const handleReject = async (id) => {

        const remark = window.prompt(
            "Reason for rejecting this pickup (optional):",
            ""
        );

        if (remark === null) {
            return;
        }

        try {

            await wasteService.rejectWastePickup(
                id,
                remark
            );

            alert(
                `Request #${id} rejected.`
            );

            await loadRequests();

        } catch (err) {

            console.error(
                "Error rejecting request:",
                err
            );

            alert(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to reject request."
            );

        }

    };


    // ==========================================
    // PAY NOW
    // ==========================================
    const handlePayNow = async (request) => {

        if (!onPayNow) {

            alert(
                "Payment service is not configured."
            );

            return;

        }

        try {

            setPayingRequestId(
                request.requestId
            );

            await onPayNow(request);

        } catch (err) {

            console.error(
                "Payment error:",
                err
            );

            alert(
                err.response?.data?.message ||
                "Unable to start payment."
            );

        } finally {

            setPayingRequestId(null);

        }

    };


    // ==========================================
    // PAYMENT STATUS
    // ==========================================
    const isPaid = (request) => {

        const status =
            request.paymentStatus ||
            request.payment_status;

        return (
            status &&
            status.toString().toUpperCase() === "PAID"
        );

    };


    return (

        <div className="pending-container">

            <div className="pending-header">

                <h2>
                    🚛 Pending Waste Pickups
                </h2>

                <button
                    onClick={loadRequests}
                    disabled={loading}
                >
                    {loading
                        ? "Refreshing..."
                        : "Refresh"
                    }
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
                            <th>Payment</th>
                            <th>Actions</th>

                        </tr>

                    </thead>


                    <tbody>

                        {loading ? (

                            <tr>

                                <td colSpan="7">
                                    Loading waste requests...
                                </td>

                            </tr>

                        ) : requests.length > 0 ? (

                            requests.map((request) => {

                                const requestId =
                                    request.requestId ||
                                    request.id;

                                return (

                                    <tr
                                        key={requestId}
                                        className={
                                            selectedRequest?.requestId ===
                                            requestId
                                                ? "row-selected"
                                                : ""
                                        }
                                    >

                                        <td>
                                            #{requestId}
                                        </td>


                                        <td>
                                            {
                                                request.donorName ||
                                                "Unknown"
                                            }
                                        </td>


                                        <td>
                                            {
                                                request.pickupAddress ||
                                                "N/A"
                                            }
                                        </td>


                                        <td>
                                            {
                                                request.estimatedMeals ??
                                                0
                                            }
                                        </td>


                                        <td>

                                            <span className="status">
                                                {request.status}
                                            </span>

                                        </td>


                                        {/* PAYMENT */}

                                        <td>

                                            {isPaid(request) ? (

                                                <span className="payment-paid">
                                                    ✓ Paid
                                                </span>

                                            ) : (

                                                <button
                                                    type="button"
                                                    className="pay-now-btn"
                                                    onClick={() =>
                                                        handlePayNow(
                                                            request
                                                        )
                                                    }
                                                    disabled={
                                                        payingRequestId ===
                                                        requestId
                                                    }
                                                >

                                                    <FaCreditCard />

                                                    <span>

                                                        {
                                                            payingRequestId ===
                                                            requestId
                                                                ? "Processing..."
                                                                : `Pay ₹${
                                                                    request.paymentAmount ??
                                                                    20
                                                                }`
                                                        }

                                                    </span>

                                                </button>

                                            )}

                                        </td>


                                        {/* ACTIONS */}

                                        <td className="action-buttons">

                                            <button
                                                type="button"
                                                className="view-btn"
                                                onClick={() =>
                                                    viewDetails(
                                                        request
                                                    )
                                                }
                                                title="View Details"
                                            >
                                                <FaEye />
                                            </button>


                                            <button
                                                type="button"
                                                className="accept-btn"
                                                onClick={() =>
                                                    handleAccept(
                                                        requestId
                                                    )
                                                }
                                                title="Accept Pickup"
                                            >
                                                <FaCheck />
                                                Accept
                                            </button>


                                            <button
                                                type="button"
                                                className="reject-btn"
                                                onClick={() =>
                                                    handleReject(
                                                        requestId
                                                    )
                                                }
                                                title="Reject Pickup"
                                            >
                                                <FaTimes />
                                                Reject
                                            </button>

                                        </td>

                                    </tr>

                                );

                            })

                        ) : (

                            <tr>

                                <td colSpan="7">
                                    No Pending Waste Requests
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default PendingRequests;