import { useEffect, useState } from "react";
import {
  FaLeaf,
  FaRecycle,
  FaCloud,
  FaIndustry,
} from "react-icons/fa";

import "../../css/environmentCards.css";

const EnvironmentCards = () => {
  const [impact, setImpact] = useState({
    co2Saved: 1450,
    wasteProcessed: 820,
    biogasGenerated: 325,
    compostProduced: 610,
  });

  useEffect(() => {
    // Later connect your API

    /*
    axios.get("http://localhost:8080/api/biogas/environmental-impact")
    .then((res)=>{
        setImpact(res.data);
    });
    */

  }, []);

  const cards = [
    {
      title: "CO₂ Saved",
      value: `${impact.co2Saved} kg`,
      icon: <FaCloud />,
      color: "#10b981",
    },
    {
      title: "Waste Processed",
      value: `${impact.wasteProcessed} kg`,
      icon: <FaRecycle />,
      color: "#3b82f6",
    },
    {
      title: "Biogas Generated",
      value: `${impact.biogasGenerated} m³`,
      icon: <FaIndustry />,
      color: "#f59e0b",
    },
    {
      title: "Organic Compost",
      value: `${impact.compostProduced} kg`,
      icon: <FaLeaf />,
      color: "#16a34a",
    },
  ];

  return (
    <div className="environment-section">

      <div className="section-header">

        <h2>🌍 Environmental Impact</h2>

        <span>Today's Contribution</span>

      </div>

      <div className="environment-grid">

        {cards.map((card, index) => (
          <div className="environment-card" key={index}>

            <div
              className="environment-icon"
              style={{ background: card.color }}
            >
              {card.icon}
            </div>

            <div className="environment-content">

              <h3>{card.value}</h3>

              <p>{card.title}</p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default EnvironmentCards;