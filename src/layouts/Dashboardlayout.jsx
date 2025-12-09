// src/components/DashboardLayout.jsx
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Icons
import { FaHome, FaUser, FaUsers, FaHandHoldingHeart } from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import Navbar from "../components/Navbar/Navbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user safely
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
      else navigate("/login"); // redirect if not logged in
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return null; // prevent rendering until user is loaded

  const navLinks = [
    { name: "Home", to: "/dashboard", icon: <FaHome /> },
    ...(user.role === "admin"
      ? [
          { name: "All Users", to: "/dashboard/all-users", icon: <FaUsers /> },
          {
            name: "All Requests",
            to: "/dashboard/all-blood-donation-request",
            icon: <FaHandHoldingHeart />,
          },
        ]
      : []),
    ...(user.role === "volunteer"
      ? [
          {
            name: "All Requests",
            to: "/dashboard/all-blood-donation-request",
            icon: <FaHandHoldingHeart />,
          },
        ]
      : []),
    ...(user.role === "donor"
      ? [
          {
            name: "My Requests",
            to: "/dashboard/my-donation-requests",
            icon: <FaHandHoldingHeart />,
          },
          {
            name: "Create Request",
            to: "/dashboard/create-donation-request",
            icon: <BiSolidDonateBlood />,
          },
        ]
      : []),
    { name: "Profile", to: "/dashboard/profile", icon: <FaUser /> },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen">
        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-full"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`bg-gray-800 text-white p-4 w-64 fixed lg:static top-0 left-0 h-full transition-transform duration-300
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        >
          <h2 className="text-xl font-bold mb-6 text-center">Dashboard</h2>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded transition 
                hover:bg-gray-700 ${isActive ? "bg-gray-600" : ""}`
                }
              >
                {link.icon}
                <span className="text-sm font-medium">{link.name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 ml-0 p-4 bg-gray-100 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
