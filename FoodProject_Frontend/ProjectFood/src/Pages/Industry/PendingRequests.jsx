import { useEffect, useState } from "react";
import "../../css/industryTable.css";

const PendingRequests = () => {

    const [requests, setRequests] = useState([]);

    useEffect(() => {

        // Replace with your API later

        /*
        getPendingRequests().then(res=>{
            setRequests(res.data);
        });
        */

        setRequests([
            {
                id: 1025,
                donorId: 1,
                donorName: "ABC Restaurant",
                city: "Baner, Pune",
                wasteType: "Vegetable Waste",
                quantity: 50,
                pickupDate: "30 Jul 2026",
                pickupTime: "03:00 PM",
                amount: 500
            },
            {
                id: 1026,
                donorId: 2,
                donorName: "Hotel Green Leaf",
                city: "Pimpri, Pune",
                wasteType: "Fruit Waste",
                quantity: 80,
                pickupDate: "30 Jul 2026",
                pickupTime: "04:00 PM",
                amount: 800
            },
            {
                id: 1027,
                donorId: 3,
                donorName: "City Food Court",
                city: "Kothrud, Pune",
                wasteType: "Cooked Food",
                quantity: 120,
                pickupDate: "31 Jul 2026",
                pickupTime: "10:00 AM",
                amount: 1200
            },
            {
                id: 1028,
                donorId: 4,
                donorName: "Fresh & More Store",
                city: "Wakad, Pune",
                wasteType: "Mixed Waste",
                quantity: 70,
                pickupDate: "31 Jul 2026",
                pickupTime: "02:00 PM",
                amount: 700
            }
        ]);

    }, []);

    import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const viewDetails = (request) => {

    navigate("/industry/request-details", {
        state: request
    });

};

const payNow = (request) => {

    navigate("/payment", {

        state: {

            donorId: request.donorId,

            donorName: request.donorName,

            industryId: 2, // Logged-in Industry ID

            industryName: "Green Biogas Plant",

            foodName: request.wasteType,

            quantity: request.quantity,

            amount: request.amount

        }

    });

};

    return (

        <div className="table-card">

            <div className="table-header">

                <h2>Pending Requests</h2>

                <button>View All</button>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Donor</th>

                        <th>Waste</th>

                        <th>Quantity</th>

                        <th>Pickup</th>

                        <th>Amount</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        requests.map((request) => (

                            <tr key={request.id}>

                                <td>

                                    #BW-{request.id}

                                </td>

                                <td>

                                    <strong>{request.donorName}</strong>

                                    <br />

                                    <small>{request.city}</small>

                                </td>

                                <td>

                                    <span
                                        className={
                                            "badge " +
                                            request.wasteType
                                                .replace(/\s/g, "")
                                                .toLowerCase()
                                        }
                                    >

                                        {request.wasteType}

                                    </span>

                                </td>

                                <td>

                                    {request.quantity} KG

                                </td>

                                <td>

                                    {request.pickupDate}

                                    <br />

                                    <small>{request.pickupTime}</small>

                                </td>

                                <td>

                                    ₹{request.amount}

                                </td>

                                <td>

                                    <button
                                        className="view-btn"
                                        onClick={() => viewDetails(request)}
                                    >

                                        View Details

                                    </button>

                                    <button
                                        className="pay-btn"
                                        onClick={() => payNow(request)}
                                    >

                                        Pay Now

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default PendingRequests;