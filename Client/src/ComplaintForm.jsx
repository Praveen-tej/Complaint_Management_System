import React, { useState, useEffect } from "react";

const departments = [
  "it",
  "cse",
  "ec",
];

export default function ComplaintForm({ user }) {
  const [form, setForm] = useState({
    department: "",
    complaintText: "",
  });
  const [message, setMessage] = useState("");
  const [department, setDepartment] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const email = user.email.toLowerCase();
  const match = email.match(/^[a-zA-Z0-9]+[0-9]{2}([a-z]+)@psnacet\.edu\.in$/);
  const emailDept = match ? match[1] : "";

  useEffect(() => {
    fetchComplaints();
  }, [department]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);


    setTimeout(async () => {
      if (emailDept === form.department) {
        try {
          const res = await fetch("/api/complaints", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              department: form.department,
              complaintText: form.complaintText,
            }),
          });
          if (res.ok) {
            setMessage("Complaint submitted successfully!");
            setForm({ department: "", complaintText: "" });
          } else {
            setMessage("Failed to submit complaint.");
          }
        } catch (err) {
          setMessage("Server error. Please try again later.");
        }
      } else {
        setMessage(
          "Ivalid details"
        );
        setForm({ department: "", complaintText: "" });
      }
      setLoading(false);
    }, 3000);
  };

  const handleResolve = async (id) => {
    try {
      const res = await fetch(`/api/complaints/resolve/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        fetchComplaints(); 
      } else {
        alert("Failed to resolve complaint.");
      }
    } catch (err) {
      alert("Failed to resolve complaint.");
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this complaint?")) return;
    try {
      const res = await fetch(`/api/complaints/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setComplaints((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert("Failed to remove complaint.");
      }
    } catch (err) {
      alert("Failed to remove complaint.");
    }
  };

  const fetchComplaints = async () => {
    try {
      const res = await fetch(`/api/complaints/${department}`);
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  return (
    <div className="form-container">
      <h2>Raise a Complaint</h2>
      {loading && (
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <div className="spinner" />
          <div>Submitting your complaint...</div>
        </div>
      )}
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
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Complaint</label>
          <textarea
            name="complaintText"
            value={form.complaintText}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-btn" type="submit" disabled={loading}>
          Submit
        </button>
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
}