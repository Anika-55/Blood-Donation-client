// src/pages/dashboard/HomeDashboard.jsx
import { useEffect, useState } from "react";
import { API_BASE, getAuthHeaders } from "../../utils/api";

export default function HomeDashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    async function fetchRecentRequests() {
      try {
        const res = await fetch(
          `${API_BASE}/api/donation-requests?userId=${user._id}&limit=3`,
          {
            headers: getAuthHeaders(),
          }
        );
        const data = await res.json();
        // If API returns array directly, use data || []
        setRecentRequests(data.requests || data || []);
      } catch (err) {
        console.error(err);
        setRecentRequests([]);
      }
    }

    fetchRecentRequests();
  }, [user]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        Welcome, {user.name || "User"}!
      </h1>

      {recentRequests.length > 0 ? (
        <div>
          <h2 className="font-semibold mb-2">Recent Donation Requests</h2>
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
              {recentRequests.map((req) => (
                <tr key={req._id} className="border">
                  <td>{req.recipientName}</td>
                  <td>
                    {req.location?.district || "-"},{" "}
                    {req.location?.upazila || "-"}
                  </td>
                  <td>{req.date || "-"}</td>
                  <td>{req.time || "-"}</td>
                  <td>{req.bloodGroup || "-"}</td>
                  <td>{req.status || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No recent donation requests.</p>
      )}
    </div>
  );
}
