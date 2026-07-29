import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTruck,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";

import Sidebar from "../../Component/donor/Sidebar";
import TopNavbar from "../../Component/donor/TopNavbar";
import donationService from "../../services/donationService";

import "./DonationDetails.css";

function DonationDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading,setLoading]=useState(true);

    const [donation,setDonation]=useState(null);

  useEffect(() => {
    loadDonation();
}, []);

const loadDonation = async () => {
    try {
        setLoading(true);

        const response = await donationService.getDonationById(id);

        console.log(response);

        setDonation(response);

    } catch (err) {
        console.log(err);
    } finally {
        setLoading(false);
    }
};

    if(loading){

        return(
            <div className="details-loading">

                Loading...

            </div>
        );

    }

    if(!donation){

        return(
            <div className="details-loading">

                Donation Not Found

            </div>
        );

    }

    return(

<div className="details-page">

<Sidebar/>

<div className="main-section">

<TopNavbar/>

<div className="details-container">

<button
className="back-btn"
onClick={()=>navigate(-1)}
>

<FaArrowLeft/>

Back

</button>

<div className="details-card">

<div className="details-header">

<div>

<h1>

Donation #{donation.requestId}

</h1>

<p>

Created on {new Date(donation.createdAt).toLocaleDateString()}

</p>

</div>

<span className={`status ${donation.status?.toLowerCase() || ""}`}>
{donation.status}

</span>

</div>
<div className="info-grid">

<div className="info-box">

<h4>

<FaCalendarAlt/>

Expiry Time

</h4>

<p>

{new Date(donation.neededBy).toLocaleString()}

</p>

</div>

<div className="info-box">

<h4>

<FaMapMarkerAlt/>

Pickup Address

</h4>

<p>

{donation.pickUpAddress}

</p>

</div>

<div className="info-box">

<h4>

<FaTruck/>

Delivery Available

</h4>

<p>

{donation.deliveryAvailable ? "Yes":"No"}

</p>

</div>

<div className="info-box">

<h4>

<FaClipboardList/>

Instructions

</h4>

<p>

{donation.notes || "-"}

</p>

</div>

</div>
<h2 className="food-title">

Food Items

</h2>

<div className="food-grid">

{donation.items?.length > 0 ? (

    donation.items.map((item, index) => (

        <div className="food-card" key={index}>
            <img
                src={
                    item.imageUrl ||
                    "https://placehold.co/400x250?text=Food"
                }
                alt={item.itemName}
            />

            <div className="food-body">
                <h3>{item.itemName}</h3>

                <p>
                    Category : <b>{item.foodCategory}</b>
                </p>

                <p>
                    Quantity : <b>{item.quantity} {item.unit}</b>
                </p>

                <p>
                    Expiry :
                    {new Date(item.expiryTime).toLocaleString()}
                </p>
            </div>
        </div>

    ))

) : (

    <div className="no-items">
        No food items available for this donation.
    </div>

)}

</div>
<div className="timeline">

<h2>

Donation Progress

</h2>

<div className="timeline-row">

<div className="step active">

<FaCheckCircle/>

<span>

Created

</span>

</div>

<div className={`step ${donation.status!=="DRAFT"?"active":""}`}>

<FaCheckCircle/>

<span>

Matched

</span>

</div>

<div className={`step ${donation.status==="IN_TRANSIT" || donation.status==="COMPLETED"?"active":""}`}>

<FaCheckCircle/>

<span>

Pickup

</span>

</div>

<div className={`step ${donation.status==="COMPLETED"?"active":""}`}>

<FaCheckCircle/>

<span>

Completed

</span>

</div>

</div>

</div>

</div>

</div>

</div>

</div>

);

}

export default DonationDetails;