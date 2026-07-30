import { useEffect, useState } from "react";
import { FaMoneyBillWave, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "../../css/paymentSummary.css";

const PaymentSummary = () => {
  const navigate = useNavigate();

  const [payment, setPayment] = useState({
    donorId: 1,
    donorName: "ABC Restaurant",

    industryId: 2,
    industryName: "Green Compost Industries",

    foodName: "Vegetable Waste",

    quantity: 50,

    pricePerKg: 10,

    amount: 500,

    pickupDate: "30 July 2026"
  });

  useEffect(() => {
    // Future API
    /*
    axios.get("/api/biogas/requests/1")
    .then(res=>{
        setPayment(res.data);
    });
    */
  }, []);

  const handlePayment = () => {
    navigate("/payment", {
      state: payment,
    });
  };

  return (
    <div className="payment-summary">

      <h2>💳 Payment Summary</h2>

      <div className="summary-row">
        <span>Donor</span>
        <strong>{payment.donorName}</strong>
      </div>

      <div className="summary-row">
        <span>Food Type</span>
        <strong>{payment.foodName}</strong>
      </div>

      <div className="summary-row">
        <span>Quantity</span>
        <strong>{payment.quantity} KG</strong>
      </div>

      <div className="summary-row">
        <span>Rate</span>
        <strong>₹{payment.pricePerKg}/KG</strong>
      </div>

      <div className="summary-row">
        <span>Pickup Date</span>
        <strong>{payment.pickupDate}</strong>
      </div>

      <hr />

      <div className="total-amount">

        <FaMoneyBillWave />

        <div>
          <p>Total Amount</p>
          <h1>₹{payment.amount}</h1>
        </div>

      </div>

      <button
        className="pay-now-btn"
        onClick={handlePayment}
      >
        Pay Now
        <FaArrowRight />
      </button>

    </div>
  );
};

export default PaymentSummary;