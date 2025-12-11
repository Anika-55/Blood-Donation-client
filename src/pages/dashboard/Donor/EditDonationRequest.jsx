import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function EditDonationRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRequest() {
      try {
        const res = await api.get(`/api/donor/donation-requests/${id}`);
        setForm({
          recipientName: res.data.recipientName || "",
          recipientDistrict: res.data.district || "",
          recipientUpazila: res.data.upazila || "",
          hospitalName: res.data.hospitalName || "",
          addressLine: res.data.address || "",
          bloodGroup: res.data.bloodGroup || "",
          donationDate: res.data.date || "",
          donationTime: res.data.time || "",
          message: res.data.message || "",
        });
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || "Failed to load donation request"
        );
      } finally {
        setLoading(false);
      }
    }

    loadRequest();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/api/donor/donation-requests/${id}`, form);
      alert("Donation request updated successfully!");
      navigate("/dashboard/donor/my-donation-requests");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update request");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!form) return null;

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Donation Request</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          type="text"
          name="recipientName"
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
          value={form.recipientUpazila}
          onChange={handleChange}
          required
          className="input border p-2 rounded"
        />
        <input
          type="text"
          name="hospitalName"
          value={form.hospitalName}
          onChange={handleChange}
          className="input border p-2 rounded"
        />
        <input
          type="text"
          name="addressLine"
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
          {loading ? "Updating..." : "Update Donation Request"}
        </button>
      </form>
    </div>
  );
}
