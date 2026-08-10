import { useState, useEffect } from "react";
import {
    FaLeaf,
    FaRecycle,
    FaCloud,
    FaIndustry,
} from "react-icons/fa";

// BUGFIX: previously called getEnvironmentalImpact() from
// biogasService.js ("/api/biogas/environmental-impact"), which doesn't
// exist on the backend. Now computed client-side from real processed
// waste totals (biogasGenerated / fertilizerGenerated / estimatedMeals).
import wasteService from "../../services/wasteService";

import "../../css/environmentCards.css";

// Rough, commonly-cited estimate used only for a friendly headline
// number - roughly 2.5 kg of CO2e avoided per kg of food waste diverted
// from landfill instead of decomposing anaerobically. Not a precise
// measurement, just a directional impact figure.
const CO2_PER_KG_WASTE = 2.5;
// No per-item weight is tracked, so estimatedMeals is used as a rough
// proxy for kg of waste diverted (~0.4kg/meal is a common food-service
// estimate).
const KG_PER_MEAL = 0.4;

const EnvironmentCards = () => {

    const [impact, setImpact] = useState({
        co2Saved: 0,
        wasteProcessed: 0,
        biogasGenerated: 0,
        compostProduced: 0,
    });

    useEffect(() => {

        wasteService.getWasteHistory()
            .then((res) => {

                const processed = res.data || [];

                const wasteKg = processed.reduce(
                    (sum, item) => sum + (item.estimatedMeals || 0) * KG_PER_MEAL, 0
                );

                setImpact({
                    co2Saved: Math.round(wasteKg * CO2_PER_KG_WASTE),
                    wasteProcessed: Math.round(wasteKg),
                    biogasGenerated: processed.reduce(
                        (sum, item) => sum + (item.biogasGenerated || 0), 0
                    ),
                    compostProduced: processed.reduce(
                        (sum, item) => sum + (item.fertilizerGenerated || 0), 0
                    ),
                });

            })
            .catch((err) => console.log("Environmental impact unavailable:", err));

    }, []);

    const cards = [
        {
            title: "Est. CO₂ Saved",
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
            value: `${impact.biogasGenerated} L`,
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

                <span>All-Time Contribution</span>

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
