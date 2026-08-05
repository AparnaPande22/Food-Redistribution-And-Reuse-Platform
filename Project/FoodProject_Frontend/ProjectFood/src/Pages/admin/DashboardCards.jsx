import { useEffect, useState } from "react";
import { getAnalytics } from "../../services/adminService";

function DashboardCards() {

    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {

        loadAnalytics();

    }, []);

    const loadAnalytics = async () => {

        try {

            const data = await getAnalytics();

            setAnalytics(data);

        } catch (error) {
            console.log("Status:", error.response?.status);
            console.log("Data:", error.response?.data);
            console.log(error);
        }

    };

    if (!analytics) {

        return <h3>Loading Dashboard...</h3>;

    }

    const cards = [
        {
            title: "Total Users",
            value: analytics.totalUsers,
        },
        {
            title: "Pending Users",
            value: analytics.pendingUsers,
        },
        {
            title: "Total Requests",
            value: analytics.totalRequests,
        },
        {
            title: "Pending Requests",
            value: analytics.pendingRequests,
        },
        {
            title: "Total Matches",
            value: analytics.totalMatches,
        },
        {
            title: "Completed Deliveries",
            value: analytics.completedDeliveries,
        },
    ];

    return (

        <div className="cards">

            {

                cards.map((card, index) => (

                    <div
                        className="card"
                        key={index}
                    >

                        <h4>{card.title}</h4>

                        <h2>{card.value}</h2>

                    </div>

                ))

            }

        </div>

    );

}

export default DashboardCards;