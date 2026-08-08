import { useEffect, useState } from "react";
import {
    FaClipboardList,
    FaWallet,
    FaHourglassHalf,
    FaCheckCircle
} from "react-icons/fa";

import { getDashboard } from "../../services/biogasService";

import "../../css/industryCards.css";

const DashboardCards = () => {

    const [dashboard, setDashboard] = useState({
        pendingRequests: 0,
        totalPaid: 0,
        processing: 0,
        completed: 0
    });

    useEffect(() => {

        getDashboard()
            .then((res) => {

                const data = res.data || {};

                setDashboard({
                    pendingRequests: data.pendingRequests ?? 0,
                    totalPaid: data.totalPaid ?? 0,
                    processing: data.processing ?? 0,
                    completed: data.completed ?? 0
                });

            })
            .catch((err) => console.error("Failed to load dashboard:", err));

    }, []);

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
            title: "Total Paid Today",
            value: `₹${dashboard.totalPaid.toLocaleString()}`,
            bg: "#ffe4d5",
            fg: "#d45716",
            icon: <FaWallet />,
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
