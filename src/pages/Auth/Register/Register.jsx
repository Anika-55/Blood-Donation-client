import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext/AuthProvider"; // use our AuthProvider

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const imgBB_API_KEY = import.meta.env.VITE_IMGBB_KEY;

const Register = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { register } = useAuth(); // get register function from AuthProvider

  // Load JSON data
  useEffect(() => {
    fetch("/divisions.json")
      .then((res) => res.json())
      .then((data) => setDivisions(data));

    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  const handleDivisionChange = (e) => {
    const selectedDivisionId = e.target.value;
    const filtered = districts.filter(
      (d) => d.division_id == selectedDivisionId
    );
    setFilteredDistricts(filtered);
    setFilteredUpazilas([]);
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    const district = districts.find((d) => d.id == selectedDistrictId);
    setFilteredUpazilas(district?.upazilas || []);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const avatar = form.avatar.files[0];
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
      // Upload avatar → ImgBB
      const formData = new FormData();
      formData.append("image", avatar);

      const imgUpload = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgBB_API_KEY}`,
        formData
      );

      const avatarURL = imgUpload.data.data.url;

      // Register user via AuthProvider
      await register(email, password, name, avatarURL);

      // TODO: Save full user info to backend DB (role="donor", bloodGroup, division, etc.)

      navigate("/login");
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
            type="file"
            name="avatar"
            accept="image/*"
            className="file-input file-input-bordered w-full"
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

          {/* Division */}
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
              <option key={div.id} value={div.id}>
                {div.name}
              </option>
            ))}
          </select>

          {/* District */}
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
              <option key={dist.id} value={dist.id}>
                {dist.name}
              </option>
            ))}
          </select>

          {/* Upazila */}
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
