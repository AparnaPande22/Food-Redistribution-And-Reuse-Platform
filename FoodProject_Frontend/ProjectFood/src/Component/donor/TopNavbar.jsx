import { useEffect, useState } from "react";
import "./TopNavbar.css";

function TopNavbar() {

    const [user, setUser] = useState({});

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        if (loggedUser) {
            setUser(loggedUser);
        }
    }, []);

    return (
        <div className="top-navbar">

            <div className="navbar-title">
                {/* Empty or your page title */}
            </div>

            <div className="user-info">

                <div className="user-text">
                    <h4>{user.name}</h4>
                    <p>{user.accountType}</p>
                </div>

                <div className="avatar">
                    {user.name?.charAt(0).toUpperCase()}
                </div>

            </div>

        </div>
    );
}

export default TopNavbar;