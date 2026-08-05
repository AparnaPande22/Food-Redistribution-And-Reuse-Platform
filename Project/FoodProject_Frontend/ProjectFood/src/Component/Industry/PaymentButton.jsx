import { useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import "../../css/paymentButton.css";

const PaymentButton = ({ request }) => {
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate("/payment", {
      state: {
        donorId: request.donorId,
        donorName: request.donorName,
import { useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import "../../css/paymentButton.css";

const PaymentButton = ({ request }) => {
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate("/payment", {
      state: {
        donorId: request.donorId,
        donorName: request.donorName,

        industryId: request.industryId,
        industryName: request.industryName,

        foodName: request.foodName,

        quantity: request.quantity,

        pricePerKg: request.pricePerKg,

        amount: request.amount,

        pickupDate: request.pickupDate
      },
    });
  };

  return (
    <button
      className="payment-btn"
      onClick={handlePayment}
    >
      <FaCreditCard />
      Pay Now
    </button>
  );
};

export default PaymentButton;
        industryId: request.industryId,
        industryName: request.industryName,

        foodName: request.foodName,

        quantity: request.quantity,

        pricePerKg: request.pricePerKg,

        amount: request.amount,

        pickupDate: request.pickupDate
      },
    });
  };

  return (
    <button
      className="payment-btn"
      onClick={handlePayment}
    >
      <FaCreditCard />
      Pay Now
    </button>
  );
};

export default PaymentButton;