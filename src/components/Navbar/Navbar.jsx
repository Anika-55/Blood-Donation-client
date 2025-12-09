import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaHandHoldingHeart } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  // Safely get user from localStorage
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) user = JSON.parse(storedUser);
  } catch (err) {
    console.error("Failed to parse user from localStorage", err);
    user = null;
  }

  const token = localStorage.getItem("accessToken");

  // Logout function
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Public links (always visible)
  const publicLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/donate-blood">Donate Blood</NavLink>
      </li>
      <li>
        <NavLink to="/donation-request">Find Donor</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  // Dashboard links (only visible when logged in)
  const dashboardLinks = token ? (
    <>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <button onClick={logout} className="btn btn-ghost">
          Logout
        </button>
      </li>
    </>
  ) : null;

  return (
    <div className="navbar bg-red-600 text-white shadow-lg px-4">
      {/* Left - Logo & Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-red-600 rounded-box mt-3 w-52 shadow"
          >
            {publicLinks}
            {dashboardLinks}
            {!token && (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <FaHandHoldingHeart size={26} />
          <span>BloodCare</span>
        </Link>
      </div>

      {/* Center - Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-sm font-semibold">
          {publicLinks}
          {dashboardLinks}
        </ul>
      </div>

      {/* Right - Login / Register (only when logged out) */}
      {!token && (
        <div className="navbar-end hidden lg:flex gap-2">
          <NavLink
            to="/login"
            className="btn btn-outline btn-sm text-white hover:bg-white hover:text-red-600"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="btn btn-sm bg-white text-red-600 font-bold hover:bg-gray-200"
          >
            Register
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
