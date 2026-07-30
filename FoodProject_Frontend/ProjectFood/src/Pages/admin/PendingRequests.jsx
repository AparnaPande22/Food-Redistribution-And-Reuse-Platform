import "./dashboard.css";

const requests = [
  {
    ngo: "Hope Foundation",
    meals: 150,
    priority: "High",
  },
  {
    ngo: "Smile Trust",
    meals: 90,
    priority: "Medium",
  },
  {
    ngo: "Care NGO",
    meals: 250,
    priority: "High",
  },
];

function PendingRequests() {
  return (
    <div className="table-card">
      <h2>Pending Requests</h2>

      {requests.map((request, index) => (
        <div className="request-card" key={index}>
          <div>
            <h4>{request.ngo}</h4>
            <p>{request.meals} Meals Required</p>
          </div>

          <button>Approve</button>
        </div>
      ))}
    </div>
  );
}

export default PendingRequests;