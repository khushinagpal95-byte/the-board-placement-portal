import React from "react";

// Previous / Next buttons with a "Page x of y" label.
export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null; // nothing to paginate
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, padding: "18px 0 4px" }}>
      <button className="btn-ghost" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Previous</button>
      <span style={{ fontSize: 13, color: "var(--muted)" }}>Page {page} of {totalPages}</span>
      <button className="btn-ghost" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Next</button>
    </div>
  );
}
