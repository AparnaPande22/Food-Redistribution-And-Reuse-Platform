import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";

import { getNotifications } from "../../services/biogasService";

import "../../css/industryNavbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
      });
    }

    getNotifications()
      .then((res) => {
        const list = res.data || [];
        const unread = list.filter((n) => !n.read).length;
        setNotificationCount(unread);
      })
      .catch((err) => console.log("Notifications unavailable:", err));
  }, []);

  return (
    <nav className="industry-navbar">
      <div className="navbar-left">
        <h2>🌱 Industry Dashboard</h2>
      </div>

      <div className="navbar-center">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search requests..."
          />
        </div>
      </div>

      <div className="navbar-right">
        <div
          className="notification"
          onClick={() => navigate("/industry/notifications")}
          style={{ cursor: "pointer" }}
        >
          <FaBell />
          {notificationCount > 0 && <span>{notificationCount}</span>}
        </div>

        <div
          className="profile"
          onClick={() => navigate("/industry/profile")}
          style={{ cursor: "pointer" }}
        >
          <FaUserCircle className="avatar" />

          <div className="profile-info">
            <h4>{profile.name}</h4>
            <p>{profile.email}</p>
          </div>

          <FaChevronDown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
