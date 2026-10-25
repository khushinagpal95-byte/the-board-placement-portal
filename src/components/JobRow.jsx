import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

// One row in the demo job list. Clicking the row opens the detail page.
export default function JobRow({ job, applied, saved, onOpen, onToggleSave }) {
  return (
    <div className="row-hover" style={{
      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      padding: "16px 4px", borderBottom: "1px solid var(--line)", cursor: "pointer",
    }} onClick={onOpen}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 17, fontWeight: 600 }}>{job.title}</div>
        <div style={{ fontSize: 13.5, color: "var(--muted)", margin: "3px 0 8px" }}>{job.company} · {job.location} · {job.type}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {job.skills.map((s) => (
            <span key={s} style={{ fontSize: 11.5, padding: "2px 8px", borderRadius: 999, border: "1px solid var(--line)", color: "var(--muted)" }}>{s}</span>
          ))}
        </div>
      </div>
      <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, minWidth: 110 }}>
        <div style={{ fontFamily: "var(--serif)", fontWeight: 600 }}>₹{job.ctc} LPA</div>
        <button aria-label={saved ? "Remove from saved" : "Save job"}
          onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
          style={{ background: "none", border: "none", cursor: "pointer", color: saved ? "var(--mustard)" : "var(--muted)" }}>
          {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
        {applied && <span style={{ fontSize: 11.5, color: "var(--teal)", fontWeight: 600 }}>{applied.status}</span>}
      </div>
    </div>
  );
}
