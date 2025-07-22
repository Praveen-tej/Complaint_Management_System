import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import ComplaintForm from "./ComplaintForm";
import AdminLogin from "./AdminLogin";
import GoogleSignIn from "./GoogleSignIn";
function Home() {
  return (
    <div className="form-container" style={{ textAlign: "center" }}>
      <h2>Complaint Management System</h2>
      <h3>PSNA College of Engineering and Technology</h3>
      <p style={{ marginTop: "18px", fontSize: "17px" }}>
        Welcome! This is the official platform for raising complaints and reporting issues you face as a student or staff member at PSNA College of Engineering and Technology.<br /><br />
        <strong>Here you can raise a complaint</strong> about any conflicts, problems, or concerns you encounter in your department or on campus. Your feedback helps us improve your experience!
      </p>
    </div>
  );
}
function ComplaintPage() {
  const [user, setUser] = useState(null);
  if (!user) {
    return <GoogleSignIn onSignIn={setUser} />;
  }
  return <ComplaintForm user={user} />;
}

function App() {
  return (
    <Router>
      <nav style={{
        background: "#7c3aed",
        padding: "12px 0",
        marginBottom: "24px",
        display: "flex",
        justifyContent: "center",
        gap: "32px"
      }}>
        <Link to="/" style={{ color: "#fff", fontWeight: "bold", textDecoration: "none", fontSize: "18px" }}>Home</Link>
        <Link to="/complaint" style={{ color: "#fff", fontWeight: "bold", textDecoration: "none", fontSize: "18px" }}>Raise Complaint</Link>
        <Link to="/admin" style={{ color: "#fff", fontWeight: "bold", textDecoration: "none", fontSize: "18px" }}>Admin Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/complaint" element={<ComplaintPage />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}
export default App;