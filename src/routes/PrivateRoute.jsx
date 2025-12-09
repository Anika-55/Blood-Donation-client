import { Navigate, useLocation } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const [firebaseUser, loading] = useAuthState(auth);
  const [backendUser, setBackendUser] = useState(null);
  const [checkingBackend, setCheckingBackend] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const checkBackend = async () => {
      if (!firebaseUser) {
        setCheckingBackend(false);
        return;
      }

      const token = localStorage.getItem("accessToken");
      if (!token) {
        setCheckingBackend(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setBackendUser(data.user);
        }
      } catch (err) {
        console.log("Backend auth error:", err);
      } finally {
        setCheckingBackend(false);
      }
    };

    checkBackend();
  }, [firebaseUser]);

  if (loading || checkingBackend) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!firebaseUser || !backendUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (backendUser.status === "blocked") {
    return <Navigate to="/blocked" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(backendUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
