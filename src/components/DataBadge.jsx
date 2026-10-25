import React from "react";

// Small label that tells the user where the job data comes from.
export default function DataBadge({ kind }) {
  const live = kind === "live";
  const color = live ? "var(--sage)" : "var(--mustard)";
  return (
    <span style={{
      fontSize: 11.5, fontWeight: 600, padding: "2px 9px", borderRadius: 999,
      border: `1px solid ${color}`, color,
    }}>
      {live ? "Live data · Arbeitnow API" : "Demo data"}
    </span>
  );
}
