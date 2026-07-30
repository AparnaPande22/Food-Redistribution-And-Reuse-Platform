import { useState, useEffect } from "react";
import axios from "axios";import {
  FaRecycle,
  FaRupeeSign,
  FaTruck,
  FaLeaf,
} from "react-icons/fa";

import "../../css/monthOverview.css";

const MonthOverview = () => {
  const [overview, setOverview] = useState({
    totalWaste: 0,
    totalPayments: 0,
    pickups: 0,
    compostProduced: 0,
});
useEffect(() => {

    axios
        .get("http://localhost:8080/food/api/biogas/reports/monthly")
        .then((res) => {

            setOverview({

                totalWaste: res.data.wasteCollected,

                totalPayments: res.data.paymentAmount,

                pickups: res.data.totalPickups,

                compostProduced: res.data.biogasGenerated

            });

        })
        .catch((err) => {

            console.log(err);

        });

}, []);

  const cards = [
    {
      title: "Waste Collected",
      value: `${overview.totalWaste} kg`,
      icon: <FaRecycle />,
      color: "#16a34a",
    },
    {
      title: "Total Payments",
      value: `₹${overview.totalPayments.toLocaleString()}`,
      icon: <FaRupeeSign />,
      color: "#2563eb",
    },
    {
      title: "Pickups",
      value: overview.pickups,
      icon: <FaTruck />,
      color: "#f59e0b",
    },
    {
      title: "Compost Produced",
      value: `${overview.compostProduced} kg`,
      icon: <FaLeaf />,
      color: "#7c3aed",
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