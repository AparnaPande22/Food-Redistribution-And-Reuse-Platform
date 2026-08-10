import { useState, useEffect } from "react";
import {
    FaRecycle,
    FaLeaf,
    FaTruck,
    FaClipboardCheck,
} from "react-icons/fa";

// BUGFIX: previously called getStatistics() from biogasService.js
// ("/api/biogas/statistics"), which doesn't exist on the backend. Now
// computed client-side from the real processed-waste history.
import wasteService from "../../services/wasteService";

import "../../css/monthOverview.css";

const MonthOverview = () => {

    const [overview, setOverview] = useState({
        requestsProcessed: 0,
        biogasGenerated: 0,
        pickupsThisMonth: 0,
        compostProduced: 0,
    });

    useEffect(() => {

        wasteService.getWasteHistory()
            .then((res) => {

                const processed = res.data || [];

                const now = new Date();
                const thisMonth = processed.filter((item) => {
                    if (!item.wasteProcessedDate) return false;
                    const d = new Date(item.wasteProcessedDate);
                    return (
                        d.getMonth() === now.getMonth() &&
                        d.getFullYear() === now.getFullYear()
                    );
                });

                setOverview({
                    requestsProcessed: processed.length,
                    biogasGenerated: processed.reduce(
                        (sum, item) => sum + (item.biogasGenerated || 0), 0
                    ),
                    pickupsThisMonth: thisMonth.length,
                    compostProduced: processed.reduce(
                        (sum, item) => sum + (item.fertilizerGenerated || 0), 0
                    ),
                });

            })
            .catch((err) => console.error("Failed to load waste history:", err));

    }, []);

    const cards = [
        {
            title: "Requests Processed",
            value: overview.requestsProcessed,
            icon: <FaClipboardCheck />,
            color: "#173a2d",
        },
        {
            title: "Biogas Generated (L)",
            value: overview.biogasGenerated.toLocaleString(),
            icon: <FaRecycle />,
            color: "#d45716",
        },
        {
            title: "Pickups This Month",
            value: overview.pickupsThisMonth,
            icon: <FaTruck />,
            color: "#173a2d",
        },
        {
            title: "Compost Produced (kg)",
            value: overview.compostProduced.toLocaleString(),
            icon: <FaLeaf />,
            color: "#d45716",
        },
    ];

    return (
        <div className="month-overview">

            <div className="overview-header">
                <h2>📊 Waste Processing Overview</h2>
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
