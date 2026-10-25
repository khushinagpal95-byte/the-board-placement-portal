import React from "react";
import { useJobStore } from "../../store/useJobStore.js";
import { useToast } from "../../context/ToastContext.jsx";
import StatusStepper from "../../components/StatusStepper.jsx";

export default function Applications() {
  const jobs = useJobStore((s) => s.jobs);
  const applications = useJobStore((s) => s.applications);
  const removeApplication = useJobStore((s) => s.removeApplication);
  const showToast = useToast();

  const entries = Object.entries(applications);

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "26px 22px" }}>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, marginBottom: 18 }}>Your applications</h2>
      {entries.length === 0 && (
        <div style={{ padding: 30, textAlign: "center", color: "var(--muted)", border: "1px dashed var(--line)", borderRadius: 6 }}>
          Nothing here yet — apply to a role and it'll show up with live status.
        </div>
      )}
      {entries.map(([jobId, info]) => {
        const job = jobs.find((j) => j.id === jobId);
        if (!job) return null;
        return (
          <div key={jobId} style={{ padding: "16px 4px", borderBottom: "1px solid var(--line)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div>
                <div style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 16 }}>{job.title}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{job.company} · {job.location}</div>
              </div>
              <button className="btn-ghost" onClick={() => { removeApplication(jobId); showToast("Application withdrawn"); }}>Withdraw</button>
            </div>
            <StatusStepper status={info.status} />
          </div>
        );
      })}
    </div>
  );
}
