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

import "../../css/industryDashboard.css";
import "../../css/industryResponsive.css";

const IndustryDashboard = () => {

    const [selectedRequest, setSelectedRequest] = useState(null);

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <DashboardCards />

                <div className="content">

                    <div className="left-panel">

                        <PendingRequests
                            selectedRequest={selectedRequest}
                            setSelectedRequest={setSelectedRequest}
                        />

                        <div className="bottom-row">

                            <TodayPickups />

                            <MonthOverview />

                        </div>

                        <EnvironmentCards />

                    </div>

                    <div className="right-panel">

                        <RequestDetails
                            request={selectedRequest}
                        />

                        <PaymentSummary
                            request={selectedRequest}
                        />

                        <RequestProgress
                            request={selectedRequest}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
};

export default IndustryDashboard;