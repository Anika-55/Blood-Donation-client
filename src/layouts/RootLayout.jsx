import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* This will render the page content */}
      </main>
      <Footer /> {/* This stays at the bottom */}
    </div>
  );
};

export default RootLayout;
