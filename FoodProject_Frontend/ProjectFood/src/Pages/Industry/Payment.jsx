import { useLocation } from "react-router-dom";
import api from "../../services/api";
import "../../css/payment.css";


const Payment = () => {

    const location = useLocation();

    const paymentData = location.state;


    if (!paymentData) {

        return (
            <div className="payment-error">
                Payment information not found
            </div>
        );

    }



    const makePayment = async () => {

        try {


            const response = await api.post(
    "https://localhost:7186/api/payment/create-order",
    {
        donorId: paymentData.donorId,
        industryId: paymentData.industryId,
        amount: paymentData.amount
    }
);



            const options = {


                key: response.data.key,


                amount: response.data.amount * 100,


                currency: "INR",


                name: "Beyond Waste",


                description: "Waste Food Payment",


                order_id: response.data.orderId,



                prefill: {

                    name: paymentData.donorName,

                    email: paymentData.email || "donor@gmail.com",

                    contact: paymentData.phone || "9999999999"

                },



                notes: {

                    donorId: paymentData.donorId,

                    industryId: paymentData.industryId

                },



                handler: function (payment) {

                    verifyPayment(payment);

                },


                theme: {

                    color: "#064e3b"

                }


            };



            if (!window.Razorpay) {

                alert("Razorpay SDK not loaded");

                return;

            }



            const razorpay = new window.Razorpay(options);


            razorpay.open();



        }

        catch (error) {

            console.log("Payment Error:", error);

            alert("Unable to start payment");

        }

    };





    const verifyPayment = async (payment) => {


        try {


            await api.post(

                "https://localhost:7186/api/payment/verify",

                {

                    orderId: payment.razorpay_order_id,


                    paymentId: payment.razorpay_payment_id,


                    signature: payment.razorpay_signature

                }

            );


            alert("Payment Successful");


        }

        catch(error){

            console.log("Verification Error:", error);

            alert("Payment verification failed");

        }


    };







    return (

        <div className="payment-page">


            <div className="payment-header">


                <h2>
                    🌱 Beyond Waste
                </h2>


                <span>
                    Secure Payment
                </span>


            </div>





            <div className="payment-wrapper">



                <div className="payment-card">


                    <h1>
                        Pay Donor
                    </h1>



                    <p className="subtitle">

                        Support sustainable food recovery

                    </p>




                    <div className="donor-box">


                        <p>
                            Donor
                        </p>


                        <h3>
                            {paymentData.donorName}
                        </h3>


                    </div>





                    <div className="amount-box">


                        <span>
                            Payment Amount
                        </span>


                        <h2>
                            ₹{paymentData.amount}
                        </h2>


                    </div>





                    <button

                        className="pay-button"

                        onClick={makePayment}

                    >

                        Proceed to Pay →

                    </button>



                </div>





                <div className="impact-card">


                    <div className="image-overlay">


                        <h3>
                            IMPACT METRIC
                        </h3>


                        <h1>
                            Reduce Food Waste
                        </h1>


                        <p>
                            Every contribution helps convert
                            waste into renewable resources.
                        </p>


                    </div>


                </div>



            </div>





            <footer>

                © 2026 Beyond Waste · Privacy · Terms

            </footer>



        </div>

    );

};


export default Payment;