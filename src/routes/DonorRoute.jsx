import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function DonorRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // or a spinner

  if (!user) return <Navigate to="/login" />;

  if (user.role !== "donor") {
    return <p className="text-red-600">Access Denied: Only donors allowed</p>;
  }

  return children;
}
