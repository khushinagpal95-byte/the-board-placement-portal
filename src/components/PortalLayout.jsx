import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import ConfirmModal from "./ConfirmModal.jsx";
import { useJobStore } from "../store/useJobStore.js";
import { useToast } from "../context/ToastContext.jsx";

// Shared page frame for /student/* and /recruiter/*:
// the nav bar on top, the current child page in <Outlet />, a demo notice at the bottom.
export default function PortalLayout() {
  const resetDemoData = useJobStore((s) => s.resetDemoData);
  const showToast = useToast();
  const [showReset, setShowReset] = useState(false); // local state: only this component needs it

  return (
    <div>
      <NavBar />
      <Outlet />
      <div style={{ textAlign: "center", fontSize: 12, color: "var(--muted)", padding: "10px 22px 28px" }}>
        Demo build · sign-in is frontend-only · data is saved in this browser only ·{" "}
        <button onClick={() => setShowReset(true)} style={{ background: "none", border: "none", color: "var(--teal)", cursor: "pointer", fontSize: 12, textDecoration: "underline", padding: 0 }}>
          Reset demo data
        </button>
      </div>
      {showReset && (
        <ConfirmModal
          title="Reset demo data?"
          message="This brings back the original demo jobs and clears saved jobs, applications and your profile."
          confirmLabel="Reset"
          onCancel={() => setShowReset(false)}
          onConfirm={() => { resetDemoData(); setShowReset(false); showToast("Demo data reset"); }}
        />
      )}
    </div>
  );
}
