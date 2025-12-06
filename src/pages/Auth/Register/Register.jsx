import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/AuthProvider";
import Swal from "sweetalert2";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [centers, setCenters] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [error, setError] = useState("");

  // Load centers.json
  useEffect(() => {
    fetch("/centers.json")
      .then((res) => res.json())
      .then((data) => {
        setCenters(data);

        const uniqueDivisions = [
          ...new Set(data.map((center) => center.region)),
        ].map((name, index) => ({ id: index + 1, name }));

        setDivisions(uniqueDivisions);
      });
  }, []);

  const handleDivisionChange = (e) => {
    const selectedDivision = e.target.value;

    const districtsInDivision = [
      ...new Set(
        centers
          .filter((c) => c.region === selectedDivision)
          .map((c) => c.district)
      ),
    ].map((name, index) => ({ id: index + 1, name }));

    setFilteredDistricts(districtsInDivision);
    setFilteredUpazilas([]);
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    const districtData = centers.find((c) => c.district === selectedDistrict);

    setFilteredUpazilas(
      districtData?.covered_area.map((name, index) => ({
        id: index + 1,
        name,
      })) || []
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const avatarURL = form.avatar.value; // Use URL now
    const bloodGroup = form.bloodGroup.value;
    const division = form.division.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Register user
      await register(email, password, name, avatarURL);

      // Optional: Save extra user info to backend (bloodGroup, division, district, upazila)

      // SweetAlert success
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: `Welcome ${name}!`,
        confirmButtonText: "Go to Home",
      }).then(() => {
        navigate("/"); // Redirect to home
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card shadow-xl p-8 bg-white w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Create Donor Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            type="url"
            name="avatar"
            placeholder="Avatar Image URL"
            className="input input-bordered w-full"
            required
          />

          <select
            name="bloodGroup"
            className="select select-bordered w-full"
            required
          >
            <option disabled selected>
              Select Blood Group
            </option>
            {bloodGroups.map((bg) => (
              <option key={bg}>{bg}</option>
            ))}
          </select>

          <select
            name="division"
            className="select select-bordered w-full"
            required
            onChange={handleDivisionChange}
          >
            <option disabled selected>
              Select Division
            </option>
            {divisions.map((div) => (
              <option key={div.id} value={div.name}>
                {div.name}
              </option>
            ))}
          </select>

          <select
            name="district"
            className="select select-bordered w-full"
            required
            onChange={handleDistrictChange}
          >
            <option disabled selected>
              Select District
            </option>
            {filteredDistricts.map((dist) => (
              <option key={dist.id} value={dist.name}>
                {dist.name}
              </option>
            ))}
          </select>

          <select
            name="upazila"
            className="select select-bordered w-full"
            required
          >
            <option disabled selected>
              Select Upazila
            </option>
            {filteredUpazilas.map((up) => (
              <option key={up.id} value={up.name}>
                {up.name}
              </option>
            ))}
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            required
          />

          {error && <p className="text-red-500">{error}</p>}

          <button className="btn btn-primary w-full mt-3">Register</button>
        </form>

        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="link text-red-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
