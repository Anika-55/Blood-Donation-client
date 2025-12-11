import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import DonateBlood from "../pages/BloodDoner/DonateBlood";
import DonationRequest from "../pages/BloodDoner/DonationRequestsDetails";

import DashboardLayout from "../layouts/Dashboardlayout";
import Profile from "../pages/dashboard/Profile";
import HomeDashboard from "../pages/dashboard/HomeDashboard";

// Admin pages
import AllUsers from "../pages/dashboard/AllUsers";
import AllRequests from "../pages/dashboard/AllRequests";

// Donor pages
import MyDonationRequests from "../pages/dashboard/Donor/MyDonationRequests";
import EditDonationRequest from "../pages/dashboard/Donor/EditDonationRequest";
import DonationRequestDetails from "../pages/dashboard/Donor/DonationRequestDetails";
import CreateDonationRequest from "../pages/dashboard/Donor/CreateDonationRequest";
import DashboardHome from "../pages/dashboard/Donor/DashboardHome";

import DashboardRoute from "./DashboardRoute";
import DonorRoute from "./DonorRoute";

export const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "donate-blood", element: <DonateBlood /> },
      { path: "donate-request", element: <DonationRequest /> },
    ],
  },

  // Dashboard routes (protected)
  {
    path: "/dashboard",
    element: (
      <DashboardRoute roles={["admin", "donor", "volunteer"]}>
        <DashboardLayout />
      </DashboardRoute>
    ),
    children: [
      // Donor/Admin/Volunteer home page
      { index: true, element: <DashboardHome /> },

      // Profile
      { path: "profile", element: <Profile /> },

      // Admin routes
      {
        path: "all-users",
        element: (
          <DashboardRoute roles={["admin"]}>
            <AllUsers />
          </DashboardRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: (
          <DashboardRoute roles={["admin"]}>
            <AllRequests />
          </DashboardRoute>
        ),
      },

      // Donor routes (nested, relative paths!)
      {
        path: "my-donation-requests",
        element: (
          <DonorRoute>
            <MyDonationRequests />
          </DonorRoute>
        ),
      },
      {
        path: "create-donation-request",
        element: (
          <DonorRoute>
            <CreateDonationRequest />
          </DonorRoute>
        ),
      },
      {
        path: "donation/:id",
        element: (
          <DonorRoute>
            <DonationRequestDetails />
          </DonorRoute>
        ),
      },
      {
        path: "edit-donation/:id",
        element: (
          <DonorRoute>
            <EditDonationRequest />
          </DonorRoute>
        ),
      },
    ],
  },

  // Auth routes
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
