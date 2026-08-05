import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { getMyNotifications } from "../../services/notificationService";

function Notifications() {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getMyNotifications()
            .then((res) => setNotifications(res.data || []))
            .catch((err) => console.log("Error loading notifications:", err))
            .finally(() => setLoading(false));

    }, []);

    return (

        <div className="table-card">

            <h2>

                <FaBell />

                Notifications

            </h2>

            {
                loading ? (
                    <p>Loading...</p>
                ) : notifications.length === 0 ? (
                    <p>No notifications yet.</p>
                ) : (
                    notifications.slice(0, 5).map((item) => (

                        <div
                            className="notification"
                            key={item.id}
                        >

                            {item.message}

                        </div>

                    ))
                )
            }

        </div>

    );

}

export default Notifications;
