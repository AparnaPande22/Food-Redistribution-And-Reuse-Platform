import "./dashboard.css";

const donations = [
  {
    donor: "Hotel Taj",
    food: "Rice & Curry",
    quantity: "120 Meals",
    status: "Delivered",
  },
  {
    donor: "Domino's",
    food: "Pizza",
    quantity: "80 Boxes",
    status: "Pending",
  },
  {
    donor: "Wedding Hall",
    food: "Dinner",
    quantity: "450 Meals",
    status: "Picked Up",
  },
];

function RecentDonations() {
  return (
    <div className="table-card">
      <h2>Recent Donations</h2>

      <table>
        <thead>
          <tr>
            <th>Donor</th>
            <th>Food</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {donations.map((item, index) => (
            <tr key={index}>
              <td>{item.donor}</td>
              <td>{item.food}</td>
              <td>{item.quantity}</td>
              <td>
                <span className="status">{item.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentDonations;