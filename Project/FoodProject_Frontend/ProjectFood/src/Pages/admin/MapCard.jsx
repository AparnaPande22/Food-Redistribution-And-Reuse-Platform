import { FaMapMarkerAlt } from "react-icons/fa";

function MapCard(){

    return(

        <div className="map-card">

            <h2>
                Geographic Distribution
            </h2>

            <p>
                Active operations across the region
            </p>

            <div className="map-placeholder">

                <FaMapMarkerAlt/>

                <h3>Interactive Map</h3>

                <p>
                    Google Maps / Leaflet Integration
                </p>

            </div>

            <button>
                Open Map Explorer
            </button>

        </div>

    );

}

export default MapCard;