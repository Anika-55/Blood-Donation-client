import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <Navbar />
      {/* Outlet will render the child route (Login or Register) */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
