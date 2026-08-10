import { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaTruck,
  FaLeaf,
} from "react-icons/fa";

import "../../css/requestProgress.css";

const RequestProgress = ({ request }) => {

  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (request) {
      setStatus(request.status);
    }
  }, [request]);

  // BUGFIX: these steps previously used fictional status values
  // ("ACCEPTED" / "PROCESSING" / "RECEIVED" / "COMPLETED") that never
  // matched the backend's real RequestStatus enum, so getIndex() always
  // returned -1 and no step was ever shown as active/completed - the
  // progress bar was permanently stuck at the start regardless of the
  // donation's real status.
  const steps = [
    {
      title: "Marked for Waste",
      value: "MARKED_FOR_WASTE",
      icon: <FaClipboardList />,
    },
    {
      title: "Assigned to Partner",
      value: "WASTE_ASSIGNED",
      icon: <FaTruck />,
    },
    {
      title: "Processed",
      value: "WASTE_PROCESSED",
      icon: <FaLeaf />,
    },
  ];

  const getIndex = () => steps.findIndex((x) => x.value === status);

  if (!request) {
    return (
      <div className="progress-card">
        <h2>📈 Request Progress</h2>
        <p>No Request Selected</p>
      </div>
    );
  }

  if (status !== "MARKED_FOR_WASTE" && status !== "WASTE_ASSIGNED" && status !== "WASTE_PROCESSED") {
    return (
      <div className="progress-card">
        <h2>📈 Request Progress</h2>
        <p>This donation is not in the waste pipeline (status: {status}).</p>
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

};

export default RequestProgress;
