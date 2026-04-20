import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && user.token) {
      axios
        .get("http://localhost:8080/api/users/profile", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => setProfile(response.data))
        .catch((err) => setError("Failed to load profile."));
    }
  }, [user]);

  if (error) {
    return <div className="error-text text-center mt-2">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center mt-2">Loading...</div>;
  }

  return (
    <div className="card card-centered">
      <h2 className="text-center mb-2">User Profile</h2>
      <div className="form-group">
        <label className="form-label">Username</label>
        <p>{profile.username}</p>
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <p>{profile.email}</p>
      </div>
      <div className="form-group">
        <label className="form-label">Role</label>
        <p>{profile.role}</p>
      </div>
      {/* To do: Update profile form */}
    </div>
  );
};

export default Profile;
