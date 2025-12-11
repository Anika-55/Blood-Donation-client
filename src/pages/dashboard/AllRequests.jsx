// src/pages/dashboard/AllRequests.jsx
import { useEffect, useState } from "react";
import { API_BASE, getAuthHeaders } from "../../utils/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AllRequests() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all"); // pending, approved, rejected
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch all donation requests
  const fetchRequests = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/donation-requests`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Filter & search
  const filteredRequests = requests
    .filter((r) => filter === "all" || r.status === filter)
    .filter(
      (r) =>
        r.recipientName.toLowerCase().includes(search.toLowerCase()) ||
        r.location.toLowerCase().includes(search.toLowerCase()) ||
        r.bloodGroup.toLowerCase().includes(search.toLowerCase())
    );

  // Update request status (Approve / Reject / Pending)
  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/api/donation-requests/${id}`, {
        method: "PUT",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`Request ${status}`);
        fetchRequests(); // Refresh table
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
        All Blood Donation Requests 🩸
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3 sm:gap-4">
        <input
          type="text"
          placeholder="Search by recipient, location, or blood group..."
          className="input input-bordered w-full sm:w-1/2 transition-shadow focus:shadow-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-full sm:w-1/4 transition-shadow focus:shadow-lg"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
        <table className="table w-full text-center">
          <thead className="bg-gray-200">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Blood Group</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((r) => (
              <tr
                key={r._id}
                className="hover:scale-[1.01] transition-transform duration-200 hover:bg-gray-50"
              >
                <td>{r.recipientName}</td>
                <td>{r.location}</td>
                <td>{r.bloodGroup}</td>
                <td>{r.date}</td>
                <td>{r.time}</td>
                <td>
                  <span
                    className={`badge transition-colors duration-300 ${
                      r.status === "pending"
                        ? "badge-warning"
                        : r.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="flex justify-center gap-2 flex-wrap">
                  {r.status !== "approved" && (
                    <button
                      className="btn btn-sm btn-success hover:scale-105 transition-transform"
                      onClick={() => handleStatusChange(r._id, "approved")}
                    >
                      Approve
                    </button>
                  )}
                  {r.status !== "rejected" && (
                    <button
                      className="btn btn-sm btn-error hover:scale-105 transition-transform"
                      onClick={() => handleStatusChange(r._id, "rejected")}
                    >
                      Reject
                    </button>
                  )}
                  {r.status !== "pending" && (
                    <button
                      className="btn btn-sm btn-warning hover:scale-105 transition-transform"
                      onClick={() => handleStatusChange(r._id, "pending")}
                    >
                      Pending
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredRequests.map((r) => (
          <div
            key={r._id}
            className="card bg-base-100 shadow-md p-4 flex flex-col gap-2 hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold">{r.recipientName}</h2>
                <p className="text-sm text-gray-500">{r.location}</p>
              </div>
              <span
                className={`badge transition-colors duration-300 ${
                  r.status === "pending"
                    ? "badge-warning"
                    : r.status === "approved"
                    ? "badge-success"
                    : "badge-error"
                }`}
              >
                {r.status}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
              <span className="font-semibold">{r.bloodGroup}</span>
              <div className="flex gap-2 flex-wrap">
                {r.status !== "approved" && (
                  <button
                    className="btn btn-sm btn-success hover:scale-105 transition-transform"
                    onClick={() => handleStatusChange(r._id, "approved")}
                  >
                    Approve
                  </button>
                )}
                {r.status !== "rejected" && (
                  <button
                    className="btn btn-sm btn-error hover:scale-105 transition-transform"
                    onClick={() => handleStatusChange(r._id, "rejected")}
                  >
                    Reject
                  </button>
                )}
                {r.status !== "pending" && (
                  <button
                    className="btn btn-sm btn-warning hover:scale-105 transition-transform"
                    onClick={() => handleStatusChange(r._id, "pending")}
                  >
                    Pending
                  </button>
                )}
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {r.date} at {r.time}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6 gap-2 flex-wrap">
        <button
          className="btn btn-sm btn-outline hover:scale-105 transition-transform"
          onClick={() => navigate("/dashboard/all-users")}
        >
          Prev
        </button>
        <button
          className="btn btn-sm btn-outline hover:scale-105 transition-transform"
          onClick={() => navigate("/dashboard")} // Next → Admin Home
        >
          Next
        </button>
      </div>
    </div>
  );
}
