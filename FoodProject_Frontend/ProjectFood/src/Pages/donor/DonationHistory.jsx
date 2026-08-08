import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaFileDownload,
  FaLeaf,
  FaUtensils,
  FaChartLine,
  FaEye,
} from "react-icons/fa";

import Sidebar from "../../Component/donor/Sidebar";
import TopNavbar from "../../Component/donor/TopNavbar";
import donationService from "../../services/donationService";
import "./DonationHistory.css";

const PAGE_SIZE = 5;

const STATUS = {
  COMPLETED: {
    text: "Completed",
    className: "completed",
  },
  MATCHED: {
    text: "Matched",
    className: "matched",
  },
  IN_TRANSIT: {
    text: "In Transit",
    className: "transit",
  },
  PENDING: {
    text: "Pending",
    className: "pending",
  },
  DRAFT: {
    text: "Draft",
    className: "draft",
  },
  CANCELLED: {
    text: "Cancelled",
    className: "cancelled",
  },
};

const getStatus = (status) =>
  STATUS[status] || {
    text: status || "Pending",
    className: "pending",
  };

const formatDate = (date) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const formatDonationId = (id) => {
  return "#BW-" + String(id).padStart(5, "0");
};

function DonationHistory() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [donations, setDonations] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [yearFilter, setYearFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST");
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      console.log("Stored user =", user);
      console.log("User ID =", user?.userId);

      if (!user?.userId) {
        throw new Error(
          "User ID not found. Please login again."
        );
      }

      const response =
        await donationService.getMyDonations(
          user.userId
        );

      console.log("History Response =", response);

      setDonations(
        Array.isArray(response)
          ? response
          : response?.data || []
      );
    } catch (err) {
      console.error("History Error =", err);
      console.error(
        "Backend Response =",
        err.response
      );

      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to load donation history."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ===========================
     YEARS
  =========================== */

  const years = useMemo(() => {
    const list = donations
      .map((d) =>
        new Date(
          d.neededBy || d.createdAt
        ).getFullYear()
      )
      .filter(
        (year) =>
          !isNaN(year) && year > 0
      );

    return [...new Set(list)].sort(
      (a, b) => b - a
    );
  }, [donations]);

  /* ===========================
     FILTER + SORT
  =========================== */

  const filteredDonations = useMemo(() => {
    let data = [...donations];

    /* Search */

    if (search.trim()) {
      const keyword =
        search.toLowerCase();

      data = data.filter((item) => {
        const donationId =
          formatDonationId(
            item.id
          ).toLowerCase();

        const community =
          (
            item.communityName || ""
          ).toLowerCase();

        return (
          donationId.includes(keyword) ||
          community.includes(keyword)
        );
      });
    }

    /* Status */

    if (statusFilter !== "ALL") {
      data = data.filter(
        (item) =>
          item.status ===
          statusFilter
      );
    }

    /* Year */

    if (yearFilter !== "ALL") {
      data = data.filter((item) => {
        const year =
          new Date(
            item.neededBy ||
            item.createdAt
          ).getFullYear();

        return (
          year === Number(yearFilter)
        );
      });
    }

    /* Sort */

    data.sort((a, b) => {
      const dateA = new Date(
        a.neededBy || a.createdAt
      );

      const dateB = new Date(
        b.neededBy || b.createdAt
      );

      if (sortBy === "NEWEST") {
        return dateB - dateA;
      }

      return dateA - dateB;
    });

    return data;
  }, [
    donations,
    search,
    statusFilter,
    yearFilter,
    sortBy,
  ]);

  /* Reset page when filters change */

  useEffect(() => {
    setPage(1);
  }, [
    search,
    statusFilter,
    yearFilter,
  ]);

  /* ===========================
     PAGINATION
  =========================== */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredDonations.length /
      PAGE_SIZE
    )
  );

  const currentRows =
    filteredDonations.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    );

  /* ===========================
     STATISTICS
  =========================== */

  const stats = useMemo(() => {
    const completed =
      donations.filter(
        (item) =>
          item.status ===
          "COMPLETED"
      );

    const meals =
      completed.reduce(
        (sum, item) =>
          sum +
          Number(
            item.estimatedMeals ||
            0
          ),
        0
      );

    const communities = new Set(
      completed
        .map(
          (d) =>
            d.communityName
        )
        .filter(Boolean)
    ).size;

    const carbon = (
      (meals * 0.4) /
      1000
    ).toFixed(1);

    const efficiency =
      donations.length === 0
        ? 0
        : Math.round(
          (completed.length /
            donations.length) *
          100
        );

    return {
      meals,
      communities,
      carbon,
      efficiency,
    };
  }, [donations]);

  /* ===========================
     EXPORT CSV
  =========================== */

  const exportCSV = () => {
    const header = [
      "Donation ID",
      "Date",
      "Meals",
      "Community",
      "Status",
    ];

    const rows =
      filteredDonations.map((d) => [
        formatDonationId(d.id),
        formatDate(
          d.neededBy ||
          d.createdAt
        ),
        d.estimatedMeals || 0,
        d.communityName ||
        "Pending Match",
        getStatus(d.status).text,
      ]);

    const csv = [
      header,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(
              value
            ).replace(
              /"/g,
              '""'
            )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "DonationHistory.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  /* ===========================
     RENDER
  =========================== */

  return (
    <div className="history-page">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div className="main-section">

        <TopNavbar />

        <div className="page-content">

          {/* HEADER */}

          <div className="page-header">

            <div>
              <h1>
                Donation History
              </h1>

              <p>
                Review your
                environmental
                impact and
                donation
                records.
              </p>
            </div>

            <button
              className="export-btn"
              onClick={
                exportCSV
              }
            >
              <FaFileDownload />

              Export All CSV
            </button>

          </div>

          {/* FILTERS */}

          <div className="filter-section">

            {/* SEARCH */}

            <div className="search-box">

              <FaSearch className="search-icon" />

              <input
                type="text"
                placeholder="Search by Donation ID or Community..."
                value={
                  search
                }
                onChange={(e) =>
                  setSearch(
                    e.target
                      .value
                  )
                }
              />

            </div>

            {/* STATUS */}

            <div className="filter">

              <select
                value={
                  statusFilter
                }
                onChange={(e) =>
                  setStatusFilter(
                    e.target
                      .value
                  )
                }
              >
                <option value="ALL">
                  Status : All
                </option>

                <option value="COMPLETED">
                  Completed
                </option>

                <option value="MATCHED">
                  Matched
                </option>

                <option value="IN_TRANSIT">
                  In Transit
                </option>

                <option value="PENDING">
                  Pending
                </option>

                <option value="DRAFT">
                  Draft
                </option>

                <option value="CANCELLED">
                  Cancelled
                </option>
              </select>

              <FaChevronDown className="down" />

            </div>

            {/* YEAR */}

            <div className="filter">

              <select
                value={
                  yearFilter
                }
                onChange={(e) =>
                  setYearFilter(
                    e.target
                      .value
                  )
                }
              >
                <option value="ALL">
                  This Year
                </option>

                {years.map(
                  (year) => (
                    <option
                      key={
                        year
                      }
                      value={
                        year
                      }
                    >
                      {year}
                    </option>
                  )
                )}
              </select>

              <FaChevronDown className="down" />

            </div>

            {/* SORT */}

            <div className="filter">

              <select
                value={
                  sortBy
                }
                onChange={(e) =>
                  setSortBy(
                    e.target
                      .value
                  )
                }
              >
                <option value="NEWEST">
                  Sort : Newest
                </option>

                <option value="OLDEST">
                  Sort : Oldest
                </option>
              </select>

              <FaChevronDown className="down" />

            </div>

          </div>

          {/* TABLE */}

          <div className="table-card">

            {loading ? (
              <div className="loading">
                Loading Donation
                History...
              </div>
            ) : error ? (
              <div className="error">
                {error}
              </div>
            ) : filteredDonations.length ===
              0 ? (
              <div className="empty">
                No Donations Found
              </div>
            ) : (
              <>
                <div className="table-wrapper">

                  <table className="history-table">

                    <thead>
                      <tr>
                        <th>
                          Donation
                          ID
                        </th>

                        <th>
                          Date
                        </th>

                        <th>
                          Meals
                          Shared
                        </th>

                        <th>
                          Communities
                          Served
                        </th>

                        <th>
                          Status
                        </th>

                        <th>
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>

                      {currentRows.map(
                        (
                          donation
                        ) => {

                          console.log(
                            "Donation Object:",
                            donation
                          );

                          const status =
                            getStatus(
                              donation.status
                            );

                          return (
                            <tr
                              key={
                                donation.id
                              }
                            >

                              <td className="id">
                                {formatDonationId(
                                  donation.id
                                )}
                              </td>

                              <td>
                                {formatDate(
                                  donation.neededBy ||
                                  donation.createdAt
                                )}
                              </td>

                              <td>
                                <strong>
                                  {donation.estimatedMeals ||
                                    0}
                                </strong>{" "}
                                Meals
                              </td>

                              <td>
                                {donation.communityName ||
                                  (
                                    <span className="pending-text">
                                      Pending
                                      Match
                                    </span>
                                  )}
                              </td>

                              <td>
                                <span
                                  className={`status ${status.className}`}
                                >
                                  {
                                    status.text
                                  }
                                </span>
                              </td>

                              <td>
                                <button
                                  className="details-btn"
                                  onClick={() =>
                                    navigate(
                                      `/donor/donation-details/${donation.id}`
                                    )
                                  }
                                >
                                  <FaEye />

                                  Details
                                </button>
                              </td>

                            </tr>
                          );
                        }
                      )}

                    </tbody>

                  </table>

                </div>

                {/* TABLE FOOTER */}

                <div className="table-footer">

                  <div>
                    Showing{" "}
                    {filteredDonations.length ===
                      0
                      ? 0
                      : (page -
                        1) *
                      PAGE_SIZE +
                      1}{" "}
                    to{" "}
                    {Math.min(
                      page *
                      PAGE_SIZE,
                      filteredDonations.length
                    )}{" "}
                    of{" "}
                    {
                      filteredDonations.length
                    }{" "}
                    entries
                  </div>

                  <div className="pagination">

                    <button
                      disabled={
                        page ===
                        1
                      }
                      onClick={() =>
                        setPage(
                          page -
                          1
                        )
                      }
                    >
                      <FaChevronLeft />
                    </button>

                    {Array.from(
                      {
                        length:
                          totalPages,
                      },
                      (
                        _,
                        i
                      ) =>
                        i +
                        1
                    ).map(
                      (
                        number
                      ) => (
                        <button
                          key={
                            number
                          }
                          className={
                            page ===
                              number
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            setPage(
                              number
                            )
                          }
                        >
                          {
                            number
                          }
                        </button>
                      )
                    )}

                    <button
                      disabled={
                        page ===
                        totalPages
                      }
                      onClick={() =>
                        setPage(
                          page +
                          1
                        )
                      }
                    >
                      <FaChevronRight />
                    </button>

                  </div>

                </div>
              </>
            )}

          </div>

          {/* STATISTICS */}

          <div className="stats">

            <div className="stat-card green">

              <div className="icon">
                <FaLeaf />
              </div>

              <div>
                <h5>
                  Total Impact
                </h5>

                <h2>
                  {
                    stats.carbon
                  }{" "}
                  Tons
                </h2>

                <p>
                  CO₂ Saved This
                  Year
                </p>
              </div>

            </div>

            <div className="stat-card green">

              <div className="icon">
                <FaUtensils />
              </div>

              <div>
                <h5>
                  Meals Provided
                </h5>

                <h2>
                  {stats.meals}
                </h2>

                <p>
                  Across{" "}
                  {
                    stats.communities
                  }{" "}
                  Communities
                </p>
              </div>

            </div>

            <div className="stat-card orange">

              <div className="icon">
                <FaChartLine />
              </div>

              <div>
                <h5>
                  Efficiency
                  Rating
                </h5>

                <h2>
                  {
                    stats.efficiency
                  }
                  %
                </h2>

                <p>
                  Successful
                  Delivery Rate
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DonationHistory;