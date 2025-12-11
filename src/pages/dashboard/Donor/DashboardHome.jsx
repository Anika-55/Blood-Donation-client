import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function DashboardHome() {
  const [user, setUser] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return navigate("/login");
    setUser(JSON.parse(stored));
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    api
      .get("/donation-requests/my?limit=3") // donor-specific API
      .then((res) => setRecent(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this donation request?")) return;
    try {
      await api.delete(`/donation-requests/${id}`);
      setRecent((prev) => prev.filter((r) => r._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(`/donation-requests/${id}/status`, { status });
      setRecent((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
    } catch {
      alert("Status update failed");
    }
  };

  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">
        Welcome, <span className="text-red-600">{user.name}</span> 👋
      </h1>

      {loading ? (
        <p>Loading your recent donation requests...</p>
      ) : recent.length === 0 ? null : (
        <section className="bg-white p-5 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Your Recent Donation Requests
          </h2>

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
                {recent.map((req) => (
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

          <div className="mt-5 text-right">
            <button
              onClick={() => navigate("/dashboard/donor/my-donation-requests")}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              View My All Requests
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
