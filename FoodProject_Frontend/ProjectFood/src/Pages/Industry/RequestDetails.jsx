import {
    acceptRequest,
    rejectRequest,
    markProcessing,
    completeRequest
} from "../../services/biogasService";

import "./RequestDetails.css";

const RequestDetails = ({ request, onStatusChange }) => {

    if (!request) {
        return (
            <div className="details-page">
                <h2>No Request Selected</h2>
            </div>
        );
    }

    const reqId = request.id || request.requestId;

    const handleAccept = async () => {
        try {
            await acceptRequest(reqId);
            alert("Request #" + reqId + " accepted.");
            onStatusChange?.();
        } catch (err) {
            console.error("Accept error:", err);
            alert(err.response?.data?.message || err.response?.data || "Unable to accept request.");
        }
    };

    const handleReject = async () => {
        try {
            await rejectRequest(reqId);
            alert("Request #" + reqId + " rejected.");
            onStatusChange?.();
        } catch (err) {
            console.error("Reject error:", err);
            alert(err.response?.data?.message || err.response?.data || "Unable to reject request.");
        }
    };

    const handleMarkProcessing = async () => {
        try {
            await markProcessing(reqId);
            alert("Request #" + reqId + " marked as processing.");
            onStatusChange?.();
        } catch (err) {
            console.error("Processing error:", err);
            alert(err.response?.data?.message || err.response?.data || "Unable to update status.");
        }
    };

    const handleComplete = async () => {
        try {
            await completeRequest(reqId);
            alert("Request #" + reqId + " marked as completed.");
            onStatusChange?.();
        } catch (err) {
            console.error("Complete error:", err);
            alert(err.response?.data?.message || err.response?.data || "Unable to complete request.");
        }
    };

    return (

        <div className="details-page">

            <div className="details-card">

                <h2>Donation Details</h2>

                <div className="row">

                    <div>
                        <label>Donation ID</label>
                        <p>#{reqId}</p>
                    </div>

                    <div>
                        <label>Status</label>
                        <span className={`status ${(request.status || "").toLowerCase()}`}>
                            {request.status}
                        </span>
                    </div>

                </div>

                <div className="row">

                    <div>
                        <label>Donor</label>
                        <p>{request.donorName}</p>
                    </div>

                    <div>
                        <label>Contact</label>
                        <p>{request.phone}</p>
                    </div>

                </div>

                <div className="row">

                    <div>
                        <label>Food Type</label>
                        <p>{request.foodType}</p>
                    </div>

                    <div>
                        <label>Quantity</label>
                        <p>{request.quantity} Kg</p>
                    </div>

                </div>

                <div className="row">

                    <div>
                        <label>Address</label>
                        <p>{request.pickupAddress}</p>
                    </div>

                    <div>
                        <label>Estimated Meals</label>
                        <p>{request.estimatedMeals}</p>
                    </div>

                </div>

                <div className="buttons">

                    <button
                        className="accept"
                        onClick={handleAccept}
                    >
                        Accept
                    </button>

                    <button
                        className="reject"
                        onClick={handleReject}
                    >
                        Reject
                    </button>

                    <button
                        className="processing"
                        onClick={handleMarkProcessing}
                    >
                        Mark Processing
                    </button>

                    <button
                        className="complete"
                        onClick={handleComplete}
                    >
                        Complete
                    </button>

                </div>

            </div>

        </div>

    );
};

export default RequestDetails;
