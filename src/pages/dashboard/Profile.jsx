// src/pages/dashboard/Profile.jsx
import { useState, useEffect } from "react";
import { API_BASE, getAuthHeaders } from "../../utils/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetch(`${API_BASE}/api/auth/me`, { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setForm({ ...data.user });
      });
  }, []);

  function toggleEdit() {
    setEditMode(!editMode);
  }
  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function saveProfile() {
    const res = await fetch(`${API_BASE}/api/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setUser(data.user);
    setEditMode(false);
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div className="card p-6 max-w-md">
      <button onClick={toggleEdit} className="btn mb-4">
        {editMode ? "Cancel" : "Edit"}
      </button>
      <form>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          disabled={!editMode}
        />
        <input name="email" value={form.email} disabled />
        <input
          name="district"
          value={form.district}
          onChange={onChange}
          disabled={!editMode}
        />
        <input
          name="upazila"
          value={form.upazila}
          onChange={onChange}
          disabled={!editMode}
        />
        <input
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={onChange}
          disabled={!editMode}
        />
        {editMode && (
          <button type="button" onClick={saveProfile}>
            Save
          </button>
        )}
      </form>
    </div>
  );
}
