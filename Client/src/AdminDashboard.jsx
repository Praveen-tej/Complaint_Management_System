import React, { useEffect, useState } from "react";

export default function AdminDashboard({ department }) {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resolvingId, setResolvingId] = useState(null);

    const fetchComplaints = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/complaints/${department}`);
            const data = await res.json();
            setComplaints(data);
        } catch (err) {
            setComplaints([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchComplaints();
    }, [department]);

    const handleResolve = async (id) => {
        setResolvingId(id);
        setTimeout(async () => {
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
            setResolvingId(null);
        }, 2000);
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

    return (
        <div className="form-container">
            <h2>{department} Department Complaints</h2>
            {loading ? (
                <p>Loading...</p>
            ) : complaints.length === 0 ? (
                <p>No complaints found.</p>
            ) : (
                <ul>
                    {complaints.map((c) => (
                        <li key={c._id} style={{ marginBottom: "18px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                            <strong>Complaint:</strong> {c.complaintText} <br />
                            <strong>Status:</strong> {c.status || "pending"} <br />
                            {c.response && (
                                <>
                                    <strong>Response:</strong> {c.response} <br />
                                </>
                            )}
                            <small>Created: {new Date(c.createdAt).toLocaleString()}</small>
                            <br />
                            {(!c.status || c.status === "pending") && (
                                resolvingId === c._id ? (
                                    <div style={{ textAlign: "center", margin: "1rem 0" }}>
                                        <div className="spinner" />
                                        <div>Resolving problem...</div>
                                    </div>
                                ) : (
                                    <button
                                        className="submit-btn"
                                        style={{ width: "auto", marginTop: "8px", padding: "6px 18px", fontSize: "14px" }}
                                        onClick={() => handleResolve(c._id)}
                                    >
                                        Resolve
                                    </button>
                                )
                            )}
                            {c.status === "resolved" && (
                                <button
                                    className="submit-btn"
                                    style={{ width: "auto", marginTop: "8px", padding: "6px 18px", fontSize: "14px", background: "#e11d48" }}
                                    onClick={() => handleRemove(c._id)}
                                >
                                    Remove
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}