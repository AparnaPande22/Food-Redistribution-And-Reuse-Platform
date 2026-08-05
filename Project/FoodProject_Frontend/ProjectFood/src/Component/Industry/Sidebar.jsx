import { NavLink } from "react-router-dom";
import {
  FaLeaf,
  FaHome,
  FaClipboardList,
  FaTruck,
  FaChartBar,
  FaBell,
  FaUserCircle,
  FaLock,
  FaSignOutAlt
} from "react-icons/fa";

import "../../css/industrySidebar.css";

const Sidebar = () => {
  return (
    <div className="industry-sidebar">

      <div className="sidebar-logo">

        <FaLeaf />

        <h2>Beyond Waste</h2>

        <p>Biogas Industry</p>

      </div>

      <nav>

        <NavLink to="/industry">
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink to="/industry/history">
          <FaClipboardList />
          Request History
        </NavLink>

        <NavLink to="/industry/upcoming-pickups">
          <FaTruck />
          Upcoming Pickups
        </NavLink>

        <NavLink to="/industry/statistics">
          <FaChartBar />
          Statistics
        </NavLink>

        <NavLink to="/industry/notifications">
          <FaBell />
          Notifications
        </NavLink>

        <NavLink to="/industry/profile">
          <FaUserCircle />
          Profile
        </NavLink>

        <NavLink to="/industry/change-password">
          <FaLock />
          Change Password
        </NavLink>

      </nav>

      <button className="logout-btn">

        <FaSignOutAlt />

        Logout

      </button>

    </div>
  );
};

export default Sidebar;