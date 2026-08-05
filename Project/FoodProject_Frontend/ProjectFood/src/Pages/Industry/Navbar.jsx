import { FaBell, FaSearch, FaChevronDown } from "react-icons/fa";
import "../../css/industryNavbar.css";

const Navbar = () => {

    return (

        <div className="navbar">

            <div>

                <h1>Industry Dashboard</h1>

                <p>Welcome back, Green Biogas Plant 👋</p>

            </div>

            <div className="navbar-right">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search anything..."
                    />

                </div>

                <div className="notification-icon">

                    <FaBell />

                    <span>3</span>

                </div>

                <div className="user-profile">

                    <div className="avatar">

                        G

                    </div>

                    <div>

                        <h4>Green Biogas Plant</h4>

                        <small>Biogas Industry</small>

                    </div>

                    <FaChevronDown />

                </div>

            </div>

        </div>

    );

};

export default Navbar;