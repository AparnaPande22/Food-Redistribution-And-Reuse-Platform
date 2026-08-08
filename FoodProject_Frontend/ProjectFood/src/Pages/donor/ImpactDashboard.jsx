import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    FaUtensils,
    FaTruck,
    FaUsers,
    FaHandHoldingHeart,
    FaHandshake,
    FaRecycle,
    FaChartLine,
    FaArrowRight
} from "react-icons/fa";

import "./ImpactDashboard.css";

const ImpactDashboard = () => {
    const [impact, setImpact] = useState({
        totalCompletedDeliveries: 0,
        totalCompletedDonations: 0,
        totalDonors: 0,
        totalFoodQuantity: 0,
        totalMatches: 0,
        totalReceivers: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchImpactData();
    }, []);

    const fetchImpactData = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/food/api/dashboard/impact",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("IMPACT DASHBOARD DATA:", response.data);

            setImpact({
                totalCompletedDeliveries:
                    response.data.totalCompletedDeliveries || 0,

                totalCompletedDonations:
                    response.data.totalCompletedDonations || 0,

                totalDonors:
                    response.data.totalDonors || 0,

                totalFoodQuantity:
                    response.data.totalFoodQuantity || 0,

                totalMatches:
                    response.data.totalMatches || 0,

                totalReceivers:
                    response.data.totalReceivers || 0
            });

        } catch (err) {
            console.error("Error fetching impact dashboard:", err);

            setError(
                err.response?.data?.message ||
                "Unable to load impact dashboard data."
            );

        } finally {
            setLoading(false);
        }
    };

    const stats = [
        {
            title: "Food Redistributed",
            value: impact.totalFoodQuantity,
            suffix: " Units",
            icon: <FaUtensils />,
            description: "Total food quantity recorded",
            className: "food"
        },
        {
            title: "Completed Donations",
            value: impact.totalCompletedDonations,
            suffix: "",
            icon: <FaHandHoldingHeart />,
            description: "Successfully completed donations",
            className: "donations"
        },
        {
            title: "Completed Deliveries",
            value: impact.totalCompletedDeliveries,
            suffix: "",
            icon: <FaTruck />,
            description: "Successfully delivered food",
            className: "deliveries"
        },
        {
            title: "Total Donors",
            value: impact.totalDonors,
            suffix: "",
            icon: <FaUsers />,
            description: "Registered food donors",
            className: "donors"
        },
        {
            title: "Total Receivers",
            value: impact.totalReceivers,
            suffix: "",
            icon: <FaUsers />,
            description: "Registered receivers",
            className: "receivers"
        },
        {
            title: "Successful Matches",
            value: impact.totalMatches,
            suffix: "",
            icon: <FaHandshake />,
            description: "Donor and receiver matches",
            className: "matches"
        }
    ];

    if (loading) {
        return (
            <div className="impact-dashboard">
                <div className="impact-loading">
                    <div className="impact-spinner"></div>
                    <p>Loading impact data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="impact-dashboard">

            {/* Header */}
            <div className="impact-header">
                <div>
                    <div className="impact-title-row">
                        <div className="impact-title-icon">
                            <FaRecycle />
                        </div>

                        <div>
                            <h1>Impact Dashboard</h1>
                            <p>
                                Track the social and environmental impact of Beyond Waste.
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    className="impact-refresh-btn"
                    onClick={fetchImpactData}
                >
                    <FaChartLine />
                    Refresh Data
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="impact-error">
                    {error}
                </div>
            )}

            {/* Main Highlight */}
            <div className="impact-hero">

                <div className="hero-content">
                    <div className="hero-icon">
                        <FaRecycle />
                    </div>

                    <div>
                        <span className="hero-label">
                            FOOD REDISTRIBUTION IMPACT
                        </span>

                        <h2>
                            {impact.totalFoodQuantity.toLocaleString()}
                        </h2>

                        <p>
                            Total Food Quantity Redistributed
                        </p>
                    </div>
                </div>

                <div className="hero-decoration">
                    <FaUtensils />
                    <FaHandHoldingHeart />
                    <FaTruck />
                </div>
            </div>

            {/* Statistics */}
            <div className="impact-section-title">
                <h2>Impact Overview</h2>
                <p>
                    A summary of food redistribution activities across the platform.
                </p>
            </div>

            <div className="impact-stats-grid">

                {stats.map((stat, index) => (
                    <div
                        className={`impact-card ${stat.className}`}
                        key={index}
                    >

                        <div className="impact-card-top">

                            <div className="impact-card-icon">
                                {stat.icon}
                            </div>

                            <span className="impact-card-arrow">
                                <FaArrowRight />
                            </span>

                        </div>

                        <div className="impact-card-value">
                            {stat.value.toLocaleString()}
                            <span>{stat.suffix}</span>
                        </div>

                        <h3>{stat.title}</h3>

                        <p>{stat.description}</p>

                    </div>
                ))}

            </div>

            {/* Impact Summary */}
            <div className="impact-summary">

                <div className="summary-icon">
                    <FaHandHoldingHeart />
                </div>

                <div className="summary-content">
                    <h2>Making a Difference Together</h2>

                    <p>
                        Beyond Waste connects donors, receivers, volunteers and
                        communities to reduce food waste and ensure surplus food
                        reaches people who need it.
                    </p>

                    <div className="summary-stats">

                        <div>
                            <strong>
                                {impact.totalDonors}
                            </strong>
                            <span>Donors</span>
                        </div>

                        <div>
                            <strong>
                                {impact.totalReceivers}
                            </strong>
                            <span>Receivers</span>
                        </div>

                        <div>
                            <strong>
                                {impact.totalMatches}
                            </strong>
                            <span>Matches</span>
                        </div>

                        <div>
                            <strong>
                                {impact.totalCompletedDeliveries}
                            </strong>
                            <span>Deliveries</span>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};
