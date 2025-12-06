import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const { login } = useAuth(); // login(email, password)
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await login(email, password); // Call your auth function

      // SweetAlert success
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back!`,
        confirmButtonText: "Go to Home",
      }).then(() => {
        navigate("/"); // Redirect to home/dashboard
      });
    } catch (err) {
      setError(err.message || "Failed to login. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card shadow-xl p-8 bg-white w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">User Login</h2>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className={`btn btn-primary w-full mt-3 ${
              loading ? "loading" : ""
            }`}
            disabled={loading}
          >
            Login
          </button>
        </form>

        <p className="mt-3 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="link text-red-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
