import { useEffect, useState } from "react";
import {
  FaRecycle,
  FaRupeeSign,
  FaTruck,
  FaLeaf,
} from "react-icons/fa";

import "../../css/monthOverview.css";

const MonthOverview = () => {
  const [overview, setOverview] = useState({
    totalWaste: 2450,
    totalPayments: 78500,
    pickups: 128,
    compostProduced: 980,
  });

  useEffect(() => {
    // Later connect API

    /*
    axios
      .get("http://localhost:8080/api/biogas/reports/monthly")
      .then((res) => {
        setOverview(res.data);
      });
    */
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