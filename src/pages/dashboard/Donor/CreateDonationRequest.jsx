import React, { useState } from "react";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateDonationRequest() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    addressLine: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/donor/donation-requests", form);
      alert("Donation request created successfully!");
      navigate("/dashboard/donor/my-donation-requests");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create donation request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create Donation Request</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          type="text"
          name="recipientName"
          placeholder="Recipient Name"
          value={form.recipientName}
          onChange={handleChange}
          required
          className="input border p-2 rounded"
        />

        <select
          name="recipientDistrict"
          value={form.recipientDistrict}
          onChange={handleChange}
          required
          className="input border p-2 rounded"
        >
          <option value="">Select District</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chattogram">Chattogram</option>
          <option value="Khulna">Khulna</option>
          <option value="Rajshahi">Rajshahi</option>
        </select>

        <input
          type="text"
          name="recipientUpazila"
          placeholder="Recipient Upazila"
          value={form.recipientUpazila}
          onChange={handleChange}
          required
          className="input border p-2 rounded"
        />

        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
          value={form.hospitalName}
          onChange={handleChange}
          className="input border p-2 rounded"
        />

        <input
          type="text"
          name="addressLine"
          placeholder="Full Address"
          value={form.addressLine}
          onChange={handleChange}
          className="input border p-2 rounded"
        />

        <select
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleChange}
          required
          className="input border p-2 rounded"
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="donationDate"
          value={form.donationDate}
          onChange={handleChange}
          required
          className="input border p-2 rounded"
        />

        <input
          type="time"
          name="donationTime"
          value={form.donationTime}
          onChange={handleChange}
          className="input border p-2 rounded"
        />

        <textarea
          name="message"
          placeholder="Additional Message"
          value={form.message}
          onChange={handleChange}
          className="input border p-2 rounded"
        />

        <button
          type="submit"
          className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Donation Request"}
        </button>
      </form>
    </div>
  );
}
