import React, { createContext, useContext, useState } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage.js";

/* ---------------------------------------------------------
   Context API #2 - which role is "signed in".
   IMPORTANT: this is only a frontend demo. There is no real login,
   password or server. The role is just saved in localStorage so route
   guards can be demonstrated. It is NOT real security.
--------------------------------------------------------- */
const RoleContext = createContext(null);
const ROLE_KEY = "theboard-role";

function readSavedRole() {
  const saved = loadFromStorage(ROLE_KEY, null);
  return saved === "student" || saved === "recruiter" ? saved : null; // ignore anything else
}

export function RoleProvider({ children }) {
  const [role, setRole] = useState(readSavedRole); // 'student' | 'recruiter' | null

  const chooseRole = (newRole) => {
    setRole(newRole);
    saveToStorage(ROLE_KEY, newRole);
  };

  const logout = () => {
    setRole(null);
    saveToStorage(ROLE_KEY, null);
  };

  return <RoleContext.Provider value={{ role, chooseRole, logout }}>{children}</RoleContext.Provider>;
}

// usage:  const { role, chooseRole, logout } = useRole();
export function useRole() {
  return useContext(RoleContext);
}
