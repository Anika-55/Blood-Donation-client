import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaHandHoldingHeart } from "react-icons/fa";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="font-semibold">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/donate" className="font-semibold">
          Donate Blood
        </NavLink>
      </li>
      <li>
        <NavLink to="/find-donor" className="font-semibold">
          Find Donor
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="font-semibold">
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className="font-semibold">
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-red-600 text-white shadow-lg">
      {/* Left - Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
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
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-red-600 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <FaHandHoldingHeart size={26} />
          <span>BloodCare</span>
        </Link>
      </div>

      {/* Center - Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* Right - Auth */}
      <div className="navbar-end gap-2">
        <NavLink
          to="/login"
          className="btn btn-outline btn-sm text-white hover:bg-white hover:text-red-600"
        >
          Login
        </NavLink>
        <NavLink
          to="register"
          className="btn btn-sm bg-white text-red-600 font-bold hover:bg-gray-200"
        >
          Register
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
