import { useState } from "react";

// BUGFIX: previously imported acceptRequest/rejectRequest/markProcessing/
// completeRequest from biogasService.js ("/api/biogas/requests/...") -
// none of which exist on the backend. Now wired to the real waste
// pipeline, and only shows actions valid for the request's actual status
// (MARKED_FOR_WASTE -> WASTE_ASSIGNED -> WASTE_PROCESSED).
import wasteService from "../../services/wasteService";

import "./RequestDetails.css";

const RequestDetails = ({ request, onStatusChange }) => {

    const [biogasGenerated, setBiogasGenerated] = useState("");
    const [fertilizerGenerated, setFertilizerGenerated] = useState("");

    if (!request) {
        return (
            <div className="details-page">
                <h2>No Request Selected</h2>
                <p>Pick a pending pickup on the left to see its details here.</p>
            </div>
        );
    }

    const reqId = request.requestId;
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    const handleAccept = async () => {
        try {
            await wasteService.assignWastePartner(reqId, currentUser.userId);
            alert("Request #" + reqId + " accepted.");
            onStatusChange?.();
        } catch (err) {
            console.error("Accept error:", err);
            alert(err.response?.data?.message || err.response?.data || "Unable to accept request.");
        }
    };

    const handleReject = async () => {
        const remark = window.prompt("Reason for rejecting this pickup (optional):", "");
        if (remark === null) return;

        try {
            await wasteService.rejectWastePickup(reqId, remark);
            alert("Request #" + reqId + " rejected.");
            onStatusChange?.();
        } catch (err) {
            console.error("Reject error:", err);
            alert(err.response?.data?.message || err.response?.data || "Unable to reject request.");
        }
    };

    const handleProcess = async () => {
        if (!biogasGenerated && !fertilizerGenerated) {
            alert("Enter at least a biogas or fertilizer amount before marking as processed.");
            return;
        }

        try {
            await wasteService.processWaste(reqId, {
                biogasGenerated: biogasGenerated ? Number(biogasGenerated) : null,
                fertilizerGenerated: fertilizerGenerated ? Number(fertilizerGenerated) : null,
            });
            alert("Request #" + reqId + " marked as processed.");
            onStatusChange?.();
        } catch (err) {
            console.error("Process error:", err);
            alert(err.response?.data?.message || err.response?.data || "Unable to update status.");
        }
    };

    const status = request.status;

    return (

        <div className="details-page">

            <div className="details-card">

                <h2>Donation Details</h2>

                <div className="row">

                    <div>
                        <label>Donation ID</label>
                        <p>#{reqId}</p>
                    </div>

                    <div>
                        <label>Status</label>
                        <span className={`status ${(status || "").toLowerCase()}`}>
                            {status}
                        </span>
                    </div>

                </div>

                <div className="row">

                    <div>
                        <label>Donor</label>
                        <p>{request.donorName}</p>
                    </div>

                    <div>
                        <label>Estimated Meals</label>
                        <p>{request.estimatedMeals}</p>
                    </div>

                </div>

                <div className="row">

                    <div>
                        <label>Pickup Address</label>
                        <p>{request.pickupAddress}</p>
                    </div>

                    <div>
                        <label>Assigned Partner</label>
                        <p>{request.wastePartnerName || "-"}</p>
                    </div>

                </div>

                {request.wasteRemarks && (
                    <div className="row">
                        <div>
                            <label>Remarks</label>
                            <p>{request.wasteRemarks}</p>
                        </div>
                    </div>
                )}

                {status === "MARKED_FOR_WASTE" && (
                    <div className="buttons">
                        <button className="accept" onClick={handleAccept}>
                            Accept
                        </button>
                        <button className="reject" onClick={handleReject}>
                            Reject
                        </button>
                    </div>
                )}

                {status === "WASTE_ASSIGNED" && (
                    <>
                        <div className="row">
                            <div>
                                <label>Biogas Generated (L)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={biogasGenerated}
                                    onChange={(e) => setBiogasGenerated(e.target.value)}
                                    placeholder="e.g. 12.5"
                                />
                            </div>
                            <div>
                                <label>Fertilizer/Compost Generated (kg)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={fertilizerGenerated}
                                    onChange={(e) => setFertilizerGenerated(e.target.value)}
                                    placeholder="e.g. 5"
                                />
                            </div>
                        </div>
                        <div className="buttons">
                            <button className="processing" onClick={handleProcess}>
                                Mark Processed
                            </button>
                        </div>
                    </>
                )}

                {status === "WASTE_PROCESSED" && (
                    <div className="buttons">
                        <span className="status completed">✓ Already Processed</span>
                    </div>
                )}

            </div>

        </div>

    );
};

export default RequestDetails;
