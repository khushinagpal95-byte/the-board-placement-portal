import React from "react";

// One row for a job that came from the live API.
// Applying happens on the company's own page, so we only link out.
export default function LiveJobRow({ job }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14,
      padding: "16px 4px", borderBottom: "1px solid var(--line)",
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 17, fontWeight: 600 }}>{job.title}</div>
        <div style={{ fontSize: 13.5, color: "var(--muted)", margin: "3px 0 8px" }}>
          {job.company} · {job.location} · {job.type}{job.postedOn ? ` · Posted ${job.postedOn}` : ""}
        </div>
        {job.summary && <div style={{ fontSize: 13.5, lineHeight: 1.55, marginBottom: 8 }}>{job.summary}</div>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {job.tags.slice(0, 5).map((t) => (
            <span key={t} style={{ fontSize: 11.5, padding: "2px 8px", borderRadius: 999, border: "1px solid var(--line)", color: "var(--muted)" }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ minWidth: 110, textAlign: "right" }}>
        {job.url ? (
          <a className="btn-ghost" href={job.url} target="_blank" rel="noopener noreferrer">View & apply ↗</a>
        ) : (
          <span style={{ fontSize: 12, color: "var(--muted)" }}>No link provided</span>
        )}
      </div>
    </div>
  );
}
