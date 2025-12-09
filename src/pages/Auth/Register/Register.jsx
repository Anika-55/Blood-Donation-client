import React, { useState } from "react";
import { API_BASE } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    bloodGroup: "A+",
    district: "",
    upazila: "",
    password: "",
    confirm_password: "",
    avatarUrl: "", // use URL instead of file
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      // Validation
      if (form.password !== form.confirm_password) {
        setMsg("Passwords do not match");
        setLoading(false);
        return;
      }

      // Send JSON body instead of FormData
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.message || "Registration failed");

      // Save token & user info
      localStorage.setItem("accessToken", json.token);
      localStorage.setItem("user", JSON.stringify(json.user));

      setMsg("Registered successfully");

      // Redirect to home or dashboard
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 card bg-base-200">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {msg && <div className="mb-3 alert">{msg}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Name"
          className="input w-full"
        />
        <input
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          className="input w-full"
        />
        <select
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={onChange}
          className="select w-full"
        >
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>
        <input
          name="district"
          value={form.district}
          onChange={onChange}
          placeholder="District"
          className="input w-full"
        />
        <input
          name="upazila"
          value={form.upazila}
          onChange={onChange}
          placeholder="Upazila"
          className="input w-full"
        />
        <input
          name="password"
          value={form.password}
          onChange={onChange}
          type="password"
          placeholder="Password"
          className="input w-full"
        />
        <input
          name="confirm_password"
          value={form.confirm_password}
          onChange={onChange}
          type="password"
          placeholder="Confirm Password"
          className="input w-full"
        />
        <input
          name="avatarUrl"
          value={form.avatarUrl}
          onChange={onChange}
          placeholder="Avatar Image URL"
          className="input w-full"
        />
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
