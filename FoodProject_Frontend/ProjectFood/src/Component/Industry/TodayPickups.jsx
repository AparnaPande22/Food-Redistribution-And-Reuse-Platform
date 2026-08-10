import { useEffect, useState } from "react";
import {
    FaTruck,
    FaMapMarkerAlt,
    FaClock
} from "react-icons/fa";

// BUGFIX: previously called getTodayPickups() from biogasService.js
// ("/api/biogas/pickups/today"), which doesn't exist on the backend.
// Now shows this partner's currently-assigned pickups (WASTE_ASSIGNED)
// from the real waste endpoint.
import wasteService from "../../services/wasteService";

import "../../css/todayPickups.css";

const TodayPickups = () => {

    const [pickups, setPickups] = useState([]);

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user.userId) return;

        wasteService.getAssignedWaste(user.userId)
            .then((res) => {
                const assigned = (res.data || []).filter(
                    (item) => item.status === "WASTE_ASSIGNED"
                );
                setPickups(assigned);
            })
            .catch((err) => console.log("Assigned pickups unavailable:", err));

    }, []);

    return (

        <div className="today-card">

            <div className="today-header">

                <h2>🚛 My Assigned Pickups</h2>

            </div>

            {

                pickups.length > 0 ? (

                    pickups.map((pickup) => (

                        <div
                            key={pickup.requestId}
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
                                    pickup.wasteAssignedDate
                                        ? new Date(pickup.wasteAssignedDate).toLocaleString()
                                        : "-"
                                }

                            </div>

                        </div>

                    ))

                ) : (

                    <p className="no-pickups">No pickups assigned right now.</p>

                )

            }

        </div>

    );

};

export default TodayPickups;
