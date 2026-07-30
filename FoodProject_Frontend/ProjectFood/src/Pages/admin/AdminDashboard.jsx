import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import DashboardCards from "./DashboardCards";
import MonthlyChart from "./MonthlyChart";
import CriticalAlerts from "./CriticalAlerts";
import PartnerAcquisition from "./PartnerAcquisition";
import MapCard from "./MapCard";
import RecentDonations from "./RecentDonations";
import PendingRequests from "./PendingRequests";
import RecentActivity from "./RecentActivity";
import DonationStatusChart from "./DonationStatusChart";
import LatestUsers from "./LatestUsers";
import CalendarCard from "./CalendarCard";
import Notifications from "./Notifications";
import WeeklyDonationChart from "./WeeklyDonationChart";
import TopDonors from "./TopDonors";
import DeliveryProgress from "./DeliveryProgress";
import NgoPerformance from "./NgoPerformance";

import "./dashboard.css";
import "./Navbar.css";
import "./Sidebar.css"

function AdminDashboard() {

    return (

        <div className="dashboard-container">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="dashboard-body">

                    <div className="title-section">

                        <p className="subtitle">
                            Operational Overview
                        </p>

                        <h1>
                            Operations Command Center
                        </h1>

                    </div>

                    <DashboardCards />

                    <div className="middle-grid">

                        <MonthlyChart />

                        <CriticalAlerts />

                    </div>

                    <div className="bottom-grid">

                        <PartnerAcquisition />

                        <MapCard />

                    </div>
                    <div className="table-grid">

                        <RecentDonations />

                        <PendingRequests />

                    </div>

                    <div style={{ marginTop: "20px" }}>

                        <RecentActivity />

                    </div>
                    <div className="extra-grid">

                        <DonationStatusChart />

                        <LatestUsers />

                    </div>

                    <div className="extra-grid">

                        <CalendarCard />

                        <Notifications />

                    </div>
                    <div className="analytics-grid">

                        <WeeklyDonationChart />

                        <TopDonors />

                    </div>

                    <div className="analytics-grid">

                        <DeliveryProgress />

                        <NgoPerformance />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;