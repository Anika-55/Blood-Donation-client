// src/pages/dashboard/MyRequests.jsx
import { useEffect, useState } from "react";
import { API_BASE, getAuthHeaders } from "../../utils/api";

export default function MyRequests() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/donation-requests?userId=${user.id}`, {
      headers: getAuthHeaders(),
    })
      .then((res) => res.json())
      .then((data) => setRequests(data.requests));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">My Donation Requests</h1>
      <table className="table-auto border">
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Blood Group</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id} className="border">
              <td>{req.recipientName}</td>
              <td>
                {req.recipientDistrict}, {req.recipientUpazila}
              </td>
              <td>{req.donationDate}</td>
              <td>{req.donationTime}</td>
              <td>{req.bloodGroup}</td>
              <td>{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
