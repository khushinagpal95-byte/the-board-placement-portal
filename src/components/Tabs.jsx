import React from "react";

// tabs = [{ id: "demo", label: "Demo jobs" }, ...]
export default function Tabs({ tabs, activeId, onChange }) {
  return (
    <div role="tablist" style={{ display: "flex", gap: 22, borderBottom: "1px solid var(--line)", marginBottom: 18 }}>
      {tabs.map((tab) => (
        <button key={tab.id} role="tab" aria-selected={activeId === tab.id}
          className={`tab-btn ${activeId === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
