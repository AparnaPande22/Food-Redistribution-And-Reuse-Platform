import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaEye,
  FaLeaf,
  FaUtensils,
  FaCheckCircle,
} from "react-icons/fa";
import donationService from "../../services/donationService";
import "./DonationHistory.css";

const DonationHistory = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [yearFilter, setYearFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("NEWEST");

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await donationService.getDonationHistory(user.userId);
      setHistory(response.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load donation history.");
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = useMemo(() => {
    let data = [...history];

    if (search) {
      data = data.filter(
        (item) =>
          item.donationId?.toLowerCase().includes(search.toLowerCase()) ||
          item.pickUpAddress?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      data = data.filter((d) => d.status === statusFilter);
    }

    if (yearFilter !== "ALL") {
      data = data.filter(
        (d) => new Date(d.createdAt).getFullYear().toString() === yearFilter
      );
    }

    data.sort((a, b) => {
      if (sortOrder === "NEWEST")
        return new Date(b.createdAt) - new Date(a.createdAt);

      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    return data;
  }, [history, search, statusFilter, yearFilter, sortOrder]);

  const totalPages = Math.ceil(filteredHistory.length / rowsPerPage);

  const paginatedData = filteredHistory.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalMeals = history.reduce(
    (sum, item) => sum + (item.estimatedMeals || 0),
    0
  );

  const completed = history.filter(
    (x) => x.status === "COMPLETED"
  ).length;

  const pending = history.filter(
    (x) => x.status === "PENDING"
  ).length;

  const years = [
    ...new Set(
      history.map((item) =>
        new Date(item.createdAt).getFullYear().toString()
      )
    ),
  ];

  const getBadge = (status) => {
    switch (status) {
      case "COMPLETED":
        return "badge-success";

      case "PENDING":
        return "badge-warning";

      case "CANCELLED":
        return "badge-danger";

      case "ACCEPTED":
        return "badge-primary";

      default:
        return "badge-secondary";
    }
  };

  return (
    <div className="history-container">

      <div className="history-header">
        <div>
          <h2>Donation History</h2>
          <p>Review all your donation records.</p>
        </div>

        <button className="export-btn">
          Export CSV
        </button>
      </div>

      <div className="filter-card">

        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search Donation ID or Pickup Address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">Status : All</option>
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="ALL">This Year</option>

          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="NEWEST">Newest</option>
          <option value="OLDEST">Oldest</option>
        </select>

      </div>

      <div className="table-card">

        <table>

          <thead>
            <tr>
              <th>Donation ID</th>
              <th>Date</th>
              <th>Meals</th>
              <th>Pickup Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan="6" align="center">
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan="6" align="center">
                  No Donation Found
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr key={item.requestId}>

                  <td>{item.donationId}</td>

                  <td>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td>{item.estimatedMeals}</td>

                  <td>{item.pickUpAddress}</td>

                  <td>
                    <span className={getBadge(item.status)}>
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <button className="view-btn">
                      <FaEye />
                      View
                    </button>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

        <div className="pagination">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
          >
            Previous
          </button>

          <span>
            {currentPage} / {totalPages || 1}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
          >
            Next
          </button>

        </div>

      </div>

      <div className="summary-grid">

        <div className="summary-card green">

          <FaLeaf />

          <div>
            <h3>{history.length}</h3>
            <p>Total Donations</p>
          </div>

        </div>

        <div className="summary-card dark">

          <FaUtensils />

          <div>
            <h3>{totalMeals}</h3>
            <p>Meals Donated</p>
          </div>

        </div>

        <div className="summary-card orange">

          <FaCheckCircle />

          <div>
            <h3>{completed}</h3>
            <p>Completed Donations</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default DonationHistory;