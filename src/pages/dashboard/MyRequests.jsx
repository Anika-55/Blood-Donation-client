import { useEffect, useState } from "react";
import { API_BASE, getAuthHeaders } from "../../utils/api";

export default function MyRequests() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [requests, setRequests] = useState([]); // always start as array

  useEffect(() => {
    if (!user?.id) return;

    fetch(`${API_BASE}/api/donation-requests?userId=${user.id}`, {
      headers: getAuthHeaders(),
    })
      .then((res) => res.json())
      .then((data) => {
        // data might be array directly
        setRequests(Array.isArray(data) ? data : data.requests || []);
      })
      .catch((err) => console.error("Failed to fetch requests:", err));
  }, [user]);

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
          {requests?.map((req) => (
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
          )) || (
            <tr>
              <td colSpan="6" className="text-center py-2">
                No requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
