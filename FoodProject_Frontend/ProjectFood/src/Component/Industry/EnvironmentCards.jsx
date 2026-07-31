import { useState, useEffect } from "react";
import axios from "axios";import {
  FaLeaf,
  FaRecycle,
  FaCloud,
  FaIndustry,
} from "react-icons/fa";

import "../../css/environmentCards.css";

const EnvironmentCards = () => {
const [impact, setImpact] = useState({});

useEffect(()=>{

axios

.get("http://localhost:8080/food/api/waste/processed")

.then(res=>{

const processed=res.data;

const today=new Date().toISOString().split("T")[0];

const todayWaste=processed.filter(

x=>x.wasteProcessedDate &&

x.wasteProcessedDate.startsWith(today)

);

const meals=todayWaste.reduce(

(sum,item)=>sum+(item.estimatedMeals||0),

0

);

const biogas=todayWaste.reduce(

(sum,item)=>sum+(item.biogasGenerated||0),

0

);

const compost=todayWaste.reduce(

(sum,item)=>sum+(item.fertilizerGenerated||0),

0

);

setImpact({

co2Saved:(meals*0.45).toFixed(1),

wasteProcessed:todayWaste.length,

biogasGenerated:biogas,

compostProduced:compost

});

});

},[]);
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