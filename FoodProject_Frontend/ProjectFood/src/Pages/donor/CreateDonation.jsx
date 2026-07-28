import { useState } from "react";
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
console.log(user);
console.log("User ID =", user.userId);
  const requestData = {
    userId: user.userId,
    requestType: "DONATION",
    status: "DRAFT",
    mealPreference: "Mixed",
    estimatedMeals: foodItems.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
    ),
    pickUpAddress: donation.pickupAddress,
    deliveryAvailable: donation.deliveryAvailable,
    neededBy: donation.expiryTime,
    notes: donation.instructions,
    items: foodItems.map(item => ({
        itemName: item.name,
        foodCategory: item.category,
        quantity: Number(item.quantity),
        unit: item.unit,
        expiryTime: donation.expiryTime
    }))
};

      await donationService.createDonation(requestData);

      resetForm();

      alert("Request Created Successfully!");
navigate("/donor/donation-submitted");
    } catch (error) {

    console.log(error);

    console.log(error.response);

    console.log(error.response?.data);

if (error.response) {
    alert(error.response.data.message || error.response.data);
} else {
    alert(error.message);
}
}finally {
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