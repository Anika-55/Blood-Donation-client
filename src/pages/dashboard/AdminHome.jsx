// src/pages/dashboard/AdminHome.jsx
import { useEffect, useState } from "react";
import { API_BASE, getAuthHeaders } from "../../utils/api";
import { FaUsers, FaHeart, FaMoneyBillWave } from "react-icons/fa";

export default function AdminHome() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRequests: 0,
    totalFunds: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/stats`, {
          headers: getAuthHeaders(),
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4 sm:p-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-xl p-6 mb-6 shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Welcome, Admin! 👋
        </h1>
        <p className="text-sm sm:text-base">
          Here’s the latest overview of the blood donation platform.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="flex items-center p-5 bg-blue-100 rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
          <div className="text-blue-600 text-3xl mr-4">
            <FaUsers />
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Total Users</p>
            <h2 className="text-xl sm:text-2xl font-bold">
              {stats.totalUsers}
            </h2>
          </div>
        </div>

        {/* Total Donation Requests */}
        <div className="flex items-center p-5 bg-green-100 rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
          <div className="text-green-600 text-3xl mr-4">
            <FaHeart />
          </div>
          <div>
            <p className="text-gray-600 font-semibold">
              Total Donation Requests
            </p>
            <h2 className="text-xl sm:text-2xl font-bold">
              {stats.totalRequests}
            </h2>
          </div>
        </div>

        {/* Total Funds */}
        <div className="flex items-center p-5 bg-yellow-100 rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
          <div className="text-yellow-600 text-3xl mr-4">
            <FaMoneyBillWave />
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Total Funds</p>
            <h2 className="text-xl sm:text-2xl font-bold">
              ${stats.totalFunds}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
