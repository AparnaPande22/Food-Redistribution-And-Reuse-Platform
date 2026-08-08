import { useEffect, useState } from "react";

import Sidebar from "../../Component/Industry/Sidebar";
import Navbar from "../../Component/Industry/Navbar";
import { getRequestHistory } from "../../services/biogasService";

import "../../css/industryDashboard.css";
import "../../css/industryResponsive.css";
import "../../css/industryExtraPages.css";

const RequestHistory = () => {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getRequestHistory()
            .then((res) => setHistory(res.data || []))
            .catch((err) => console.error("Failed to load request history:", err))
            .finally(() => setLoading(false));

    }, []);

    return (

        <div className="dashboard industry-shell">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="extra-page-content">

                    <h2 style={{ marginBottom: 18 }}>Request History</h2>

                    {loading ? (

                        <p>Loading history...</p>

                    ) : history.length === 0 ? (

                        <div className="extra-empty-state">
                            No completed or past requests yet.
                        </div>

                    ) : (

                        <div className="history-table-wrap">

                            <table>

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Donor</th>
                                        <th>Meals</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {history.map((item) => (
                                        <tr key={item.id || item.requestId}>
                                            <td>#{item.id || item.requestId}</td>
                                            <td>{item.donorName}</td>
                                            <td>{item.estimatedMeals}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                {item.updatedAt || item.completedAt
                                                    ? new Date(item.updatedAt || item.completedAt).toLocaleString()
                                                    : "-"}
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );
};

export default RequestHistory;
