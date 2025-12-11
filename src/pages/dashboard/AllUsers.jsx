// src/pages/dashboard/AllUsers.jsx
import { useEffect, useState } from "react";
import { API_BASE, getAuthHeaders } from "../../utils/api";
import { toast } from "react-hot-toast";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/users`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setUsers(data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter & search
  const filteredUsers = users
    .filter((u) => filter === "all" || u.status === filter)
    .filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

  // Update user role
  const handleRoleChange = async (id, role) => {
    const res = await fetch(`${API_BASE}/api/users/${id}/role`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ role }),
    });
    const data = await res.json();
    toast.success(data.message);
    fetchUsers();
  };

  // Update user status
  const handleStatusChange = async (id, status) => {
    const res = await fetch(`${API_BASE}/api/users/${id}/status`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    toast.success(data.message);
    fetchUsers();
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
        All Users 👤
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3 sm:gap-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered w-full sm:w-1/2 transition-shadow focus:shadow-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-full sm:w-1/4 transition-shadow focus:shadow-lg"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
        <table className="table w-full text-center">
          <thead className="bg-gray-200">
            <tr>
              <th>Avatar</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr
                key={u._id}
                className="hover:scale-[1.01] transition-transform duration-200 hover:bg-gray-50"
              >
                <td>
                  <img
                    src={u.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full mx-auto transition-transform duration-200 hover:scale-110"
                  />
                </td>
                <td className="font-medium">{u.email}</td>
                <td>{u.name}</td>
                <td className="font-semibold">{u.role}</td>
                <td>
                  <span
                    className={`badge transition-colors duration-300 ${
                      u.status === "active" ? "badge-success" : "badge-error"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td>
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-sm p-1 hover:bg-gray-100 transition-colors"
                    >
                      <FiMoreVertical size={20} />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44 animate-slide-down"
                    >
                      {u.status === "active" ? (
                        <li
                          onClick={() => handleStatusChange(u._id, "blocked")}
                          className="hover:bg-red-100"
                        >
                          Block User
                        </li>
                      ) : (
                        <li
                          onClick={() => handleStatusChange(u._id, "active")}
                          className="hover:bg-green-100"
                        >
                          Unblock User
                        </li>
                      )}
                      {u.role !== "volunteer" && (
                        <li
                          onClick={() => handleRoleChange(u._id, "volunteer")}
                          className="hover:bg-yellow-100"
                        >
                          Make Volunteer
                        </li>
                      )}
                      {u.role !== "admin" && (
                        <li
                          onClick={() => handleRoleChange(u._id, "admin")}
                          className="hover:bg-blue-100"
                        >
                          Make Admin
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredUsers.map((u) => (
          <div
            key={u._id}
            className="card bg-base-100 shadow-md p-4 flex flex-col gap-2 hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="flex items-center gap-3">
              <img
                src={u.avatar}
                alt=""
                className="w-12 h-12 rounded-full transition-transform duration-200 hover:scale-110"
              />
              <div className="flex-1">
                <h2 className="font-bold">{u.name}</h2>
                <p className="text-sm text-gray-500">{u.email}</p>
              </div>
              <span
                className={`badge transition-colors duration-300 ${
                  u.status === "active" ? "badge-success" : "badge-error"
                }`}
              >
                {u.status}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
              <span className="font-semibold">{u.role}</span>
              <div className="flex gap-2 flex-wrap">
                {u.status === "active" ? (
                  <button
                    className="btn btn-sm btn-error hover:scale-105 transition-transform"
                    onClick={() => handleStatusChange(u._id, "blocked")}
                  >
                    Block
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-success hover:scale-105 transition-transform"
                    onClick={() => handleStatusChange(u._id, "active")}
                  >
                    Unblock
                  </button>
                )}
                {u.role !== "volunteer" && (
                  <button
                    className="btn btn-sm btn-warning hover:scale-105 transition-transform"
                    onClick={() => handleRoleChange(u._id, "volunteer")}
                  >
                    Make Volunteer
                  </button>
                )}
                {u.role !== "admin" && (
                  <button
                    className="btn btn-sm btn-info hover:scale-105 transition-transform"
                    onClick={() => handleRoleChange(u._id, "admin")}
                  >
                    Make Admin
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6 gap-2 flex-wrap">
        <button
          className="btn btn-sm btn-outline hover:scale-105 transition-transform"
          onClick={() => navigate("/dashboard")} // Go to Admin Home
        >
          Prev
        </button>
        <button
          className="btn btn-sm btn-outline hover:scale-105 transition-transform"
          onClick={
            () => navigate("/dashboard/all-blood-donation-request") // Go to All Requests
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
