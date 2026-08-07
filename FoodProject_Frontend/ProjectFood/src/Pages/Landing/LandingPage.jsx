import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import {
  FaLeaf,
  FaTruck,
  FaHandsHelping,
  FaChartLine,
  FaBoxOpen,
  FaUsers,
  FaIndustry,
  FaArrowRight,
} from "react-icons/fa";

const stats = [
  { label: "Meals Rescued", value: "48,200+", icon: <FaBoxOpen /> },
  { label: "Active Donors", value: "312", icon: <FaUsers /> },
  { label: "Partner NGOs", value: "56", icon: <FaHandsHelping /> },
  { label: "CO₂e Avoided", value: "18.4t", icon: <FaLeaf /> },
];

const howItWorks = [
  {
    title: "Donors list surplus food",
    text: "Restaurants, kitchens, and industries log surplus food in minutes, with pickup windows and quantities.",
    icon: <FaBoxOpen />,
  },
  {
    title: "We match it to need",
    text: "Beyond Waste matches every donation to a nearby NGO or receiver based on need, distance, and freshness.",
    icon: <FaHandsHelping />,
  },
  {
    title: "Volunteers handle pickup",
    text: "A volunteer or partner driver collects and delivers the donation while the app tracks it in real time.",
    icon: <FaTruck />,
  },
  {
    title: "Impact is measured",
    text: "Every completed donation updates a live dashboard of meals saved, waste diverted, and emissions avoided.",
    icon: <FaChartLine />,
  },
];

const whoWeServe = [
  {
    title: "Restaurants & Kitchens",
    text: "Turn end-of-day surplus into meals instead of landfill weight.",
    icon: <FaIndustry />,
  },
  {
    title: "NGOs & Shelters",
    text: "Receive verified, trackable donations matched to your capacity.",
    icon: <FaHandsHelping />,
  },
  {
    title: "Volunteers",
    text: "Pick up short local runs that move food before it spoils.",
    icon: <FaTruck />,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="lp">
      {/* NAVBAR */}
      <header className="lp-nav">
        <div className="lp-nav-inner">
          <div className="lp-brand">
            <div className="lp-logo-box">♻</div>
            <span>Beyond Waste</span>
          </div>
          <nav className="lp-nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#who-we-serve">Who we serve</a>
            <a href="#impact">Impact</a>
          </nav>
          <div className="lp-nav-actions">
            <button className="lp-btn-ghost" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="lp-btn-primary" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero-text">
          <span className="lp-eyebrow">Beyond Waste</span>
          <h1>
            Good Food Should Feed <span>People</span>, Not Landfills.
          </h1>
          <p>
            We connect restaurants, industries, and kitchens with NGOs and
            volunteers so surplus food reaches people who need it &mdash;
            before it ever reaches a bin.
          </p>
          <div className="lp-hero-actions">
            <button className="lp-btn-primary lp-btn-lg" onClick={() => navigate("/register")}>
              Register <FaArrowRight />
            </button>
            <button className="lp-btn-ghost lp-btn-lg" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
        <div className="lp-hero-art" aria-hidden="true">
          <div className="lp-hero-blob" />
          <div className="lp-hero-card lp-hero-card-1">
            <FaLeaf />
            <span>Zero-waste routing</span>
          </div>
          <div className="lp-hero-card lp-hero-card-2">
            <FaTruck />
            <span>Live pickups today</span>
          </div>
        </div>
      </section>

      {/* LIVE IMPACT STRIP */}
      <section className="lp-stats" id="impact">
        <div className="lp-stats-header">
          <span className="lp-eyebrow">Live Impact</span>
        </div>
        <div className="lp-stats-grid">
          {stats.map((s) => (
            <div className="lp-stat-card" key={s.label}>
              <div className="lp-stat-icon">{s.icon}</div>
              <div className="lp-stat-value">{s.value}</div>
              <div className="lp-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="lp-section" id="how-it-works">
        <div className="lp-section-header">
          <span className="lp-eyebrow">Process</span>
          <h2>How Beyond Waste Works</h2>
          <p>From surplus to plate, in four tracked steps.</p>
        </div>
        <div className="lp-steps">
          {howItWorks.map((step, i) => (
            <div className="lp-step-card" key={step.title}>
              <div className="lp-step-icon">{step.icon}</div>
              <div className="lp-step-index">{String(i + 1).padStart(2, "0")}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="lp-section lp-section-alt" id="who-we-serve">
        <div className="lp-section-header">
          <span className="lp-eyebrow">Community</span>
          <h2>Who We Serve</h2>
          <p>Everyone in the food-rescue chain, on one platform.</p>
        </div>
        <div className="lp-serve-grid">
          {whoWeServe.map((w) => (
            <div className="lp-serve-card" key={w.title}>
              <div className="lp-serve-icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE DASHBOARD PREVIEW */}
      <section className="lp-section">
        <div className="lp-dash-panel">
          <div className="lp-dash-text">
            <span className="lp-eyebrow">Live Dashboard</span>
            <h2>Every donation, tracked end to end.</h2>
            <p>
              Donors and NGOs both see live status &mdash; from pickup
              request to delivery confirmation &mdash; on a single shared
              dashboard.
            </p>
          </div>
          <div className="lp-dash-mock" aria-hidden="true">
            <div className="lp-dash-mock-bar" />
            <div className="lp-dash-mock-row">
              <div className="lp-dash-mock-chip" />
              <div className="lp-dash-mock-chip" />
            </div>
            <div className="lp-dash-mock-chart">
              <span style={{ height: "40%" }} />
              <span style={{ height: "70%" }} />
              <span style={{ height: "55%" }} />
              <span style={{ height: "85%" }} />
              <span style={{ height: "60%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta">
        <h2>Join the Movement Beyond Waste.</h2>
        <p>Create a free account as a donor, NGO, or volunteer &mdash; it takes two minutes.</p>
        <div className="lp-hero-actions lp-cta-actions">
          <button className="lp-btn-primary lp-btn-lg" onClick={() => navigate("/register")}>
            Register <FaArrowRight />
          </button>
          <button className="lp-btn-outline lp-btn-lg" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </section>

      <footer className="lp-footer">
        <div className="lp-brand">
          <div className="lp-logo-box">♻</div>
          <span>Beyond Waste</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Beyond Waste. Good food, not landfills.</p>
      </footer>
    </div>
  );
}
