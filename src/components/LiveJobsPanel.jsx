import React from "react";
import useLiveJobs from "../hooks/useLiveJobs.js";
import { matchesSearch, sortJobs, paginate } from "../utils/jobFilters.js";
import LiveJobRow from "./LiveJobRow.jsx";
import Pagination from "./Pagination.jsx";
import DataBadge from "./DataBadge.jsx";

const PAGE_SIZE = 8;
const boxStyle = { padding: 30, textAlign: "center", color: "var(--muted)", border: "1px dashed var(--line)", borderRadius: 6 };
const errorBoxStyle = { ...boxStyle, border: "1px dashed var(--rust)" }; // same box, red border

// Shows jobs from the public API with loading, error + retry and empty states.
export default function LiveJobsPanel({ q, sortKey, page, onPageChange, onUseDemo }) {
  const { jobs, loading, error, retry } = useLiveJobs();

  // 1) LOADING
  if (loading) {
    return <div style={boxStyle}>Loading live jobs from the Arbeitnow API…</div>;
  }

  // 2) ERROR - offer Retry, or go back to the demo jobs (the fallback)
  if (error) {
    return (
      <div style={errorBoxStyle}>
        <div style={{ color: "var(--rust)", fontWeight: 600, marginBottom: 6 }}>Couldn't load live jobs</div>
        <div style={{ marginBottom: 16, fontSize: 14 }}>{error}</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={retry}>Retry</button>
          <button className="btn-ghost" onClick={onUseDemo}>Use demo jobs instead</button>
        </div>
      </div>
    );
  }

  // 3) SUCCESS - search, sort, then show one page
  const searched = jobs.filter((job) => matchesSearch(job, q));
  const sorted = sortJobs(searched, sortKey);
  const { pageItems, totalPages, currentPage } = paginate(sorted, page, PAGE_SIZE);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <DataBadge kind="live" />
        <span style={{ fontSize: 13, color: "var(--muted)" }}>
          {sorted.length} opening{sorted.length !== 1 ? "s" : ""} (search covers the {jobs.length} latest jobs loaded)
        </span>
      </div>

      {/* 4) EMPTY */}
      {pageItems.length === 0 && (
        <div style={boxStyle}>No live jobs match your search. Try a different word.</div>
      )}
      {pageItems.map((job) => <LiveJobRow key={job.id} job={job} />)}

      <Pagination page={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
