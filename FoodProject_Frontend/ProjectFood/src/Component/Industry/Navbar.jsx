import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";

import "../../css/industryNavbar.css";

const Navbar = () => {

const [profile, setProfile] = useState({
    name: "",
    email: "",

 const [profile, setProfile] = useState({
    name: "",
    email: ""

});

useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {

        setProfile({
            name: user.name,
            email: user.email || ""
        });

    }

}, []);
  const [notificationCount, setNotificationCount] = useState(5);



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