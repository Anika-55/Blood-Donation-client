import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function MyDonationRequests() {
  const [data, setData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page, statusFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const query = `/donation-requests/my?page=${page}&limit=${limit}${
        statusFilter ? `&status=${statusFilter}` : ""
      }`;
      const res = await api.get(query);
      setData(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this donation request?")) return;
    try {
      await api.delete(`/donation-requests/${id}`);
      fetchData();
    } catch {
      alert("Delete failed");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(`/donation-requests/${id}/status`, { status });
      fetchData();
    } catch {
      alert("Status update failed");
    }
  };

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Donation Requests</h1>

      <div className="mb-4 flex items-center gap-4">
        <label>Filter by status:</label>
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
          className="input"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">Inprogress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>

        <button
          onClick={() => navigate("/dashboard/create-donation-request")}
          className="ml-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Create New Request
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p>No donation requests found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Recipient</th>
                  <th className="p-2 border">Location</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Time</th>
                  <th className="p-2 border">Blood</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border w-40">Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((req) => (
                  <tr key={req._id} className="border">
                    <td className="p-2 border">{req.recipientName}</td>
                    <td className="p-2 border">
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </td>
                    <td className="p-2 border">
                      {new Date(req.donationDate).toLocaleDateString()}
                    </td>
                    <td className="p-2 border">{req.donationTime}</td>
                    <td className="p-2 border">{req.bloodGroup}</td>
                    <td
                      className={`p-2 border font-semibold ${
                        req.status === "done"
                          ? "text-green-600"
                          : req.status === "canceled"
                          ? "text-gray-500"
                          : "text-blue-600"
                      }`}
                    >
                      {req.status}
                    </td>
                    <td className="p-2 border flex flex-wrap gap-2">
                      <Link
                        to={`/dashboard/donor/donation/${req._id}`}
                        className="text-blue-600 underline"
                      >
                        View
                      </Link>

                      {["pending", "inprogress"].includes(req.status) && (
                        <button
                          onClick={() =>
                            navigate(`/dashboard/donor/edit/${req._id}`)
                          }
                          className="text-yellow-600 underline"
                        >
                          Edit
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(req._id)}
                        className="text-red-600 underline"
                      >
                        Delete
                      </button>

                      {req.status === "inprogress" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(req._id, "done")}
                            className="text-green-600 underline"
                          >
                            Done
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(req._id, "canceled")
                            }
                            className="text-gray-600 underline"
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

          {/* Pagination */}
          <div className="mt-4 flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 border rounded"
            >
              Prev
            </button>
            <span>
              Page {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
