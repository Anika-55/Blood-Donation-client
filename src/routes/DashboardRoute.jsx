// src/routes/DashboardRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// roles: array of allowed roles, e.g., ["admin", "donor", "volunteer"]
const DashboardRoute = ({ roles = [], children }) => {
  // Get user info from localStorage
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    // Logged in but role not allowed
    return <Navigate to="/" replace />;
  }

  // Role allowed
  return children;
};

export default DashboardRoute;
