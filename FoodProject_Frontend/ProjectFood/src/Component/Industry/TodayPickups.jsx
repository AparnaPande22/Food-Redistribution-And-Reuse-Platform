import { useEffect, useState } from "react";
import {
  FaTruck,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";

import "../../css/todayPickups.css";

const TodayPickups = () => {

  const [pickups, setPickups] = useState([]);

  useEffect(() => {

    // Replace with API

    /*
    axios.get("/api/biogas/pickups/today")
    .then(res=>{
        setPickups(res.data);
    });
    */

    setPickups([
      {
        id: 1,
        donor: "ABC Restaurant",
        city: "Pune",
        time: "10:30 AM",
      },
      {
        id: 2,
        donor: "Hotel Taj",
        city: "Mumbai",
        time: "12:00 PM",
      },
      {
        id: 3,
        donor: "Food Plaza",
        city: "Nagpur",
        time: "3:00 PM",
      },
    ]);

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