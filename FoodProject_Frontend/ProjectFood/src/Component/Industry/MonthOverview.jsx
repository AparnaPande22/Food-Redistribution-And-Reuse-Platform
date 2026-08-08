import { useState, useEffect } from "react";
import {
    FaRecycle,
    FaRupeeSign,
    FaTruck,
    FaLeaf,
} from "react-icons/fa";

import { getStatistics } from "../../services/biogasService";

import "../../css/monthOverview.css";

const MonthOverview = () => {

    const [overview, setOverview] = useState({
        totalWaste: 0,
        totalPayments: 0,
        pickups: 0,
        compostProduced: 0,
    });

    useEffect(() => {

        getStatistics()
            .then((res) => {

                const data = res.data || {};

                setOverview({
                    totalWaste: data.totalWaste ?? 0,
                    totalPayments: data.totalPayments ?? 0,
                    pickups: data.pickups ?? 0,
                    compostProduced: data.compostProduced ?? 0,
                });

            })
            .catch((err) => console.error("Failed to load statistics:", err));

    }, []);

    const cards = [
        {
            title: "Waste Collected",
            value: `${overview.totalWaste} kg`,
            icon: <FaRecycle />,
            color: "#173a2d",
        },
        {
            title: "Total Payments",
            value: `₹${overview.totalPayments.toLocaleString()}`,
            icon: <FaRupeeSign />,
            color: "#d45716",
        },
        {
            title: "Pickups",
            value: overview.pickups,
            icon: <FaTruck />,
            color: "#173a2d",
        },
        {
            title: "Compost Produced",
            value: `${overview.compostProduced} kg`,
            icon: <FaLeaf />,
            color: "#d45716",
        },
    ];

    return (
        <div className="month-overview">

            <div className="overview-header">
                <h2>📊 This Month Overview</h2>
            </div>

            <div className="overview-grid">

                {cards.map((item, index) => (
                    <div className="overview-card" key={index}>

                        <div
                            className="overview-icon"
                            style={{ background: item.color }}
                        >
                            {item.icon}
                        </div>

                        <div className="overview-content">
                            <h3>{item.value}</h3>
                            <p>{item.title}</p>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default MonthOverview;
