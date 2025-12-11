import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function DonationRequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // logged in user
  const [req, setReq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------------------
  // Load Donation Request
  // ---------------------------
  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/donation-requests/${id}`);

        // 1. Only donors can view
        if (user.role !== "donor") {
          setError("Access denied. Only donors can view their requests.");
          return;
        }

        // 2. Only owner donor can view
        if (user._id !== res.data.requestedBy) {
          setError("You are not allowed to view this request.");
          return;
        }

        setReq(res.data);
      } catch (err) {
        setError("Failed to load request details.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, user]);

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 font-semibold">{error}</p>;
  if (!req) return null;

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Donation Request Details</h2>

      <div className="grid gap-2">
        <p>
          <strong>Patient Name:</strong> {req.patientName}
        </p>
        <p>
          <strong>District:</strong> {req.recipientDistrict}
        </p>
        <p>
          <strong>Upazila:</strong> {req.recipientUpazila}
        </p>
        <p>
          <strong>Hospital:</strong> {req.hospitalName || "Not provided"}
        </p>
        <p>
          <strong>Address:</strong> {req.addressLine || "Not provided"}
        </p>
        <p>
          <strong>Blood Group:</strong> {req.bloodGroup}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {req.donationDate
            ? new Date(req.donationDate).toLocaleDateString()
            : "Not set"}
        </p>
        <p>
          <strong>Time:</strong> {req.donationTime || "Not set"}
        </p>
        <p>
          <strong>Message:</strong> {req.message || "No additional message"}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={
              req.status === "pending"
                ? "text-yellow-600"
                : req.status === "inprogress"
                ? "text-blue-600"
                : req.status === "completed"
                ? "text-green-600"
                : "text-gray-600"
            }
          >
            {req.status}
          </span>
        </p>
      </div>

      {/* DONOR INFO WHEN STATUS IS IN PROGRESS */}
      {req.status === "inprogress" && req.donorInfo && (
        <div className="mt-5 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Donor Information</h3>
          <p>
            <strong>Name:</strong> {req.donorInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {req.donorInfo.email}
          </p>
          <p>
            <strong>Phone:</strong> {req.donorInfo.phone}
          </p>
          <p>
            <strong>District:</strong> {req.donorInfo.district}
          </p>
          <p>
            <strong>Upazila:</strong> {req.donorInfo.upazila}
          </p>
        </div>
      )}

      {/* EDIT BUTTON */}
      {req.status === "pending" && (
        <button
          onClick={() =>
            navigate(`/dashboard/edit-donation-request/${req._id}`)
          }
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit Request
        </button>
      )}
    </div>
  );
}
