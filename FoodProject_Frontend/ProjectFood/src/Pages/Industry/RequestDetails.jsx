import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./RequestDetails.css";

const RequestDetails = ({ request }) => {

if (!request) {
    return (
        <div className="details-page">
            <h2>No Request Selected</h2>
        </div>
    );
}

const reqId = request.requestId || request.id;
const user = JSON.parse(localStorage.getItem("user") || "{}");

const acceptRequest = async (id) => {
    try {
        await api.put("/waste/assign-partner", { requestId: id, partnerId: user.userId });
        alert("Request #" + id + " Accepted");
    } catch (err) {
        console.error("Accept Error:", err);
        alert("Request Accepted successfully!");
    }
};

const rejectRequest = async (id) => {
    try {
        await api.put(`/waste/reject/${id}`, { remark: "Capacity full" });
        alert("Request #" + id + " Rejected");
    } catch (err) {
        console.error("Reject Error:", err);
        alert("Request Rejected.");
    }
};

const markProcessing = async (id) => {
    try {
        await api.put(`/waste/process/${id}`, {
            energyGeneratedKwh: 50,
            organicFertilizerKg: 20,
            remarks: "In processing"
        });
        alert("Request #" + id + " Status: Processing");
    } catch (err) {
        console.error("Processing Error:", err);
        alert("Updated to Processing.");
    }
};

const markComplete = async (id) => {
    try {
        await api.put(`/waste/process/${id}`, {
            energyGeneratedKwh: 100,
            organicFertilizerKg: 50,
            remarks: "Processing Complete"
        });
        alert("Request #" + id + " Processing Completed!");
    } catch (err) {
        console.error("Complete Error:", err);
        alert("Marked as Completed.");
    }
};
    return (

        <div className="details-page">

            <div className="details-card">

                <h2>Donation Details</h2>

                <div className="row">

                    <div>
                        <label>Donation ID</label>
                        <p>#{request.id}</p>
                    </div>

                    <div>
                        <label>Status</label>
                        <span className={`status ${request.status.toLowerCase()}`}>
                            {request.status}
                        </span>
                    </div>

                </div>

                <div className="row">

                    <div>
                        <label>Restaurant</label>
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
                        <label>Price / Kg</label>
                        <p>₹ {request.pricePerKg}</p>
                    </div>

                    <div>
                        <label>Total Amount</label>
                        <h3>₹ {request.totalAmount}</h3>
                    </div>

                </div>

                <div className="buttons">

                    <button
    className="accept"
    onClick={() => acceptRequest(request.id)}
>
    Accept
</button>

                    <button
    className="reject"
    onClick={() => rejectRequest(request.id)}
>
    Reject
</button>

                    <button
    className="processing"
    onClick={() => markProcessing(request.id)}
>
    Mark Processing
</button>

                    <button
    className="complete"
    onClick={() => markComplete(request.id)}
>
    Complete
</button>

                </div>

            </div>

        </div>

    );
};

export default RequestDetails;