import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaTruck,
  FaLeaf,
  FaClipboardCheck,
} from "react-icons/fa";

import "../../css/requestProgress.css";

const RequestProgress = ({ request }) => {

  const [status, setStatus] = useState("PROCESSING");

 useEffect(() => {

    if(request){
        setStatus(request.status);
    }

}, [request]);

  const steps = [
    {
        title: "Request Accepted",
        value: "ACCEPTED",
        icon: <FaCheckCircle />,
    },
    {
        title: "Pickup In Progress",
        value: "PROCESSING",
        icon: <FaTruck />,
    },
    {
        title: "Waste Received",
        value: "RECEIVED",
        icon: <FaLeaf />,
    },
    {
        title: "Completed",
        value: "COMPLETED",
        icon: <FaClipboardCheck />,
    },
];

  const getIndex = () => {

    return steps.findIndex((x) => x.value === status);

  };
if (!request) {
    return (
        <div className="progress-card">
            <h2>📈 Request Progress</h2>
            <p>No Request Selected</p>
        </div>
    );
}

return (
    <div className="progress-card">

        <h2>📈 Request Progress</h2>

        <div className="progress-timeline">

            {steps.map((step, index) => (

                <div
                    key={index}
                    className={`progress-step ${
                        index <= getIndex() ? "active" : ""
                    }`}
                >
                    <div className="progress-icon">
                        {step.icon}
                    </div>

                    <div className="progress-text">
                        {step.title}
                    </div>

                </div>

            ))}

        </div>

    </div>
);

};   // <-- YOU ARE MISSING THIS

export default RequestProgress;

