// src/pages/dashboard/VolunteerHome.jsx
import { useEffect, useState } from "react";
import { API_BASE, getAuthHeaders } from "../../utils/api";

export default function VolunteerHome() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/donation-requests`, {
      headers: getAuthHeaders(),
    })
      .then((res) => res.json())
      .then((data) => setRequests(data.requests));
  }, []);

  const updateStatus = async (id, status) => {
    const res = await fetch(`${API_BASE}/api/donation-requests/${id}/status`, {
      method: "PUT",
      headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok)
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Donation Requests</h1>
      <table className="table-auto border">
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Blood Group</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.recipientName}</td>
              <td>
                {req.recipientDistrict}, {req.recipientUpazila}
              </td>
              <td>{req.donationDate}</td>
              <td>{req.donationTime}</td>
              <td>{req.bloodGroup}</td>
              <td>{req.status}</td>
              <td className="flex gap-2">
                {req.status === "inprogress" && (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() => updateStatus(req._id, "done")}
                    >
                      Done
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => updateStatus(req._id, "canceled")}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
