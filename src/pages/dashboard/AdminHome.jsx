// src/pages/dashboard/AdminHome.jsx
import { useEffect, useState } from "react";
import { API_BASE, getAuthHeaders } from "../../utils/api";

export default function AdminHome() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRequests: 0,
    totalFunds: 0,
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/admin/stats`, { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 bg-blue-200">
          <h2>Total Users</h2>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="card p-4 bg-green-200">
          <h2>Total Donation Requests</h2>
          <p>{stats.totalRequests}</p>
        </div>
        <div className="card p-4 bg-yellow-200">
          <h2>Total Funds</h2>
          <p>${stats.totalFunds}</p>
        </div>
      </div>
    </div>
  );
}
