import {
  FaHome,
  FaClipboardList,
  FaHistory,
  FaTruck,
  FaCalendarAlt,
  FaChartBar,
  FaFileAlt,
  FaLeaf,
  FaBell,
  FaUserCircle,
  FaLock,
  FaSignOutAlt,
} from "react-icons/fa";

import "./../../css/industrySidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <div className="logo">

        <div className="logo-icon">🌿</div>

        <div>

          <h2>Beyond Waste</h2>

          <span>Biogas Industry Panel</span>

        </div>

      </div>

      <ul className="menu">

        <li className="active">
          <FaHome /> Dashboard
        </li>

        <li>
          <FaClipboardList /> Pending Requests
        </li>

        <li>
          <FaHistory /> Request History
        </li>

        <li>
          <FaTruck /> Today's Pickups
        </li>

        <li>
          <FaCalendarAlt /> Upcoming Pickups
        </li>

        <li>
          <FaChartBar /> Statistics
        </li>

        <li>
          <FaFileAlt /> Reports
        </li>

        <li>
          <FaLeaf /> Environmental Impact
        </li>

        <li className="notification">

          <div>

            <FaBell />

            Notifications

          </div>

          <span>3</span>

        </li>

      </ul>

      <div className="bottom-menu">

        <div className="profile-link">

          <FaUserCircle />

          Profile

        </div>

        <div className="profile-link">

          <FaLock />

          Change Password

        </div>

      </div>

      <button className="logout">

        <FaSignOutAlt />

        Logout

      </button>

      <div className="illustration">

        🌳

        <p>Recycle Today<br />Save Tomorrow</p>

      </div>

    </aside>
  );
};

export default Sidebar;