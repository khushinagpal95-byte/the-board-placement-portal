import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GraduationCap, Building2 } from "lucide-react";
import { useRole } from "../context/RoleContext.jsx";

// Landing page ("/"): choose how you are "signing in" (frontend demo only).
export default function RolePicker() {
  const { chooseRole } = useRole();
  const navigate = useNavigate();
  const location = useLocation();

  const pick = (role) => {
    chooseRole(role);
    // if a guard sent the user here, go back to the page they wanted (when it fits the role)
    const from = location.state?.from;
    if (from && from.pathname.startsWith(`/${role}`)) navigate(from.pathname + from.search);
    else navigate(`/${role}`);
  };

  const cardStyle = {
    flex: "1 1 180px", padding: "20px 18px", borderRadius: 6, border: "1px solid var(--line)",
    background: "var(--surface)", cursor: "pointer", textAlign: "left",
  };

  return (
    <div style={{ minHeight: 520, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "var(--sans)" }}>
      <div style={{ maxWidth: 460, width: "100%", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 15, letterSpacing: .2, color: "var(--muted)", marginBottom: 6 }}>Placement Cell</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 38, fontWeight: 600, margin: "0 0 10px", color: "var(--ink)" }}>The Board</h1>
        <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6, margin: "0 0 28px" }}>
          One place for openings, applications and everyone tracking them. Choose how you're signing in.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => pick("student")} style={cardStyle}>
            <GraduationCap size={22} color="var(--teal)" />
            <div style={{ fontWeight: 600, marginTop: 10, fontFamily: "var(--sans)" }}>I'm a student</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>Browse jobs, apply, track status</div>
          </button>
          <button onClick={() => pick("recruiter")} style={cardStyle}>
            <Building2 size={22} color="var(--teal)" />
            <div style={{ fontWeight: 600, marginTop: 10, fontFamily: "var(--sans)" }}>I'm a recruiter</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>Post roles, manage applicants</div>
          </button>
        </div>
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 22 }}>
          Demo only: there is no real login. Your choice is just remembered in this browser.
        </p>
      </div>
    </div>
  );
}
