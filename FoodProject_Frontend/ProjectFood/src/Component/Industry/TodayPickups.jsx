import { useEffect, useState } from "react";
import axios from "axios";import {
  FaTruck,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";

import "../../css/todayPickups.css";

const TodayPickups = () => {

  const [pickups, setPickups] = useState([]);


    useEffect(() => {

    axios.get("http://localhost:8080/food/api/biogas/pickups/today")

    .then((res) => {

        setPickups(res.data);

    })

    .catch((err) => console.log(err));

}, []);

  return (

    <div className="today-card">

      <div className="today-header">

        <h2>🚛 Today's Pickups</h2>

      </div>

      {

        pickups.map((pickup) => (

          <div
            key={pickup.id}
            className="pickup-item"
          >

            <div className="pickup-icon">

              <FaTruck />

            </div>

            <div className="pickup-info">

              <h4>{pickup.donor}</h4>

              <p>

                <FaMapMarkerAlt />

                {pickup.city}

              </p>

            </div>

            <div className="pickup-time">

              <FaClock />

              {pickup.time}

            </div>

          </div>

        ))

      }

    </div>

  );

};

export default TodayPickups;