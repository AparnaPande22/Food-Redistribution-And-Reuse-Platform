import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaClock,
  FaUtensils,
  FaClipboardList,
  FaPlus,
} from "react-icons/fa";

import "./CreateDonation.css";
import Sidebar from "../../Component/donor/Sidebar";
import TopNavbar from "../../Component/donor/TopNavbar";
import FoodItemCard from "../../Component/donor/FoodItemCard";
import donationService from "../../services/donationService";

function CreateDonation() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [donation, setDonation] = useState({
    preparationTime: "",
    expiryTime: "",
    pickupAddress: "",
    deliveryAvailable: false,
    instructions: "",
  });

  const [foodItems, setFoodItems] = useState([
    {
      name: "",
      category: "Cooked Meals",
      quantity: "",
      unit: "Kg",
      rating: 4,
      image: null,
      imageFile: null,
    },
  ]);
const [receiverType, setReceiverType] = useState("");

const [receiverId, setReceiverId] = useState("");

const [receivers, setReceivers] = useState([]);
  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;

    setDonation((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addItem = () => {
    setFoodItems((prev) => [
      ...prev,
      {
        name: "",
        category: "Cooked Meals",
        quantity: "",
        unit: "Kg",
        rating: 4,
        image: null,
        imageFile: null,
      },
    ]);
  };

  const removeItem = (index) => {
    setFoodItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...foodItems];
    updated[index][field] = value;
    setFoodItems(updated);
  };

  const handleRating = (index, value) => {
    const updated = [...foodItems];
    updated[index].rating = value;
    setFoodItems(updated);
  };

  const handleImage = (index, e) => {
    const file = e.target.files[0];

    if (!file) return;

    const updated = [...foodItems];
    updated[index].image = URL.createObjectURL(file);
    updated[index].imageFile = file;

    setFoodItems(updated);
  };

  const resetForm = () => {
    setDonation({
      preparationTime: "",
      expiryTime: "",
      pickupAddress: "",
      deliveryAvailable: false,
      instructions: "",
    });

    setFoodItems([
      {
        name: "",
        category: "Cooked Meals",
        quantity: "",
        unit: "Kg",
        rating: 4,
        image: null,
        imageFile: null,
      },
    ]);
  };

  const handleSubmit = async () => {
    if (!donation.pickupAddress.trim()) {
      alert("Pickup Address is required");
      return;
    }

    if (!donation.expiryTime) {
      alert("Expiry Time is required");
      return;
    }

    if (foodItems.length === 0) {
      alert("Please add at least one food item");
      return;
    }

    for (const item of foodItems) {
      if (!item.name.trim()) {
        alert("Food name is required");
        return;
      }

      if (!item.quantity || Number(item.quantity) <= 0) {
        alert("Enter a valid quantity");
        return;
      }
    }

    if (loading) return;

    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.userId) {
        alert("User session not found. Please log in again.");
        navigate("/login");
        return;
      }

      const totalMeals = foodItems.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
      );

      // Ensure ISO LocalDateTime format for Jackson (e.g. YYYY-MM-DDTHH:mm:ss)
      const expiryFormatted = donation.expiryTime.length === 16 ? `${donation.expiryTime}:00` : donation.expiryTime;

      const requestData = {
        userId: Number(user.userId),
        requestType: "DONATION",
        status: "ACTIVE",
        mealPreference: foodItems[0]?.category || "Cooked Meals",
        estimatedMeals: Number(totalMeals),
        pickUpAddress: donation.pickupAddress,
        deliveryAvailable: Boolean(donation.deliveryAvailable),
        neededBy: expiryFormatted,
        notes: `${donation.instructions || ""} (Items: ${foodItems.map(i => `${i.name} - ${i.quantity}${i.unit}`).join(", ")})`.substring(0, 499),
      };

      await donationService.createDonation(requestData);

      resetForm();

      alert("Surplus Food Listing Created Successfully!");
      navigate("/donor/donation-submitted");
    } catch (error) {
      console.log("Create donation error:", error);
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Failed to submit donation. Please verify inputs.");
      }
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="donation-page">
      <Sidebar />

      <div className="main-section">
        <TopNavbar />

        <div className="page-content">
          {/* Header */}

          <div className="page-header">
            <h1>Create Donation</h1>

            <p className="subtitle">
              Share details of your surplus food so it can be matched with
              communities in need.
            </p>
          </div>

          {/* Grid */}

          <div className="donation-grid">
            {/* LEFT */}

            <div className="left-panel">
              {/* Timing */}

              <div className="card">
                <h3>
                  <FaClock />
                  Timing & Logistics
                </h3>

                <label>Food Preparation Time</label>

                <input
                  type="datetime-local"
                  name="preparationTime"
                  value={donation.preparationTime}
                  onChange={handleInput}
                />

                <label>Expiry Time</label>

                <input
                  type="datetime-local"
                  name="expiryTime"
                  value={donation.expiryTime}
                  onChange={handleInput}
                />

            <label>Pickup Address</label>

<input
    type="text"
    name="pickupAddress"
    placeholder="Enter Pickup Address"
    value={donation.pickupAddress}
    onChange={handleInput}
/>

{/* Receiver Type */}

<div className="form-group">

    <label>Select Receiver Type</label>

    <div className="receiver-options">

        <label>

            <input
                type="radio"
                value="NGO"
                checked={receiverType === "NGO"}
                onChange={(e) => setReceiverType(e.target.value)}
            />

            NGO

        </label>

        <label>

            <input
                type="radio"
                value="BIOGAS"
                checked={receiverType === "BIOGAS"}
                onChange={(e) => setReceiverType(e.target.value)}
            />

            Biogas Industry

        </label>

        <label>

            <input
                type="radio"
                value="COMPOST"
                checked={receiverType === "COMPOST"}
                onChange={(e) => setReceiverType(e.target.value)}
            />

            Compost Industry

        </label>

    </div>

</div>

{/* Receiver Dropdown */}

<div className="form-group">

    <label>Select Receiver</label>

    <select
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
    >

        <option value="">
            Select Receiver
        </option>

        {

            receivers.map((receiver) => (

                <option
                    key={receiver.id}
                    value={receiver.id}
                >

                    {receiver.name}

                </option>

            ))

        }

    </select>

</div>

<div className="toggle">
                  <div>
                    <span className="toggle-title">
                      Delivery Available
                    </span>

                    <small>
                      Can you transport the food?
                    </small>
                  </div>

                  <label className="switch">
                    <input
                      type="checkbox"
                      name="deliveryAvailable"
                      checked={donation.deliveryAvailable}
                      onChange={handleInput}
                    />

                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              {/* Instructions */}

              <div className="card">
                <h3>
                  <FaClipboardList />
                  Special Instructions
                </h3>

                <textarea
                  rows="6"
                  name="instructions"
                  placeholder="Mention dietary restrictions, packaging details, or entry codes..."
                  value={donation.instructions}
                  onChange={handleInput}
                ></textarea>
              </div>
            </div>

            {/* RIGHT */}

            <div className="right-panel">
              <div className="card">
                <div className="food-header">
                  <h3>
                    <FaUtensils />
                    Food Items
                  </h3>

                  <button
                    type="button"
                    className="add-btn"
                    onClick={addItem}
                  >
                    <FaPlus />
                    Add Item
                  </button>
                </div>

                {foodItems.map((item, index) => (
                  <FoodItemCard
                    key={index}
                    item={item}
                    index={index}
                    handleChange={handleChange}
                    handleRating={handleRating}
                    removeItem={removeItem}
                    handleImage={handleImage}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}

          <div className="bottom-buttons">
            <button
              type="button"
              className="draft"
            >
              Save Draft
            </button>

            <button
              type="button"
              className="continue"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Continue →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateDonation;