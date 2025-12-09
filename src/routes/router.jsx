import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import DonateBlood from "../pages/BloodDoner/DonateBlood";
import DonationRequest from "../pages/BloodDoner/DonationRequestsDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/Dashboardlayout";
import Profile from "../pages/dashboard/Profile";
import HomeDashboard from "../pages/dashboard/HomeDashboard";
import MyRequests from "../pages/dashboard/MyRequests";
import DashboardRoute from "./DashboardRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "donate-blood",
        element: <DonateBlood />,
      },
      {
        path: "donate-request",
        element: <DonationRequest />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <DashboardRoute roles={["admin", "donor", "volunteer"]}>
        <DashboardLayout />
      </DashboardRoute>
    ),
    children: [
      { index: true, element: <HomeDashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "my-donation-requests", element: <MyRequests /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
