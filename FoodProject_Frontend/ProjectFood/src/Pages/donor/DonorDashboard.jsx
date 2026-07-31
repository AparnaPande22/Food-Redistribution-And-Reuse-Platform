import React, { useState, useEffect } from "react";
import "./DonorDashboard.css";
import { useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaBell,
  FaQuestionCircle,
  FaBars,
  FaTimes,
  FaPlusCircle,
  FaThLarge,
  FaRegClock,
  FaChartBar,
  FaCog,
  FaLifeRing,
  FaUserCircle,
  FaUtensils,
  FaCheckCircle,
  FaTruck,
  FaUsers,
  FaHandshake,
  FaPlus,
  FaEye,
  FaHistory,
  FaFileAlt
} from "react-icons/fa";

const menuItems = [
  { icon: <FaThLarge />, label: "Dashboard" },
  { icon: <FaPlusCircle />, label: "Create Donation" },
  { icon: <FaRegClock />, label: "History" },
  { icon: <FaChartBar />, label: "Impact" }
];

const bottomMenuItems = [
  { icon: <FaLifeRing />, label: "Support" },
  { icon: <FaCog />, label: "Settings" }
];

const stats = [
  {
    label: "Meals Shared",
    value: "12,480",
    note: "↗ +12% from last month",
    noteClass: "trend-up",
    icon: <FaUtensils />,
    iconClass: "green"
  },
  {
    label: "Donations Completed",
    value: "342",
    note: "Consistent impact provider",
    icon: <FaCheckCircle />,
    iconClass: "peach"
  },
  {
    label: "Active Donations",
    value: "04",
    note: "In transit to partners",
    icon: <FaTruck />,
    iconClass: "darkgreen"
  },
  {
    label: "Communities Supported",
    value: "18",
    note: "Across 4 city zones",
    icon: <FaUsers />,
    iconClass: "lightgreen"
  }
];

const quickActions = [
  { icon: <FaPlus />, title: "Create Donation", subtitle: "Add surplus food", highlighted: true },
  { icon: <FaEye />, title: "View Active Donations", subtitle: "Live volunteer status" },
  { icon: <FaHistory />, title: "Donation History", subtitle: "Past contributions" },
  { icon: <FaFileAlt />, title: "Impact Report", subtitle: "Donation analytics" }
];

const activities = [
  {
    icon: <FaHandshake />,
    iconClass: "green",
    title: "Donation matched with Anand Orphanage",
    meta: "2 hours ago • 45kg Surplus",
    badge: { text: "In Transit", type: "dark", showDot: true }
  },
  {
    icon: <FaTruck />,
    iconClass: "peach",
    title: "Donation successfully delivered to City Night Shelter",
    meta: "Yesterday • 120 Meals",
    badge: { text: "Completed", type: "light" }
  },
  {
    icon: <FaCheckCircle />,
    iconClass: "green",
    title: "Weekly sustainability report generated",
    meta: "3 days ago • Impact Badge Earned",
    link: "View PDF"
  }
];

/*
   COMPONENT
*/

const DonorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Load the logged-in user's name once, when the page first opens
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser?.name) {
      setUserName(savedUser.name);
    }
  }, []);

  return (
    <div className="dashboard">
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ---------- SIDEBAR ---------- */}
      <aside className={`sidebar ${sidebarOpen ? "show" : ""}`}>
        <div className="logo-area">
          <div className="logo-box">♻</div>
          <div>
            <h3>Beyond Waste</h3>
            <p>Premium Donor Portal</p>
          </div>
          <button className="close-sidebar d-lg-none" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <button className="new-donation-btn" onClick={() => navigate("/donor/create-donation")}>
          <FaPlusCircle />
          <span>New Donation</span>
        </button>

        <div className="menu">
          {menuItems.map((item, i) => (
            <div
              className={`menu-item ${i === 0 ? "active" : ""}`}
              key={item.label}
              onClick={() => {
                setSidebarOpen(false);
                if (item.label === "Dashboard") {
                  navigate("/donor");
                } else if (item.label === "Create Donation") {
                  navigate("/donor/create-donation");
                } else if (item.label === "History") {
                  navigate("/donor/history");
                } else if (item.label === "Impact") {
                  navigate("/donor/impact");
                }
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="sidebar-bottom">
          {bottomMenuItems.map((item) => (
            <div className="menu-item" key={item.label}>
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* ---------- MAIN ---------- */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <div className="left-top">
            <button className="mobile-menu d-lg-none" onClick={() => setSidebarOpen(true)}>
              <FaBars />
            </button>
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search activities..." />
            </div>
          </div>

          <div className="right-top">
            <div className="top-icon">
              <FaBell />
            </div>
            <div className="top-icon d-none d-sm-flex">
              <FaQuestionCircle />
            </div>
            <div className="profile">
              <span>{userName}</span>
              <div className="profile-img">
                <FaUserCircle />
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="page-content">
          <div className="welcome-section">
            <h1>Welcome back, {userName}</h1>
            <p>
              Thank you for helping give surplus food a purpose. Your
              contributions today are making a tangible difference in the
              community.
            </p>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stats-card" key={stat.label}>
                <div className="stats-top">
                  <div>
                    <small>{stat.label}</small>
                    <h2>{stat.value}</h2>
                    <span className={stat.noteClass}>{stat.note}</span>
                  </div>
                  <div className={`stats-icon ${stat.iconClass}`}>{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="main-grid">
            {/* Left column */}
            <div className="left-col">
              {/* Quick actions */}
              <div className="dashboard-card">
                <div className="section-title">
                  <h4>Quick Actions</h4>
                </div>
                <div className="quick-actions-row">
                  {quickActions.map((action) => (
                    <button
                      key={action.title}
                      className={`quick-action-btn ${action.highlighted ? "green-btn" : ""}`}
                      onClick={() => {
                        if (action.title === "Create Donation") {
                          navigate("/donor/create-donation");
                        } else if (action.title === "Donation History") {
                          navigate("/donor/history");
                        } else if (action.title === "View Active Donations") {
                          navigate("/donor/active");
                        } else if (action.title === "Impact Report") {
                          navigate("/donor/impact");
                        }
                      }}
                    >
                      <span className="action-icon">{action.icon}</span>

                      <div>
                        <h6>{action.title}</h6>
                        <small>{action.subtitle}</small>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div className="dashboard-card">
                <div className="section-header">
                  <h4>Recent Activity</h4>
                  <a href="/donor/history">View all</a>
                </div>

                {activities.map((activity) => (
                  <div className="activity-item" key={activity.title}>
                    <div className={`activity-icon ${activity.iconClass}`}>{activity.icon}</div>
                    <div className="activity-content">
                      <h6>{activity.title}</h6>
                      <p>{activity.meta}</p>
                    </div>
                    {activity.badge && (
                      <span className={`activity-badge ${activity.badge.type}`}>
                        {activity.badge.showDot && <i className="dot"></i>} {activity.badge.text}
                      </span>
                    )}
                    {activity.link && (
                      <a href="#" className="activity-link">
                        {activity.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="right-col">
              <div className="dashboard-card impact-card">
                <div className="section-title">
                  <h4>Monthly Impact</h4>
                </div>
                <p className="impact-lead">This month you helped serve</p>
                <h2 className="impact-number">320 warm meals.</h2>
                <div className="impact-bar-track">
                  <div className="impact-bar-fill" style={{ width: "72%" }} />
                </div>
                <span className="impact-caption">72% of your monthly goal reached</span>
              </div>

              <div className="dashboard-card">
                <div className="eyebrow">Community Highlight</div>
                <div className="community-image-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900"
                    alt="Community"
                    className="community-image"
                  />
                  <button className="community-plus">
                    <FaPlus />
                  </button>
                </div>
                <h5>Anand Orphanage</h5>
                <p className="community-text">
                  Your surplus food is currently nourishing 45 children at
                  this facility. Thank you for your continued partnership.
                </p>
                <button className="btn-outline-green w-100">Read Their Story</button>
              </div>
            </div>
          </div>

          <footer className="dashboard-footer">
            <p>&copy; 2026 Beyond Waste. All rights reserved.</p>
            <div className="footer-links">
              <a href="/">Privacy Policy</a>
              <a href="/">Terms of Service</a>
              <a href="/">Contact Support</a>
              <a href="/">Sustainability Report</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;