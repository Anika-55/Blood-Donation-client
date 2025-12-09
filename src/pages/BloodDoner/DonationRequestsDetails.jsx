import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function DonationRequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // If not logged in, redirect to login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`/donation-request/${id}`);
        setRequest(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!request) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 mt-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-center">
        Donation Request Details
      </h2>

      <p>
        <strong>Recipient Name:</strong> {request.recipientName}
      </p>
      <p>
        <strong>Location:</strong> {request.location}
      </p>
      <p>
        <strong>Blood Group:</strong> {request.bloodGroup}
      </p>
      <p>
        <strong>Date:</strong> {request.date}
      </p>
      <p>
        <strong>Time:</strong> {request.time}
      </p>

      {/* Placeholder for future donor request action */}
      <button className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">
        Request To Donate
      </button>
    </div>
  );
}
