import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { toast } from "react-hot-toast";

const DonateBlood = () => {
  const [formData, setFormData] = useState({
    recipientName: "",
    location: "",
    bloodGroup: "",
    date: "",
    time: "",
  });

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit donation request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/donation-requests", formData);
      toast.success(response.data.message);
      setFormData({
        recipientName: "",
        location: "",
        bloodGroup: "",
        date: "",
        time: "",
      });
      fetchRequests(); // refresh pending requests
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  // Fetch pending requests
  const fetchRequests = async () => {
    try {
      const response = await axios.get("/api/donation-requests");
      setRequests(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Donate Blood</h1>

      {/* Donation Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="block font-semibold mb-1">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>

      {/* Pending Requests */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          Pending Donation Requests
        </h2>
        {requests.length === 0 ? (
          <p>No pending requests</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-red-100">
                <th className="border px-3 py-2">Recipient</th>
                <th className="border px-3 py-2">Location</th>
                <th className="border px-3 py-2">Blood Group</th>
                <th className="border px-3 py-2">Date</th>
                <th className="border px-3 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="text-center">
                  <td className="border px-3 py-2">{req.recipientName}</td>
                  <td className="border px-3 py-2">{req.location}</td>
                  <td className="border px-3 py-2">{req.bloodGroup}</td>
                  <td className="border px-3 py-2">{req.date}</td>
                  <td className="border px-3 py-2">{req.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DonateBlood;
