import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useJobStore } from "../../store/useJobStore.js";

export default function SavedJobs() {
  const navigate = useNavigate();
  const jobs = useJobStore((s) => s.jobs);
  const savedIds = useJobStore((s) => s.savedIds);
  const toggleSave = useJobStore((s) => s.toggleSave);

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "26px 22px" }}>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, marginBottom: 18 }}>Saved jobs</h2>
      {savedIds.length === 0 && (
        <div style={{ padding: 30, textAlign: "center", color: "var(--muted)", border: "1px dashed var(--line)", borderRadius: 6 }}>Nothing saved yet.</div>
      )}
      {savedIds.map((id) => {
        const job = jobs.find((j) => j.id === id);
        if (!job) return null;
        return (
          <div key={id} className="row-hover" style={{ display: "flex", justifyContent: "space-between", padding: "14px 4px", borderBottom: "1px solid var(--line)", cursor: "pointer" }}
            onClick={() => navigate(`/student/jobs/${id}`, { state: { backTo: "/student/saved" } })}>
            <div>
              <div style={{ fontFamily: "var(--serif)", fontWeight: 600 }}>{job.title}</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>{job.company} · {job.location}</div>
            </div>
            <button aria-label="Remove from saved" onClick={(e) => { e.stopPropagation(); toggleSave(id); }} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <X size={16} color="var(--muted)" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
