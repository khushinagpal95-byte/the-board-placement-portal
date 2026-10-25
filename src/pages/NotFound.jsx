import React from "react";
import { Link } from "react-router-dom";

// Shown for any URL that no route matches (path="*" in App.jsx).
export default function NotFound() {
  return (
    <div style={{ minHeight: 520, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 56, fontWeight: 600, color: "var(--teal)" }}>404</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 26, margin: "0 0 8px" }}>Page not found</h1>
        <p style={{ color: "var(--muted)", margin: "0 0 20px" }}>The page you are looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn-primary" style={{ textDecoration: "none", color: "#fff", display: "inline-block" }}>Back to The Board</Link>
      </div>
    </div>
  );
}
