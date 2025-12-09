import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DonationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const [request, setRequest] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/donation-requests/${id}`)
      .then((res) => res.json())
      .then((data) => setRequest(data));
  }, [id]);

  if (!request) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">
        Request for {request.bloodGroup}
      </h2>

      <p>
        <strong>Recipient:</strong> {request.recipientName}
      </p>
      <p>
        <strong>Location:</strong> {request.location}
      </p>
      <p>
        <strong>Date:</strong> {request.date}
      </p>
      <p>
        <strong>Time:</strong> {request.time}
      </p>

      <button
        className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
}
