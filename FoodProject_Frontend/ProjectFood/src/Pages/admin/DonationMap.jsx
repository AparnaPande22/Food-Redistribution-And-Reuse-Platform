import "../../utills/leafletIcon";
import { donationIcon } from "../../utills/donationIcon";

import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";

import donationService from "../../services/donationService";

function DonationMap() {

    const [donations, setDonations] = useState([]);

    useEffect(() => {

        loadDonations();

    }, []);

    const loadDonations = async () => {

        try {

            const data = await donationService.getActiveRequests();

            console.log(data);

            setDonations(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div style={{ height: "100vh" }}>

            <MapContainer
                center={[18.5204, 73.8567]}
                zoom={7}
                style={{ height: "100%", width: "100%" }}
            >

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {

                    donations.map((donation) => (

                        <Marker
                            key={donation.id}
                            position={[
                                donation.latitude,
                                donation.longitude
                            ]}
                            icon={donationIcon}
                        >

                            <Popup>
                                <p><b>Donor:</b> {donation.user?.name}</p>
                                <p><b>Food:</b> {donation.mealPreference}</p>
                                <p><b>Meals:</b> {donation.estimatedMeals}</p>
                                <p><b>Pickup:</b> {donation.pickUpAddress}</p>
                                <p><b>Status:</b> {donation.status}</p>
                            </Popup>

                        </Marker>

                    ))

                }

            </MapContainer>

        </div>

    );

}

export default DonationMap;