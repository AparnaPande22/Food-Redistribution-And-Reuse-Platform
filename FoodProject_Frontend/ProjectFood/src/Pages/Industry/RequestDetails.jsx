import { useLocation, useNavigate } from "react-router-dom";
import "./RequestDetails.css";

const RequestDetails = () => {

    const navigate = useNavigate();

    const { state } = useLocation();

    const request = state;

    if (!request) {
        return (
            <div className="empty-page">
                <h2>No Request Selected</h2>

                <button onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
        );
    }

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
                        <p>{request.restaurantName}</p>
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

                    <button className="accept">
                        Accept
                    </button>

                    <button className="reject">
                        Reject
                    </button>

                    <button className="processing">
                        Mark Processing
                    </button>

                    <button className="complete">
                        Complete
                    </button>

                </div>

            </div>

        </div>

    );
};

export default RequestDetails;