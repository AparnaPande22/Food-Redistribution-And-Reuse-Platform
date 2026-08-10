import { useNavigate, useLocation } from "react-router-dom";
import {
    FaThLarge,
    FaPlusCircle,
    FaRegClock,
    FaChartBar,
    FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

// BUGFIX: this sidebar (used on Create Donation / Donation History /
// Donation Details) previously rendered plain <p> tags with no
// onClick/navigation at all, and its CSS classNames ("donor-sidebar",
// "sidebar-menu"...) didn't even match the selectors in Sidebar.css
// ("donor-side", "donor-side-menu"...) so none of the styling applied
// either. It is now a fully working, actively-highlighted nav sidebar,
// consistent with the main DonorDashboard sidebar.

const menuItems = [
    { icon: <FaThLarge />, label: "Dashboard", path: "/donor" },
    { icon: <FaPlusCircle />, label: "Create Donation", path: "/donor/create-donation" },
    { icon: <FaRegClock />, label: "History", path: "/donor/history" },
    { icon: <FaChartBar />, label: "Impact", path: "/donor/impact" },
];

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <aside className="donor-side">
            <div className="donor-side-logo">
                <div className="donor-side-logo-box">♻</div>
                <div>
                    <h3>Beyond Waste</h3>
                    <p>Donor Portal</p>
                </div>
            </div>

            <button
                className="donor-side-new-btn"
                onClick={() => navigate("/donor/create-donation")}
            >
                <FaPlusCircle />
                <span>New Donation</span>
            </button>

            <div className="donor-side-menu">
                {menuItems.map((item) => (
                    <div
                        key={item.label}
                        className={`donor-side-item ${
                            location.pathname === item.path ? "active" : ""
                        }`}
                        onClick={() => navigate(item.path)}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>

            <div className="donor-side-bottom">
                <div className="donor-side-item" onClick={handleLogout}>
                    <FaSignOutAlt />
                    <span>Sign Out</span>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
