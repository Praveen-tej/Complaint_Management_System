import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";
const departments = [
  "it",
  "cse",
  "ec",
];
export default function AdminLogin() {
  const [form, setForm] = useState({
    department: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]:e.target.value});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.department && form.email) {
      setLoggedIn(true);
    } else {
      setMessage("Please fill all fields.");
    }
  };
  if (loggedIn) {
    return <AdminDashboard department={form.department} />;}
  return (
    <div className="form-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Department</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option value="">select department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Email ID</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
          />
        </div>
        <button className="submit-btn" type="submit">Login</button>
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
}