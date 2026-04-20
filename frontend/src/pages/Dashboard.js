import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import userService from "../services/user.service";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [staffUsername, setStaffUsername] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await userService.createStaff(staffUsername, staffEmail, staffPassword);
      setMessage("Staff member created successfully!");
      setStaffUsername("");
      setStaffEmail("");
      setStaffPassword("");
    } catch (err) {
      setError(err.response?.data || "Failed to create staff member");
    }
  };

  if (!user) {
    return <div className="text-center mt-2">Please log in to view the dashboard.</div>;
  }

  return (
    <div className="card">
      <h2 className="mb-2">Welcome to your Dashboard, {user.username}!</h2>
      <p>Role: <strong>{user.role}</strong></p>
      
      <div className="mt-2">
        {user.role === "ROLE_ADMIN" && (
          <div>
            <h3>Admin Panel</h3>
            <p>Manage users, configure pricing, and view analytics.</p>
            
            <div className="card mt-2" style={{ maxWidth: '500px' }}>
              <h4>Create Staff Member</h4>
              <form onSubmit={handleCreateStaff}>
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={staffUsername}
                    onChange={(e) => setStaffUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={staffEmail}
                    onChange={(e) => setStaffEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={staffPassword}
                    onChange={(e) => setStaffPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                {message && <p className="success-text">{message}</p>}
                {error && <p className="error-text">{error}</p>}
                <button type="submit" className="btn btn-success btn-block mt-2">
                  Create Staff
                </button>
              </form>
            </div>
          </div>
        )}
        {user.role === "ROLE_STAFF" && (
          <div>
            <h3>Staff Panel</h3>
            <p>Manage vehicles, update bookings, and assign drivers.</p>
          </div>
        )}
        {user.role === "ROLE_CUSTOMER" && (
          <div>
            <h3>Customer Area</h3>
            <p>View your bookings, browse vehicles, and manage payments.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
