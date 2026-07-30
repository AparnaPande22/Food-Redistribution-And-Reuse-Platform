import { useEffect, useState } from "react";
import "../../css/industryTable.css";

const PendingRequests = () => {

 const [requests,setRequests]=useState([]);

useEffect(()=>{

getPendingRequests()
.then(res=>{

setRequests(res.data);

})

},[]);

    import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const viewDetails=(request)=>{

setSelectedRequest(request);

}

const payNow=(request)=>{

navigate(
"/payment",
{
state:{

donorId:request.donorId,

industryId:request.industryId,

donorName:request.donorName,

industryName:request.industryName,

foodName:request.foodType,

quantity:request.quantity,

amount:request.amount

}
}
);

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

{requests.map(request=>(

<tr key={request.id}>

<td>{request.id}</td>

<td>{request.donorName}</td>

<td>{request.foodType}</td>

<td>{request.quantity} KG</td>

<td>₹{request.amount}</td>

<td>{request.pickupDate}</td>

<td>

<button onClick={()=>viewDetails(request)}>
View
</button>

<button onClick={()=>payNow(request)}>
Pay
</button>

</td>

</tr>

))}

</tbody>
            </table>

        </div>

    );

};

export default PendingRequests;