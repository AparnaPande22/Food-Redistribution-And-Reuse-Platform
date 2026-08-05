import { useEffect, useState } from "react";
import {
    FaTruck,
    FaMapMarkerAlt,
    FaClock
} from "react-icons/fa";

import { getTodayPickups } from "../../services/biogasService";

import "../../css/todayPickups.css";

const TodayPickups = () => {

    const [pickups, setPickups] = useState([]);

    useEffect(() => {

        // Optional API - if the backend hasn't implemented it yet, fail quietly.
        getTodayPickups()
            .then((res) => setPickups(res.data || []))
            .catch((err) => console.log("Today's pickups unavailable:", err));

    }, []);

    return (

        <div className="today-card">

            <div className="today-header">

                <h2>🚛 Today's Pickups</h2>

            </div>

            {

                pickups.length > 0 ? (

                    pickups.map((pickup) => (

                        <div
                            key={pickup.id || pickup.requestId}
                            className="pickup-item"
                        >

                            <div className="pickup-icon">

                                <FaTruck />

                            </div>

                            <div className="pickup-info">

                                <h4>{pickup.donorName}</h4>

                                <p>

                                    <FaMapMarkerAlt />

                                    {pickup.pickupAddress}

                                </p>

                            </div>

                            <div className="pickup-time">

                                <FaClock />

                                {
                                    pickup.pickupTime
                                        ? new Date(pickup.pickupTime).toLocaleString()
                                        : "-"
                                }

                            </div>

                        </div>

                    ))

                ) : (

                    <p className="no-pickups">No pickups scheduled for today.</p>

                )

            }

        </div>

    );

};

export default TodayPickups;
