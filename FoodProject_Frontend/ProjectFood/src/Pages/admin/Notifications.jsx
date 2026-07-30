import { FaBell } from "react-icons/fa";

function Notifications(){

    const notifications=[

        "New NGO Registration",

        "Donation Approved",

        "Delivery Completed",

        "Driver Assigned",

        "Pending Verification"

    ];

    return(

        <div className="table-card">

            <h2>

                <FaBell/>

                Notifications

            </h2>

            {

                notifications.map((item,index)=>(

                    <div
                        className="notification"
                        key={index}
                    >

                        {item}

                    </div>

                ))

            }

        </div>

    );

}

export default Notifications;