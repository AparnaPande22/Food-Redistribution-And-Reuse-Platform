import { FaMoneyBillWave, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "../../css/paymentSummary.css";

// BUGFIX: this component previously ignored its `request` prop entirely
// and read from `localStorage.getItem("selectedRequest")`, which is
// never set anywhere in the app - so this card was permanently stuck on
// "No payment selected." It also assumed pricing fields (pricePerKg,
// amount, foodName) that don't exist anywhere on the real waste data -
// there's no pricing/payment logic wired into the waste pipeline, so
// those are no longer invented here. This now shows the real pickup
// info for whatever is selected in Pending Requests, and only offers
// "Proceed to Payment" once a rate has actually been agreed elsewhere.
const PaymentSummary = ({ request }) => {
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate("/payment", { state: request });
  };

  if (!request) {
    return (
      <div className="payment-summary">
        <h2>💳 Pickup Summary</h2>
        <p>Select a pending pickup to see its summary here.</p>
      </div>
    );
  }

  return (
    <div className="payment-summary">

      <h2>💳 Pickup Summary</h2>

      <div className="summary-row">
        <span>Donor</span>
        <strong>{request.donorName}</strong>
      </div>

      <div className="summary-row">
        <span>Estimated Meals</span>
        <strong>{request.estimatedMeals}</strong>
      </div>

      <div className="summary-row">
        <span>Pickup Address</span>
        <strong>{request.pickupAddress}</strong>
      </div>

      <div className="summary-row">
        <span>Status</span>
        <strong>{request.status}</strong>
      </div>

      <hr />

      <button
        className="pay-now-btn"
        onClick={handlePayment}
      >
        <FaMoneyBillWave />
        Proceed to Payment
        <FaArrowRight />
      </button>

    </div>
  );
}

export default PaymentSummary;
