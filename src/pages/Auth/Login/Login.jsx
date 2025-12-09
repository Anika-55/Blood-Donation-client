// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { API_BASE } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      // Send lowercase email to match backend
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });

      const json = await res.json();

      if (!res.ok) {
        // Show detailed server message if available
        throw new Error(json.message || "Login failed");
      }

      // Save token & user info
      localStorage.setItem("accessToken", json.token);
      localStorage.setItem("user", JSON.stringify(json.user));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 card bg-base-200">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      {msg && <div className="mb-3 alert alert-error">{msg}</div>}

      <form onSubmit={submit} className="space-y-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input w-full"
          type="email"
          autoComplete="username"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input w-full"
          type="password"
          autoComplete="current-password"
          required
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
