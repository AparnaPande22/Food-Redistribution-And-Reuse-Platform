import { useEffect, useState } from "react";
import api from "../../services/api";
import axios from "axios";import {
  FaTruck,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";

import "../../css/todayPickups.css";

const TodayPickups = () => {

const [pickups,setPickups]=useState([]);
useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        console.log("User not found in localStorage");
        return;
    }

    api
        .get(`http://localhost:8080/food/api/waste/assigned/${user.userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => {
            setPickups(res.data);
        })
        .catch(err => {
            console.log(err);
        });

}, []);

  return (

    <div className="today-card">

      <div className="today-header">

        <h2>🚛 Today's Pickups</h2>

      </div>

      {

        pickups.map((pickup) => (

          <div
           key={pickup.requestId}
            className="pickup-item"
          >

            <div className="pickup-icon">

              <FaTruck />

            </div>

            <div className="pickup-info">

              <h4>{pickup.donorName}</h4>

              <p>

                <FaMapMarkerAlt />

                {pickup.pickupAddress}

              </p>

            </div>

            <div className="pickup-time">

              <FaClock />

           {new Date(pickup.wasteAssignedDate).toLocaleString()}

            </div>

          </div>

        ))

      }

    </div>

  );

};

export default TodayPickups;