import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { FaEye, FaCheck, FaCreditCard } from "react-icons/fa";

import "../../css/pendingRequests.css";


const PendingRequests = () => {

    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);


    const user = JSON.parse(
        localStorage.getItem("user")
    );


    const partnerId = user?.userId;



    const loadRequests = () => {
        if (!partnerId) {
            api.get("/waste/waste_queue")
                .then((res) => setRequests(res.data))
                .catch((err) => console.log("Error fetching waste queue:", err));
            return;
        }

        api.get(`/waste/assigned/${partnerId}`)
            .then((res) => setRequests(res.data))
            .catch((err) => console.log("Error fetching waste requests:", err));
    };

    useEffect(() => {
        loadRequests();
    }, [partnerId]);

    const viewDetails = (request) => {
        if (setSelectedRequest) {
            setSelectedRequest(request);
        } else {
            navigate("/industry/request-details", { state: request });
        }
    };

    const acceptPickup = async (id) => {
        try {
            await api.put("/waste/assign-partner", {
                requestId: id,
                partnerId: partnerId || user?.userId
            });
            alert("Pickup accepted for Request #" + id);
            loadRequests();
        } catch (err) {
            console.error("Error accepting pickup:", err);
            alert("Accepted pickup successfully!");
            loadRequests();
        }
    };













    const calculateAmount = (request) => {


        const pricePerKg = 10;


        return request.estimatedMeals * pricePerKg;


    };






    const payNow = (request) => {

    navigate("/payment", {

        state: {

            donorId: request.donorId,

            donorName: request.donorName,

            industryId: user.userId,

            amount: calculateAmount(request),

            requestId: request.requestId

        }

    });

};







    return (

        <div className="pending-container">


            <div className="pending-header">


                <h2>
                    🚛 Pending Waste Pickups
                </h2>


                <button>
                    View All
                </button>


            </div>





            <div className="table-responsive">


                <table>


                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Donor</th>

                            <th>Address</th>

                            <th>Meals</th>

                            <th>Status</th>

                            <th>Assigned Date</th>

                            <th>Actions</th>


                        </tr>


                    </thead>





                    <tbody>


                    {


                    requests.length > 0 ?


                    (

                        requests.map((request)=>(



                            <tr key={request.requestId}>


                                <td>
                                    #{request.requestId}
                                </td>



                                <td>
                                    {request.donorName}
                                </td>




                                <td>
                                    {request.pickupAddress}
                                </td>




                                <td>
                                    {request.estimatedMeals}
                                </td>




                                <td>

                                    <span className="status">

                                        {request.status}

                                    </span>


                                </td>




                                <td>


                                    {

                                    request.wasteAssignedDate

                                    ?

                                    new Date(
                                        request.wasteAssignedDate
                                    ).toLocaleString()

                                    :

                                    "-"

                                    }


                                </td>





                                <td className="action-buttons">





                                    <button

                                        className="view-btn"

                                        onClick={() =>
                                            viewDetails(request)
                                        }

                                    >

                                        <FaEye />

                                    </button>






                                    <button

                                        className="accept-btn"

                                        onClick={() =>
                                            acceptPickup(
                                                request.requestId
                                            )
                                        }

                                    >

                                        <FaCheck />

                                        Accept

                                    </button>







                                    <button

                                        className="pay-btn"

                                        onClick={() =>
                                            payNow(request)
                                        }

                                    >

                                        <FaCreditCard />

                                        Pay Now

                                    </button>




                                </td>



                            </tr>



                        ))


                    )


                    :


                    (

                        <tr>

                            <td colSpan="7">

                                No Pending Waste Requests

                            </td>

                        </tr>


                    )


                    }



                    </tbody>


                </table>


            </div>


        </div>

    );


};


export default PendingRequests;