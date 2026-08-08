
import React, {
  useState,
  useEffect,
  useRef
} from "react";

import "./ReceiverDashboard.css";

import receiverService from "../services/receiverService";

import { useNavigate } from "react-router-dom";

import {
  FaUtensils,
  FaHandshake,
  FaTruck,
  FaHistory,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaSignOutAlt,
  FaSearch,
  FaExclamationTriangle
} from "react-icons/fa";


function ReceiverDashboard() {

  const navigate = useNavigate();

  // ======================================================
  // USER
  // ======================================================

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {

    try {

      const storedUser =
        JSON.parse(
          localStorage.getItem("user") || "{}"
        );

      console.log(
        "CURRENT USER:",
        storedUser
      );

      setCurrentUser(storedUser);

    } catch (error) {

      console.error(
        "Unable to read current user:",
        error
      );

      setCurrentUser({});
    }

  }, []);


  // ======================================================
  // TABS
  // ======================================================

  const [activeTab, setActiveTab] =
    useState("browse");


  // ======================================================
  // DATA
  // ======================================================

  const [availableFood, setAvailableFood] =
    useState([]);

  const [myRequests, setMyRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");


  // ======================================================
  // REQUEST MODAL
  // ======================================================

  const [showRequestModal, setShowRequestModal] =
    useState(false);


  const [requestForm, setRequestForm] =
    useState({

      foodType: "Surplus Food",

      estimatedMeals: 10,

      pickupAddress: "",

      neededBy: "",

      remarks: ""
    });


  // ======================================================
  // DELIVERY TRACKING
  // ======================================================

  const [selectedDeliveryTrack, setSelectedDeliveryTrack] =
    useState(null);


  const searchInputRef =
    useRef(null);


  // ======================================================
  // LOAD DATA
  // ======================================================

  useEffect(() => {

    fetchAvailableFood();

  }, []);


  useEffect(() => {

    if (currentUser?.userId) {

      fetchMyRequests();

    }

  }, [currentUser?.userId]);


  // ======================================================
  // GET ACTIVE FOOD
  // ======================================================

  const fetchAvailableFood = async () => {

    setLoading(true);
    setError(null);

    try {

      const data =
        await receiverService.getActiveRequests();

      console.log(
        "ACTIVE REQUESTS:",
        data
      );

      setAvailableFood(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      console.error(
        "Error loading available food:",
        err
      );

      setAvailableFood([]);

      setError(
        "Unable to load available food."
      );

    } finally {

      setLoading(false);
    }
  };


  // ======================================================
  // GET MY REQUESTS
  // ======================================================

  const fetchMyRequests = async () => {

    if (!currentUser?.userId) {
      return;
    }

    try {

      const data =
        await receiverService.getMyRequests(
          currentUser.userId
        );

      console.log(
        "MY REQUESTS:",
        data
      );

      setMyRequests(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      console.error(
        "Error loading my requests:",
        err
      );

      setMyRequests([]);
    }
  };


  // ======================================================
  // FORM HANDLER
  // ======================================================

  const handleFormChange = (event) => {

    const {
      name,
      value
    } = event.target;

    setRequestForm(
      (previous) => ({
        ...previous,
        [name]: value
      })
    );
  };


  // ======================================================
  // OPEN NEW REQUEST MODAL
  // ======================================================

  const openRequestModal = () => {

    setRequestForm({

      foodType: "Surplus Food",

      estimatedMeals: 10,

      pickupAddress: "",

      neededBy: "",

      remarks: ""
    });

    setShowRequestModal(true);
  };


  // ======================================================
  // CREATE RECEIVER REQUEST
  // ======================================================

  const handleCreateNewRequest = async (event) => {

    event.preventDefault();

    // --------------------------------------------------
    // CHECK LOGIN
    // --------------------------------------------------

    if (!currentUser?.userId) {

      alert(
        "User information not found. Please login again."
      );

      return;
    }


    // --------------------------------------------------
    // VALIDATION
    // --------------------------------------------------

    if (!requestForm.foodType.trim()) {

      alert(
        "Please enter food category/type."
      );

      return;
    }


    if (
      !requestForm.estimatedMeals ||
      Number(requestForm.estimatedMeals) <= 0
    ) {

      alert(
        "Estimated meals must be greater than 0."
      );

      return;
    }


    if (!requestForm.pickupAddress.trim()) {

      alert(
        "Please enter pickup/delivery address."
      );

      return;
    }


    if (!requestForm.neededBy) {

      alert(
        "Please select Needed By date and time."
      );

      return;
    }


    // --------------------------------------------------
    // CHECK FUTURE DATE
    // --------------------------------------------------

    const neededByDate =
      new Date(
        requestForm.neededBy
      );


    if (
      Number.isNaN(
        neededByDate.getTime()
      )
    ) {

      alert(
        "Please select a valid Needed By date."
      );

      return;
    }


    if (
      neededByDate <= new Date()
    ) {

      alert(
        "Needed By date/time must be in the future."
      );

      return;
    }


    // --------------------------------------------------
    // PAYLOAD
    // --------------------------------------------------

    const payload = {

      userId:
        Number(currentUser.userId),

      requestType:
        "RECEIVER",

      status:
        "DRAFT",

      mealPreference:
        requestForm.foodType.trim(),

      estimatedMeals:
        Number(
          requestForm.estimatedMeals
        ),

      pickUpAddress:
        requestForm.pickupAddress.trim(),

      deliveryAvailable:
        true,

      neededBy:
        neededByDate.toISOString(),

      notes:
        requestForm.remarks?.trim()
          ? requestForm.remarks.trim()
          : null,

      latitude:
        null,

      longitude:
        null
    };


    console.log(
      "========== REQUEST PAYLOAD =========="
    );

    console.log(
      JSON.stringify(
        payload,
        null,
        2
      )
    );


    // --------------------------------------------------
    // API CALL
    // --------------------------------------------------

    try {

      const response =
        await receiverService.createFoodRequest(
          payload
        );


      console.log(
        "========== CREATE REQUEST SUCCESS =========="
      );

      console.log(
        response
      );


      alert(
        "Food requirement request created successfully!"
      );


      setShowRequestModal(false);


      // Reset form

      setRequestForm({

        foodType:
          "Surplus Food",

        estimatedMeals:
          10,

        pickupAddress:
          "",

        neededBy:
          "",

        remarks:
          ""
      });


      // Refresh data

      await fetchMyRequests();

      setActiveTab(
        "myRequests"
      );

    } catch (err) {

      console.error(
        "========== CREATE REQUEST ERROR =========="
      );


      console.error(
        "Status:",
        err.response?.status
      );


      console.error(
        "Backend response:",
        err.response?.data
      );


      console.error(
        "Full error:",
        err
      );


      const backendError =
        err.response?.data;


      if (
        typeof backendError ===
        "string"
      ) {

        alert(
          backendError
        );

      } else if (
        backendError?.message
      ) {

        alert(
          backendError.message
        );

      } else {

        alert(
          "Failed to create request. Please check the console."
        );
      }
    }
  };


  // ======================================================
  // CLAIM / MATCH FOOD
  // ======================================================

  const handleRequestClaim = async (
    foodItem
  ) => {

    if (!currentUser?.userId) {

      alert(
        "Please login as a Receiver first."
      );

      return;
    }


    const donationRequestId =
      foodItem.requestId ||
      foodItem.id;


    if (!donationRequestId) {

      alert(
        "Donation Request ID not found."
      );

      return;
    }


    /*
     * Backend MatchDTO requires:
     *
     * donationRequestId
     * receiverRequestId
     * matchedBy
     *
     * Therefore the receiver must have
     * an existing receiver request.
     */

    let receiverRequestId = null;


    const ownReceiverRequests =
      myRequests.filter(
        (request) =>
          request.requestType ===
          "RECEIVER"
      );


    if (
      ownReceiverRequests.length > 0
    ) {

      /*
       * Prefer the newest request.
       */

      const sortedRequests =
        [...ownReceiverRequests].sort(
          (a, b) =>
            new Date(
              b.createdAt || 0
            ) -
            new Date(
              a.createdAt || 0
            )
        );


      receiverRequestId =
        sortedRequests[0].requestId ||
        sortedRequests[0].id;
    }


    if (!receiverRequestId) {

      alert(
        "Please create a receiver food request first. Your receiver request is required before matching with a donation."
      );

      setActiveTab(
        "myRequests"
      );

      return;
    }


    const confirmed =
      window.confirm(
        "Do you want to request this food donation?"
      );


    if (!confirmed) {
      return;
    }


    try {

      const response =
        await receiverService.createMatch(
          donationRequestId,
          receiverRequestId,
          currentUser.userId
        );


      console.log(
        "MATCH CREATED:",
        response
      );


      alert(
        "Match request sent successfully!"
      );


      await fetchMyRequests();

      await fetchAvailableFood();

    } catch (err) {

      console.error(
        "Failed to create match:",
        err
      );


      console.error(
        "Backend response:",
        err.response?.data
      );


      alert(
        err.response?.data?.message ||
        err.response?.data ||
        "Unable to create match request."
      );
    }
  };


  // ======================================================
  // TRACK DELIVERY
  // ======================================================

  const handleTrackDelivery =
    async (deliveryId) => {

      if (!deliveryId) {

        alert(
          "Delivery ID not found."
        );

        return;
      }


      try {

        const trackInfo =
          await receiverService.trackDelivery(
            deliveryId
          );


        setSelectedDeliveryTrack(
          trackInfo || {
            status: "IN_TRANSIT",
            message:
              "Delivery is on the way!"
          }
        );

      } catch (err) {

        console.error(
          "Tracking error:",
          err
        );


        setSelectedDeliveryTrack({

          status:
            "IN_TRANSIT",

          message:
            "Delivery is on the way!"
        });
      }
    };


  // ======================================================
  // CANCEL REQUEST
  // ======================================================

  const handleCancelRequest =
    async (requestId) => {

      if (!requestId) {
        return;
      }


      const confirmed =
        window.confirm(
          "Are you sure you want to cancel this request?"
        );


      if (!confirmed) {
        return;
      }


      try {

        await receiverService.cancelRequest(
          requestId
        );


        alert(
          "Request cancelled successfully."
        );


        await fetchMyRequests();

      } catch (err) {

        console.error(
          "Cancel request error:",
          err
        );


        alert(
          err.response?.data?.message ||
          err.response?.data ||
          "Unable to cancel request."
        );
      }
    };


  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };


  // ======================================================
  // FILTER FOOD
  // ======================================================

  const filteredFood =
    availableFood.filter(
      (item) => {

        const term =
          searchTerm
            .toLowerCase()
            .trim();


        if (!term) {
          return true;
        }


        const foodType =
          (
            item.foodType ||
            item.mealPreference ||
            ""
          ).toLowerCase();


        const address =
          (
            item.pickupAddress ||
            item.pickUpAddress ||
            ""
          ).toLowerCase();


        const donor =
          (
            item.donorName ||
            ""
          ).toLowerCase();


        return (
          foodType.includes(term) ||
          address.includes(term) ||
          donor.includes(term)
        );
      }
    );


  // ======================================================
  // HELPER FUNCTIONS
  // ======================================================

  const getRequestId =
    (request) =>
      request.requestId ||
      request.id;


  const getFoodType =
    (request) =>
      request.foodType ||
      request.mealPreference ||
      "Food";


  const getAddress =
    (request) =>
      request.pickupAddress ||
      request.pickUpAddress ||
      "-";


  // ======================================================
  // RENDER
  // ======================================================

  return (

    <div className="receiver-dashboard">

      {/* ==================================================
                SIDEBAR
            ================================================== */}
      <div className="receiver-sidebar">

        <div>
          <div className="receiver-brand">
            ♻ Beyond Waste
          </div>

          <ul className="receiver-menu">

            <li
              className={activeTab === "browse" ? "active" : ""}
              onClick={() => setActiveTab("browse")}
            >
              <FaUtensils />
              <span>Browse Food</span>
            </li>

            <li
              className={activeTab === "myRequests" ? "active" : ""}
              onClick={() => setActiveTab("myRequests")}
            >
              <FaHandshake />
              <span>My Requests & Matches</span>
            </li>

            <li
              className={activeTab === "deliveries" ? "active" : ""}
              onClick={() => setActiveTab("deliveries")}
            >
              <FaTruck />
              <span>Track Deliveries</span>
            </li>

          </ul>
        </div>

        <ul className="receiver-menu receiver-menu-bottom">
          <li onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Sign Out</span>
          </li>
        </ul>

      </div>


      {/* ==================================================
                MAIN CONTENT
            ================================================== */}

      <div className="receiver-main">

        {/* HEADER */}

        <div className="receiver-header">

          <div>

            <h1>
              Receiver Portal
            </h1>

            <p
              style={{
                margin: 0,
                color: "#6b7280"
              }}
            >
              Welcome back,{" "}
              {
                currentUser.name ||
                "Receiver Partner"
              }
            </p>

          </div>


          <div className="receiver-user-badge">

            <span>

              Role:{" "}

              <strong>
                {
                  currentUser.accountType ||
                  "RECEIVER"
                }
              </strong>

            </span>

          </div>

        </div>


        {/* ==================================================
                    STATS
                ================================================== */}

        <div className="receiver-stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              <FaUtensils />
            </div>

            <div className="stat-info">

              <h3>
                {
                  availableFood.length
                }
              </h3>

              <p>
                Available Listings
              </p>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              <FaHandshake />
            </div>

            <div className="stat-info">

              <h3>
                {
                  myRequests.length
                }
              </h3>

              <p>
                My Total Requests
              </p>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              <FaClock />
            </div>

            <div className="stat-info">

              <h3>

                {
                  myRequests.filter(
                    (r) =>
                      r.status ===
                      "PENDING" ||
                      r.status ===
                      "ACTIVE" ||
                      r.status ===
                      "SUBMITTED" ||
                      r.status ===
                      "APPROVED"
                  ).length
                }

              </h3>

              <p>
                Active Requests
              </p>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              <FaCheckCircle />
            </div>

            <div className="stat-info">

              <h3>

                {
                  myRequests.filter(
                    (r) =>
                      r.status ===
                      "COMPLETED"
                  ).length
                }

              </h3>

              <p>
                Completed Requests
              </p>

            </div>

          </div>

        </div>


        {/* ==================================================
                    ERROR
                ================================================== */}

        {error && (

          <div
            style={{
              padding: "1rem",
              marginBottom: "1rem",
              background:
                "#fee2e2",
              color:
                "#991b1b",
              borderRadius:
                "8px"
            }}
          >

            <FaExclamationTriangle />

            {" "}

            {error}

          </div>

        )}


        {/* ==================================================
                    BROWSE TAB
                ================================================== */}

        {activeTab === "browse" && (

          <div className="receiver-content-card">

            <div className="card-header-flex">

              <h2>
                Available Surplus Food Listings
              </h2>


              <div
                style={{
                  display:
                    "flex",
                  gap:
                    "1rem",
                  alignItems:
                    "center"
                }}
              >

                <div
                  style={{
                    position:
                      "relative"
                  }}
                >

                  <input

                    ref={
                      searchInputRef
                    }

                    type="text"

                    placeholder=
                    "Search food, city, donor..."

                    value={
                      searchTerm
                    }

                    onChange={
                      (e) =>
                        setSearchTerm(
                          e.target.value
                        )
                    }

                    style={{
                      padding:
                        "0.5rem 0.75rem 0.5rem 2rem",

                      borderRadius:
                        "6px",

                      border:
                        "1px solid #d1d5db"
                    }}

                  />

                  <FaSearch

                    style={{
                      position:
                        "absolute",

                      left:
                        "10px",

                      top:
                        "12px",

                      color:
                        "#9ca3af"
                    }}

                  />

                </div>


                <button

                  className=
                  "btn-primary-custom"

                  onClick={
                    openRequestModal
                  }

                >

                  <FaPlus />

                  {" "}

                  Request Custom Food

                </button>

              </div>

            </div>


            {loading ? (

              <p>
                Loading available food items...
              </p>

            ) : filteredFood.length > 0 ? (

              <div className="food-grid">

                {filteredFood.map(
                  (food) => {

                    const id =
                      getRequestId(
                        food
                      );

                    return (

                      <div
                        key={id}
                        className="food-card"
                      >

                        <div>

                          <span
                            className=
                            "food-badge active"
                          >

                            {
                              getFoodType(
                                food
                              )
                            }

                          </span>


                          <h3
                            className=
                            "food-card-title"
                          >

                            {
                              food.estimatedMeals
                                ? `${food.estimatedMeals} Meals Available`
                                : "Surplus Meal Batch"
                            }

                          </h3>


                          <div
                            className=
                            "food-card-details"
                          >

                            <p
                              style={{
                                margin:
                                  "4px 0"
                              }}
                            >

                              <strong>
                                Donor:
                              </strong>{" "}

                              {
                                food.donorName ||
                                "Community Donor"
                              }

                            </p>


                            <p
                              style={{
                                margin:
                                  "4px 0"
                              }}
                            >

                              <strong>
                                Location:
                              </strong>{" "}

                              {
                                getAddress(
                                  food
                                )
                              }

                            </p>


                            {(
                              food.remarks ||
                              food.notes
                            ) && (

                                <p
                                  style={{
                                    margin:
                                      "4px 0"
                                  }}
                                >

                                  <strong>
                                    Notes:
                                  </strong>{" "}

                                  {
                                    food.remarks ||
                                    food.notes
                                  }

                                </p>

                              )}

                          </div>

                        </div>


                        <button

                          className=
                          "btn-primary-custom"

                          style={{
                            width:
                              "100%",

                            justifyContent:
                              "center"
                          }}

                          onClick={() =>
                            handleRequestClaim(
                              food
                            )
                          }

                        >

                          <FaHandshake />

                          {" "}

                          Request / Claim Food

                        </button>

                      </div>

                    );
                  }
                )}

              </div>

            ) : (

              <div
                style={{
                  textAlign:
                    "center",

                  padding:
                    "2rem",

                  color:
                    "#6b7280"
                }}
              >

                <FaUtensils
                  size={40}
                  style={{
                    marginBottom:
                      "1rem",
                    color:
                      "#d1d5db"
                  }}
                />

                <p>
                  No active food listings available right now.
                </p>


                <button
                  className=
                  "btn-primary-custom"

                  onClick={
                    openRequestModal
                  }
                >

                  <FaPlus />

                  {" "}

                  Submit a Need Request

                </button>

              </div>

            )}

          </div>

        )}


        {/* ==================================================
                    MY REQUESTS TAB
                ================================================== */}

        {activeTab === "myRequests" && (

          <div className="receiver-content-card">

            <div className="card-header-flex">

              <h2>
                My Food Requests & Match Status
              </h2>


              <button
                className=
                "btn-primary-custom"

                onClick={
                  fetchMyRequests
                }
              >

                Refresh Requests

              </button>

            </div>


            {myRequests.length > 0 ? (

              <table className="receiver-table">

                <thead>

                  <tr>

                    <th>
                      Req ID
                    </th>

                    <th>
                      Food Details
                    </th>

                    <th>
                      Estimated Meals
                    </th>

                    <th>
                      Pickup Address
                    </th>

                    <th>
                      Needed By
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Created Date
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {myRequests.map(
                    (req) => {

                      const requestId =
                        getRequestId(
                          req
                        );


                      return (

                        <tr
                          key={
                            requestId
                          }
                        >

                          <td>
                            #
                            {
                              requestId
                            }
                          </td>


                          <td>
                            {
                              getFoodType(
                                req
                              )
                            }
                          </td>


                          <td>
                            {
                              req.estimatedMeals ||
                              0
                            }
                          </td>


                          <td>
                            {
                              getAddress(
                                req
                              )
                            }
                          </td>


                          <td>

                            {req.neededBy
                              ? new Date(
                                req.neededBy
                              ).toLocaleString()
                              : "-"}

                          </td>


                          <td>

                            <span
                              className={`badge-status ${req.status ||
                                "PENDING"
                                }`}
                            >

                              {
                                req.status ||
                                "PENDING"
                              }

                            </span>

                          </td>


                          <td>

                            {
                              req.createdAt
                                ? new Date(
                                  req.createdAt
                                ).toLocaleDateString()
                                : "Recently"
                            }

                          </td>


                          <td>

                            {req.deliveryId && (

                              <button

                                className=
                                "btn-primary-custom"

                                style={{
                                  padding:
                                    "0.3rem 0.6rem",

                                  fontSize:
                                    "0.8rem"
                                }}

                                onClick={() =>
                                  handleTrackDelivery(
                                    req.deliveryId
                                  )
                                }

                              >

                                <FaTruck />

                                {" "}

                                Track

                              </button>

                            )}


                            {(
                              req.status ===
                              "DRAFT" ||
                              req.status ===
                              "SUBMITTED" ||
                              req.status ===
                              "PENDING" ||
                              req.status ===
                              "ACTIVE"
                            ) && (

                                <button

                                  style={{
                                    marginLeft:
                                      "5px",

                                    padding:
                                      "0.3rem 0.6rem",

                                    border:
                                      "none",

                                    borderRadius:
                                      "5px",

                                    cursor:
                                      "pointer"
                                  }}

                                  onClick={() =>
                                    handleCancelRequest(
                                      requestId
                                    )
                                  }

                                >

                                  Cancel

                                </button>

                              )}

                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            ) : (

              <div
                style={{
                  textAlign:
                    "center",

                  padding:
                    "2rem",

                  color:
                    "#6b7280"
                }}
              >

                <FaHistory
                  size={40}
                />

                <p>
                  No past or active requests found.
                </p>


                <button
                  className=
                  "btn-primary-custom"

                  onClick={
                    openRequestModal
                  }
                >

                  <FaPlus />

                  {" "}

                  Create Food Request

                </button>

              </div>

            )}

          </div>

        )}


        {/* ==================================================
                    DELIVERIES TAB
                ================================================== */}

        {activeTab === "deliveries" && (

          <div className="receiver-content-card">

            <div className="card-header-flex">

              <h2>
                Track Food Deliveries
              </h2>

            </div>


            <table className="receiver-table">

              <thead>

                <tr>

                  <th>
                    Request ID
                  </th>

                  <th>
                    Food Type
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {myRequests.length > 0 ? (

                  myRequests.map(
                    (req) => {

                      const requestId =
                        getRequestId(
                          req
                        );


                      return (

                        <tr
                          key={
                            requestId
                          }
                        >

                          <td>
                            #
                            {
                              requestId
                            }
                          </td>


                          <td>
                            {
                              getFoodType(
                                req
                              )
                            }
                          </td>


                          <td>

                            <span
                              className={`badge-status ${req.status ||
                                "IN_TRANSIT"
                                }`}
                            >

                              {
                                req.status ||
                                "IN_TRANSIT"
                              }

                            </span>

                          </td>


                          <td>

                            {req.deliveryId ? (

                              <button

                                className=
                                "btn-primary-custom"

                                style={{
                                  padding:
                                    "0.3rem 0.75rem"
                                }}

                                onClick={() =>
                                  handleTrackDelivery(
                                    req.deliveryId
                                  )
                                }

                              >

                                <FaTruck />

                                {" "}

                                Track Live

                              </button>

                            ) : (

                              <span
                                style={{
                                  color:
                                    "#6b7280"
                                }}
                              >
                                Delivery not assigned
                              </span>

                            )}

                          </td>

                        </tr>

                      );
                    }
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      style={{
                        textAlign:
                          "center"
                      }}
                    >

                      No active deliveries to track.

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        )}


        {/* ==================================================
                    CREATE REQUEST MODAL
                ================================================== */}

        {showRequestModal && (

          <div className="modal-backdrop">

            <div className="modal-card">

              <h2>
                Request Food Support
              </h2>


              <form
                onSubmit={
                  handleCreateNewRequest
                }
              >

                {/* FOOD TYPE */}

                <div className="form-group">

                  <label>
                    Food Category / Type
                  </label>

                  <input

                    type="text"

                    name="foodType"

                    value={
                      requestForm.foodType
                    }

                    onChange={
                      handleFormChange
                    }

                    placeholder=
                    "e.g. Cooked Meals"

                    required

                  />

                </div>


                {/* ESTIMATED MEALS */}

                <div className="form-group">

                  <label>
                    Estimated Meals Needed
                  </label>

                  <input

                    type="number"

                    name="estimatedMeals"

                    min="1"

                    value={
                      requestForm.estimatedMeals
                    }

                    onChange={
                      handleFormChange
                    }

                    required

                  />

                </div>


                {/* ADDRESS */}

                <div className="form-group">

                  <label>
                    Delivery / Pickup Address
                  </label>

                  <input

                    type="text"

                    name="pickupAddress"

                    placeholder=
                    "Enter shelter/organization address"

                    value={
                      requestForm.pickupAddress
                    }

                    onChange={
                      handleFormChange
                    }

                    required

                  />

                </div>


                {/* NEEDED BY */}

                <div className="form-group">

                  <label>
                    Needed By Date & Time
                  </label>

                  <input

                    type="datetime-local"

                    name="neededBy"

                    value={
                      requestForm.neededBy
                    }

                    onChange={
                      handleFormChange
                    }

                    min={
                      new Date()
                        .toISOString()
                        .slice(
                          0,
                          16
                        )
                    }

                    required

                  />

                </div>


                {/* REMARKS */}

                <div className="form-group">

                  <label>
                    Additional Requirements / Remarks
                  </label>

                  <textarea

                    name="remarks"

                    rows="3"

                    value={
                      requestForm.remarks
                    }

                    onChange={
                      handleFormChange
                    }

                    placeholder=
                    "Enter any additional requirements"

                  />

                </div>


                {/* BUTTONS */}

                <div
                  style={{
                    display:
                      "flex",

                    justifyContent:
                      "flex-end",

                    gap:
                      "0.75rem",

                    marginTop:
                      "1.25rem"
                  }}
                >

                  <button

                    type="button"

                    style={{
                      background:
                        "#e5e7eb",

                      color:
                        "#374151",

                      border:
                        "none",

                      padding:
                        "0.6rem 1rem",

                      borderRadius:
                        "6px",

                      cursor:
                        "pointer"
                    }}

                    onClick={() =>
                      setShowRequestModal(
                        false
                      )
                    }

                  >

                    Cancel

                  </button>


                  <button

                    type="submit"

                    className=
                    "btn-primary-custom"

                  >

                    <FaPlus />

                    {" "}

                    Submit Request

                  </button>

                </div>

              </form>

            </div>

          </div>

        )}


        {/* ==================================================
                    DELIVERY TRACKING MODAL
                ================================================== */}

        {selectedDeliveryTrack && (

          <div className="modal-backdrop">

            <div className="modal-card">

              <h2>

                <FaTruck />

                {" "}

                Delivery Status

              </h2>


              <div
                style={{
                  padding:
                    "1rem 0"
                }}
              >

                <p>

                  <strong>
                    Status:
                  </strong>{" "}

                  {
                    selectedDeliveryTrack.status ||
                    "In Transit"
                  }

                </p>


                <p>

                  <strong>
                    Current Info:
                  </strong>{" "}

                  {
                    selectedDeliveryTrack.message ||
                    selectedDeliveryTrack.location ||
                    "Volunteer has picked up the food parcel."
                  }

                </p>

              </div>


              <div
                style={{
                  textAlign:
                    "right"
                }}
              >

                <button

                  className=
                  "btn-primary-custom"

                  onClick={() =>
                    setSelectedDeliveryTrack(
                      null
                    )
                  }

                >

                  Close

                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}


export default ReceiverDashboard;

