import {
    FaHome,
    FaUsers,
    FaDonate,
    FaHandsHelping,
    FaTruck,
    FaClipboardList,
    FaChartBar,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div className="sidebar">

            <h2 className="logo">
                Beyond Waste
            </h2>

            <ul>

                <li>
                    <Link to="/admin/dashboard">
                        <FaHome />
                        <span>Dashboard</span>
                    </Link>
                </li>

                <li>
                    <Link to="/admin/pending-users">
                        <FaUsers />
                        <span>Pending Users</span>
                    </Link>
                </li>

                <li>
                    <Link to="/admin/pending-requests">
                        <FaClipboardList />
                        <span>Pending Requests</span>
                    </Link>
                </li>

                <li>
                    <Link to="/admin/matching-queue">
                        <FaHandsHelping />
                        <span>Matching Queue</span>
                    </Link>
                </li>

                <li>
                    <Link to="/admin/donations">
                        <FaDonate />
                        <span>Donations</span>
                    </Link>
                </li>

                <li>
                    <Link to="/admin/deliveries">
                        <FaTruck />
                        <span>Deliveries</span>
                    </Link>
                </li>

                <li>
                    <Link to="/admin/reports">
                        <FaChartBar />
                        <span>Reports</span>
                    </Link>
                </li>

                <li>
                    <Link to="/admin/settings">
                        <FaCog />
                        <span>Settings</span>
                    </Link>
                </li>

                <li>
                    <Link to="/login">
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </Link>
                </li>

            </ul>

        </div>

    );
}

export default Sidebar;