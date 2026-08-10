import { useEffect, useState } from "react";
import {
    FaClipboardList,
    FaLeaf,
    FaHourglassHalf,
    FaCheckCircle
} from "react-icons/fa";

// BUGFIX: this previously called getDashboard() from biogasService.js,
// which hits "/api/biogas/dashboard" - an endpoint that doesn't exist on
// the backend, so every card silently showed 0. Now computed from the
// real waste queue / assigned / processed endpoints.
import wasteService from "../../services/wasteService";

import "../../css/industryCards.css";

const DashboardCards = () => {

    const [dashboard, setDashboard] = useState({
        pendingRequests: 0,
        biogasGenerated: 0,
        processing: 0,
        completed: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = () => {

        const user = JSON.parse(localStorage.getItem("user") || "{}");

        Promise.all([
            wasteService.getWasteQueue().then((r) => r.data || []).catch(() => []),
            user.userId
                ? wasteService.getAssignedWaste(user.userId).then((r) => r.data || []).catch(() => [])
                : Promise.resolve([]),
            wasteService.getWasteHistory().then((r) => r.data || []).catch(() => []),
        ]).then(([pending, assigned, processed]) => {

            const biogasGenerated = processed.reduce(
                (sum, item) => sum + (item.biogasGenerated || 0),
                0
            );

            setDashboard({
                pendingRequests: pending.length,
                biogasGenerated,
                processing: assigned.length,
                completed: processed.length,
            });

        });
    };

    const cards = [

        {
            title: "Pending Requests",
            value: dashboard.pendingRequests,
            bg: "#dff4e2",
            fg: "#173a2d",
            icon: <FaClipboardList />,
            link: "View All"
        },

        {
            title: "Biogas Generated (L)",
            value: dashboard.biogasGenerated.toLocaleString(),
            bg: "#ffe4d5",
            fg: "#d45716",
            icon: <FaLeaf />,
            link: "View Details"
        },

        {
            title: "In Processing",
            value: dashboard.processing,
            bg: "#173a2d",
            fg: "#fff",
            icon: <FaHourglassHalf />,
            link: "View All"
        },

        {
            title: "Completed",
            value: dashboard.completed,
            bg: "#edf8e7",
            fg: "#173a2d",
            icon: <FaCheckCircle />,
            link: "View All"
        }

    ];

    return (

        <div className="dashboard-cards">

            {

                cards.map((card, index) => (

                    <div
                        className="dashboard-card"
                        key={index}
                    >

                        <div
                            className="card-icon"
                            style={{
                                background: card.bg,
                                color: card.fg
                            }}
                        >

                            {card.icon}

                        </div>

                        <div className="card-content">

                            <h2>

                                {card.value}

                            </h2>

                            <p>

                                {card.title}

                            </p>

                            <button>

                                {card.link} →

                            </button>

                        </div>

                    </div>

                ))

            }

        </div>

    );

};

export default DashboardCards;
