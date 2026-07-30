import { useEffect, useState } from "react";
import {
    FaClipboardList,
    FaWallet,
    FaHourglassHalf,
    FaCheckCircle
} from "react-icons/fa";

import "../../css/industryCards.css";
// import { getDashboard } from "../../services/biogasApi";

const DashboardCards = () => {

    const [dashboard, setDashboard] = useState({

        pendingRequests: 18,

        totalPaid: 18500,

        processing: 8,

        completed: 124

    });

    useEffect(() => {

        // Later replace with API

        /*
        getDashboard().then(res=>{
            setDashboard(res.data);
        });
        */

    }, []);

    const cards = [

        {
            title: "Pending Requests",
            value: dashboard.pendingRequests,
            color: "#16a34a",
            icon: <FaClipboardList />,
            link: "View All"
        },

        {
            title: "Total Paid Today",
            value: `₹${dashboard.totalPaid.toLocaleString()}`,
            color: "#2563eb",
            icon: <FaWallet />,
            link: "View Details"
        },

        {
            title: "In Processing",
            value: dashboard.processing,
            color: "#f59e0b",
            icon: <FaHourglassHalf />,
            link: "View All"
        },

        {
            title: "Completed",
            value: dashboard.completed,
            color: "#7c3aed",
            icon: <FaCheckCircle />,
            link: "View All"
        }

    ];

    return (

        <div className="dashboard-cards">

            {

                cards.map((card,index)=>(

                    <div
                    className="dashboard-card"
                    key={index}
                    >

                        <div
                        className="card-icon"
                        style={{
                            background:card.color
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