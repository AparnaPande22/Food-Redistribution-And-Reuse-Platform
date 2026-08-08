import { useState, useEffect } from "react";
import {
    FaLeaf,
    FaRecycle,
    FaCloud,
    FaIndustry,
} from "react-icons/fa";

import { getEnvironmentalImpact } from "../../services/biogasService";

import "../../css/environmentCards.css";

const EnvironmentCards = () => {

    const [impact, setImpact] = useState({
        co2Saved: 0,
        wasteProcessed: 0,
        biogasGenerated: 0,
        compostProduced: 0,
    });

    useEffect(() => {

        // Optional API - if the backend hasn't implemented it yet, fail quietly.
        getEnvironmentalImpact()
            .then((res) => {

                const data = res.data || {};

                setImpact({
                    co2Saved: data.co2Saved ?? 0,
                    wasteProcessed: data.wasteProcessed ?? 0,
                    biogasGenerated: data.biogasGenerated ?? 0,
                    compostProduced: data.compostProduced ?? 0,
                });

            })
            .catch((err) => console.log("Environmental impact unavailable:", err));

    }, []);

    const cards = [
        {
            title: "CO₂ Saved",
            value: `${impact.co2Saved} kg`,
            icon: <FaCloud />,
            color: "#173a2d",
        },
        {
            title: "Waste Processed",
            value: `${impact.wasteProcessed} kg`,
            icon: <FaRecycle />,
            color: "#d45716",
        },
        {
            title: "Biogas Generated",
            value: `${impact.biogasGenerated} m³`,
            icon: <FaIndustry />,
            color: "#173a2d",
        },
        {
            title: "Organic Compost",
            value: `${impact.compostProduced} kg`,
            icon: <FaLeaf />,
            color: "#d45716",
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
