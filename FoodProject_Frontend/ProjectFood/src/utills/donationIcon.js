import L from "leaflet";

export const donationIcon = new L.Icon({
    iconUrl: "/donation-marker.png",
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -40],
});