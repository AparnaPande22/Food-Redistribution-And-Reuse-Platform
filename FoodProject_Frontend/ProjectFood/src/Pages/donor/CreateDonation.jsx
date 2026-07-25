import { useState } from "react";
import FoodItemCard from "../../Component/donor/FoodItemCard";

import "./CreateDonation.css";
import donationService from "../../services/donationService";
import {
    FaClock,
    FaUtensils,
    FaClipboardList,
    FaPlus
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Component/donor/Sidebar";
import TopNavbar from "../../Component/donor/TopNavbar";



function CreateDonation() {
  const [foodItems, setFoodItems] = useState([
        {
            name: "",
            category: "Cooked Meals",
            quantity: "",
            unit: "Kg",
            rating: 4,
            image: null,
            imageFile: null
        }
    ]);
 const addItem = () => {

    setFoodItems([
        ...foodItems,
        {
            name: "",
            category: "Cooked Meals",
            quantity: "",
            unit: "Kg",
            rating: 4,
            image: null,
            imageFile: null
        }
    ]);

};

    const [loading, setLoading] = useState(false);
const navigate = useNavigate();

    const removeItem = (index) => {
        const list = [...foodItems];
        list.splice(index, 1);
        setFoodItems(list);
    };

    const handleChange = (index, field, value) => {
        const list = [...foodItems];
        list[index][field] = value;
        setFoodItems(list);
    };

    const handleRating = (index, value) => {
        const list = [...foodItems];
        list[index].rating = value;
        setFoodItems(list);
    };

    const handleImage = (index, e) => {
        const file = e.target.files[0];

        if (!file) return;

        const list = [...foodItems];

        list[index].image = URL.createObjectURL(file);
        list[index].imageFile = file;

        setFoodItems(list);
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

        const requestData = {
            userId: user.userId,
            requestType: "DONATION",
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

        setDonation({
    preparationTime: "",
    expiryTime: "",
    pickupAddress: "",
    deliveryAvailable: false,
    instructions: ""
});

setFoodItems([
    {
        name: "",
        category: "Cooked Meals",
        quantity: "",
        unit: "Kg",
        rating: 4,
        image: null,
        imageFile: null
    }
]);

        alert("Request Created Successfully!");
navigate("/donor/dashboard");
    } catch (error) {
        console.error(error);
        alert(
    error.response?.data?.message ||
    "Failed to Create Request"
);
    }finally{
         setLoading(false);

    }
};

    const [donation, setDonation] = useState({

    preparationTime: "",

    expiryTime: "",

    pickupAddress: "",

    deliveryAvailable: false,

    instructions: ""

});

const handleInput = (e) => {

    const { name, value, type, checked } = e.target;

    setDonation({

        ...donation,

        [name]: type === "checkbox" ? checked : value

    });



};
    return (

        <div className="donation-page">

            <Sidebar />

            <div className="main-section">

                <TopNavbar />

                <div className="page-content">

                    <h1>Create Donation</h1>

                    <p className="subtitle">
                        Share details of your surplus food so it can be matched
                        with communities in need.
                    </p>

                    <div className="donation-grid">

                        {/* LEFT */}

                        <div className="left-panel">

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
    value={donation.pickupAddress}
    onChange={handleInput}
/>

                                <div className="toggle">

                                    <span>Delivery Available</span>

                                   <input
    type="checkbox"
    name="deliveryAvailable"
    checked={donation.deliveryAvailable}
    onChange={handleInput}
/>

                                </div>

                            </div>

                            <div className="card">

                                <h3>

                                    <FaClipboardList />

                                    Special Instructions

                                </h3>

                               <textarea

    rows="6"

    name="instructions"

    value={donation.instructions}

    onChange={handleInput}

/>

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

                        </div>

                    </div>

                    <div className="bottom-buttons">

                        <button className="draft">

                            Save Draft

                        </button>

             <button
    className="continue"
    onClick={handleSubmit}
    disabled={loading}
>
    {loading ? "Submitting..." : "Continue →"}
</button>

                    </div>

                </div>

    
    );

}

export default CreateDonation;