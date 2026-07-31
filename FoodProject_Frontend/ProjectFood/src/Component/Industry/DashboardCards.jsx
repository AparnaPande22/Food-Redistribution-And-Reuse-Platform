import { useEffect, useState } from "react";
import axios from "axios";
import {
    FaClipboardList,
    FaWallet,
    FaHourglassHalf,
    FaCheckCircle
} from "react-icons/fa";

import "../../css/industryCards.css";
// import { getDashboard } from "../../services/biogasApi";

const DashboardCards = () => {

   useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    axios
        .get(`http://localhost:8080/food/api/waste/assigned/${user.userId}`)
        .then(res => {

            const data = res.data;

            setDashboard({

                pendingRequests: data.filter(
                    x => x.status === "WASTE_ASSIGNED"
                ).length,

                processing: data.filter(
                    x => x.status === "PROCESSING"
                ).length,

                completed: data.filter(
                    x => x.status === "WASTE_PROCESSED"
                ).length,

                totalPaid: 0

            });

        });

}, []);
 const [dashboard, setDashboard] = useState({

    pendingRequests:0,

    totalPaid:0,

    processing:0,

    completed:0

});

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