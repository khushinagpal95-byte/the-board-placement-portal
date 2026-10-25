import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useRole } from "../context/RoleContext.jsx";
import { useJobStore } from "../store/useJobStore.js";

// Top bar. The links differ for students and recruiters.
export default function NavBar() {
  const { role, logout } = useRole();
  const applicationCount = useJobStore((s) => Object.keys(s.applications).length);
  const savedCount = useJobStore((s) => s.savedIds.length);

  // [path, label, "end"]  - "end" means: only highlight on the exact path
  const studentNav = [
    ["/student", "Browse jobs", true],
    ["/student/applications", `Applications${applicationCount ? ` (${applicationCount})` : ""}`, false],
    ["/student/saved", `Saved${savedCount ? ` (${savedCount})` : ""}`, false],
    ["/student/profile", "Profile", false],
  ];
  const recruiterNav = [
    ["/recruiter", "Your postings", true],
    ["/recruiter/post", "Post a job", false],
  ];
  const links = role === "student" ? studentNav : recruiterNav;

  return (
    <div className="nav-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 22px", borderBottom: "1px solid var(--line)", background: "var(--surface)" }}>
      <div className="nav-wrap" style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <Link to="/" onClick={logout} style={{ fontFamily: "var(--serif)", fontSize: 19, fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>
          The Board
        </Link>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          {links.map(([path, label, end]) => (
            <NavLink key={path} to={path} end={end}
              className={({ isActive }) => `navlink ${isActive ? "active" : ""}`}>
              {label}
            </NavLink>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 12.5, color: "var(--muted)", fontFamily: "var(--sans)" }}>
          {role === "student" ? "Student view" : "Recruiter view"}
        </span>
        <Link to="/" className="btn-ghost" onClick={logout}>Switch role</Link>
      </div>
    </div>
  );
}
