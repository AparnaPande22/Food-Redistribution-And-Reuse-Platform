import { useEffect, useState } from "react";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";

import "../../css/industryNavbar.css";

const Navbar = () => {
  const [profile, setProfile] = useState({
    name: "Green Earth Biogas",
    email: "greenearth@gmail.com",
  });

  const [notificationCount, setNotificationCount] = useState(5);

  useEffect(() => {
    // Later connect APIs

    /*
    axios.get("/api/biogas/profile")
    .then(res=>{
        setProfile(res.data);
    });

    axios.get("/api/biogas/notifications")
    .then(res=>{
        setNotificationCount(res.data.filter(x=>!x.read).length);
    });
    */
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

        <div className="notification">

          <FaBell />

          <span>{notificationCount}</span>

        </div>

        <div className="profile">

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