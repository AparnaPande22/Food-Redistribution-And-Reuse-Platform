import { useEffect, useState } from "react";
import donationService from "../../services/donationService";
import "./dashboard.css";

function RecentDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      const data = await donationService.getAllRequests();
      setDonations(Array.isArray(data) ? data.slice(0, 5) : []);
    } catch (err) {
      console.log("Error loading recent donations:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="table-card">
      <h2>Recent Food Surplus Listings</h2>

      {loading ? (
        <p>Loading recent listings...</p>
      ) : donations.length === 0 ? (
        <p>No recent listings found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Food Item / Description</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {donations.map((item) => (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td>{item.title || item.foodType || "Food Surplus"}</td>
                <td>{item.quantity} {item.unit || "kg/meals"}</td>
                <td>
                  <span className="status">{item.status || "ACTIVE"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecentDonations;
