import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useRole } from "../context/RoleContext.jsx";

/* ---------------------------------------------------------
   Route guard (frontend demo only - NOT real security).
   - nobody chosen yet  -> send to the role picker ("/")
   - wrong role         -> send to that role's own home page
   - right role         -> show the page
--------------------------------------------------------- */
export default function ProtectedRoute({ role: requiredRole, children }) {
  const { role } = useRole();
  const location = useLocation();

  if (!role) {
    // remember where the user wanted to go, so we can return after they pick a role
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  if (role !== requiredRole) {
    return <Navigate to={`/${role}`} replace />;
  }
  return children;
}
