import React, { useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

export default function GoogleSignIn({ onSignIn }) {
  const [error, setError] = useState("");
  const handleSignIn = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email.toLowerCase();


      const collegeEmailRegex =
        /^[a-zA-Z0-9]+[0-9]{2}(it|cse|ec)@psnacet\.edu\.in$/;
      if (!collegeEmailRegex.test(email)) {
        setError(
          "Please sign in with your official college email. Personal emails are not allowed."
        );
        await auth.signOut();
        return;
      }
      setError("");
      onSignIn(result.user);
    } catch (err) {
      setError("Google sign-in failed.");
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "2rem 0" }}>
      <button
        onClick={handleSignIn}
        style={{
          background: "#fff",
          color: "#444",
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "10px 24px",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          style={{ width: 22, marginRight: 10, verticalAlign: "middle" }}
        />
        Sign in with Google
      </button>
      {error && (
        <div className="message" style={{ color: "red", marginTop: "1rem" }}>
          {error}
        </div>
      )}
    </div>
  );
}
