import React from "react";

export default function Pill({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick} style={{
      padding: "6px 12px", borderRadius: 999, fontSize: 13, cursor: "pointer",
      border: `1px solid ${active ? "var(--teal)" : "var(--line)"}`,
      background: active ? "var(--teal)" : "transparent",
      color: active ? "#fff" : "var(--ink)",
      fontFamily: "var(--sans)", transition: "all .15s ease",
    }}>
      {children}
    </button>
  );
}
