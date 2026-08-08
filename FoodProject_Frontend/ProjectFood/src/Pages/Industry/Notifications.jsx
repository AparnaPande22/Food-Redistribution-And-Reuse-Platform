import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

import Sidebar from "../../Component/Industry/Sidebar";
import Navbar from "../../Component/Industry/Navbar";
import { getNotifications, markNotificationRead } from "../../services/biogasService";

import "../../css/industryDashboard.css";
import "../../css/industryResponsive.css";
import "../../css/industryExtraPages.css";

const Notifications = () => {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadNotifications = () => {

        getNotifications()
            .then((res) => setNotifications(res.data || []))
            .catch((err) => console.error("Failed to load notifications:", err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    const handleMarkRead = async (id) => {

        try {

            await markNotificationRead(id);

            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, read: true } : n))
            );

        } catch (err) {
            console.error("Failed to mark notification read:", err);
            alert(err.response?.data?.message || err.response?.data || "Unable to update notification.");
        }
    };

    return (

        <div className="dashboard industry-shell">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="extra-page-content">

                    <h2 style={{ marginBottom: 18 }}>
                        <FaBell style={{ marginRight: 8 }} />
                        Notifications
                    </h2>

                    {loading ? (

                        <p>Loading notifications...</p>

                    ) : notifications.length === 0 ? (

                        <div className="extra-empty-state">
                            You're all caught up — no notifications.
                        </div>

                    ) : (

                        <div className="notif-list">

                            {notifications.map((n) => (

                                <div
                                    key={n.id}
                                    className={`notif-item ${n.read ? "" : "unread"}`}
                                >

                                    <div>
                                        <p className="notif-message">{n.message}</p>
                                        <span className="notif-time">
                                            {n.createdAt
                                                ? new Date(n.createdAt).toLocaleString()
                                                : ""}
                                        </span>
                                    </div>

                                    {!n.read && (
                                        <button onClick={() => handleMarkRead(n.id)}>
                                            Mark as read
                                        </button>
                                    )}

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>

    );
};

export default Notifications;
