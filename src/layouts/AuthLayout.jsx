import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Register from "../pages/Auth/Register/Register";

const AuthLayout = () => {
  return (
    <div>
      <Navbar />
      <Register />
    </div>
  );
};

export default AuthLayout;
