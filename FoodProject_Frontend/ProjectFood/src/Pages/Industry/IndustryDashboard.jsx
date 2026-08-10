import { useState } from "react";

import Sidebar from "../../Component/Industry/Sidebar";
import Navbar from "../../Component/Industry/Navbar";
import DashboardCards from "../../Component/Industry/DashboardCards";
import PendingRequests from "../../Component/Industry/PendingRequests";
import TodayPickups from "../../Component/Industry/TodayPickups";
import MonthOverview from "../../Component/Industry/MonthOverview";
import EnvironmentCards from "../../Component/Industry/EnvironmentCards";
import RequestDetails from "../../Pages/Industry/RequestDetails";
import PaymentSummary from "../../Component/Industry/PaymentSummary";
import RequestProgress from "../../Component/Industry/RequestProgress";

import {
    createOrder,
    verifyPayment
} from "../../services/paymentService";

import "../../css/industryDashboard.css";
import "../../css/industryResponsive.css";

const IndustryDashboard = () => {

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [paymentLoading, setPaymentLoading] = useState(false);


    // =========================================================
    // REFRESH DASHBOARD
    // =========================================================

    const handleStatusChange = () => {

        setSelectedRequest(null);

        setRefreshKey((key) => key + 1);
    };


    // =========================================================
    // LOAD RAZORPAY SCRIPT
    // =========================================================

    const loadRazorpay = () => {

        return new Promise((resolve, reject) => {

            // Already loaded
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement("script");

            script.src =
                "https://checkout.razorpay.com/v1/checkout.js";

            script.async = true;

            script.onload = () => {
                resolve(true);
            };

            script.onerror = () => {
                reject(
                    new Error(
                        "Unable to load Razorpay. Please check your internet connection."
                    )
                );
            };

            document.body.appendChild(script);
        });
    };


    // =========================================================
    // PAY NOW
    // =========================================================

    const handlePayNow = async (request) => {

        if (paymentLoading) {
            return;
        }

        try {

            console.log(
                "Starting payment for request:",
                request
            );


            // -------------------------------------------------
            // VALIDATE REQUEST
            // -------------------------------------------------

            if (!request) {

                alert("No waste request selected.");

                return;
            }


            // -------------------------------------------------
            // REQUEST ID
            // -------------------------------------------------

            const requestId =
                request.requestId;

            if (!requestId) {

                console.error(
                    "Request ID missing:",
                    request
                );

                alert(
                    "Request ID is missing from the waste request."
                );

                return;
            }


            // -------------------------------------------------
            // DONOR ID
            // -------------------------------------------------

            const donorId =
                request.donorId;

            if (!donorId) {

                console.error(
                    "Donor ID missing from API response:",
                    request
                );

                alert(
                    "Donor information is missing. " +
                    "Please make sure WasteResponseDTO returns donorId."
                );

                return;
            }


            // -------------------------------------------------
            // CURRENT LOGGED-IN INDUSTRY USER
            // -------------------------------------------------

            const currentUser = JSON.parse(
                localStorage.getItem("user") || "{}"
            );

            const industryId =
                currentUser.userId ||
                currentUser.id;

            if (!industryId) {

                alert(
                    "Industry user information is missing. Please login again."
                );

                return;
            }


            // -------------------------------------------------
            // PAYMENT AMOUNT
            // -------------------------------------------------

            const amount =
                Number(request.paymentAmount) > 0
                    ? Number(request.paymentAmount)
                    : 20;


            console.log("Payment details:", {
                requestId,
                donorId,
                industryId,
                amount
            });


            setPaymentLoading(true);


            // -------------------------------------------------
            // LOAD RAZORPAY
            // -------------------------------------------------

            await loadRazorpay();


            // -------------------------------------------------
            // CREATE PAYMENT ORDER
            // -------------------------------------------------

            const paymentData = {

                requestId: Number(requestId),

                donorId: Number(donorId),

                industryId: Number(industryId),

                amount: Number(amount),

                currency: "INR"
            };


            console.log(
                "Sending payment order:",
                paymentData
            );


            const order =
                await createOrder(paymentData);


            console.log(
                "Payment order created:",
                order
            );


            if (!order) {

                throw new Error(
                    "Payment service returned an empty response."
                );
            }


            // -------------------------------------------------
            // RAZORPAY ORDER ID
            // -------------------------------------------------

            const orderId =
                order.orderId ||
                order.id;

            if (!orderId) {

                console.error(
                    "Invalid payment order response:",
                    order
                );

                throw new Error(
                    "Razorpay order ID was not returned by payment service."
                );
            }


            // -------------------------------------------------
            // RAZORPAY KEY
            // -------------------------------------------------

            const razorpayKey =
                order.key ||
                order.razorpayKey;


            if (!razorpayKey) {

                console.error(
                    "Razorpay key missing:",
                    order
                );

                throw new Error(
                    "Razorpay key was not returned by payment service."
                );
            }


            // -------------------------------------------------
            // RAZORPAY OPTIONS
            // -------------------------------------------------

            const options = {

                key: razorpayKey,

                amount:
                    Number(order.amount || amount) * 100,

                currency:
                    order.currency || "INR",

                name:
                    "Beyond Waste",

                description:
                    `Waste Pickup Payment #${requestId}`,

                order_id:
                    orderId,


                // ---------------------------------------------
                // CUSTOMER INFORMATION
                // ---------------------------------------------

                prefill: {

                    name:
                        currentUser.name || "",

                    email:
                        currentUser.email || "",

                    contact:
                        currentUser.phone || ""
                },


                theme: {

                    color: "#173a2d"
                },


                // ---------------------------------------------
                // PAYMENT SUCCESS
                // ---------------------------------------------

                handler: async function (razorpayResponse) {

                    try {

                        console.log(
                            "Razorpay payment response:",
                            razorpayResponse
                        );


                        // -------------------------------------
                        // VERIFY PAYMENT
                        // -------------------------------------

                        const verificationData = {

                            orderId:
                                razorpayResponse
                                    .razorpay_order_id,

                            paymentId:
                                razorpayResponse
                                    .razorpay_payment_id,

                            signature:
                                razorpayResponse
                                    .razorpay_signature
                        };


                        console.log(
                            "Verifying payment:",
                            verificationData
                        );


                        const verification =
                            await verifyPayment(
                                verificationData
                            );


                        console.log(
                            "Payment verification response:",
                            verification
                        );


                        // -------------------------------------
                        // SUCCESS
                        // -------------------------------------

                        alert(
                            "Payment completed successfully!"
                        );


                        // Refresh dashboard
                        handleStatusChange();


                    } catch (error) {

                        console.error(
                            "Payment verification failed:",
                            error
                        );


                        const message =
                            error.response?.data?.message ||
                            error.response?.data ||
                            error.message ||
                            "Payment verification failed.";


                        alert(message);
                    }
                    finally {

                        setPaymentLoading(false);
                    }
                },


                // ---------------------------------------------
                // PAYMENT WINDOW CLOSED
                // ---------------------------------------------

                modal: {

                    ondismiss: () => {

                        console.log(
                            "Razorpay payment window closed."
                        );

                        setPaymentLoading(false);
                    }
                }
            };


            // -------------------------------------------------
            // OPEN RAZORPAY
            // -------------------------------------------------

            const razorpay =
                new window.Razorpay(options);


            // -------------------------------------------------
            // PAYMENT FAILED
            // -------------------------------------------------

            razorpay.on(
                "payment.failed",
                (response) => {

                    console.error(
                        "Razorpay payment failed:",
                        response.error
                    );


                    alert(
                        response.error?.description ||
                        "Payment failed."
                    );


                    setPaymentLoading(false);
                }
            );


            razorpay.open();


        } catch (error) {

            console.error(
                "Payment initiation failed:",
                error
            );


            let message =
                "Unable to start payment.";


            if (error.response) {

                message =
                    error.response.data?.message ||
                    error.response.data ||
                    `Payment service returned ${error.response.status}.`;

            } else if (error.request) {

                message =
                    "Payment service is not reachable. " +
                    "Please make sure the Payment Microservice is running on port 7186.";

            } else if (error.message) {

                message =
                    error.message;
            }


            alert(message);


            setPaymentLoading(false);
        }
    };


    // =========================================================
    // UI
    // =========================================================

    return (

        <div className="dashboard industry-shell">

            <Sidebar />


            <div className="main-content">

                <Navbar />

                <DashboardCards />


                <div className="content">


                    {/* =================================================
                        LEFT PANEL
                    ================================================= */}

                    <div className="left-panel">


                        <PendingRequests
                            key={refreshKey}

                            selectedRequest={
                                selectedRequest
                            }

                            setSelectedRequest={
                                setSelectedRequest
                            }

                            onPayNow={
                                handlePayNow
                            }

                            paymentLoading={
                                paymentLoading
                            }
                        />


                        <div className="bottom-row">

                            <TodayPickups />

                            <MonthOverview />

                        </div>


                        <EnvironmentCards />

                    </div>


                    {/* =================================================
                        RIGHT PANEL
                    ================================================= */}

                    <div className="right-panel">


                        <RequestDetails
                            request={
                                selectedRequest
                            }

                            onStatusChange={
                                handleStatusChange
                            }
                        />


                        <PaymentSummary
                            request={
                                selectedRequest
                            }

                            onPaymentComplete={
                                handleStatusChange
                            }
                        />


                        <RequestProgress
                            request={
                                selectedRequest
                            }
                        />

                    </div>

                </div>

            </div>

        </div>
    );
};


export default IndustryDashboard;
