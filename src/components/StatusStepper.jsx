import React from "react";
import { STATUS_STEPS } from "../data/constants.js";

export default function StatusStepper({ status }) {
  const rejected = status === "Rejected";
  const idx = rejected ? STATUS_STEPS.length : STATUS_STEPS.indexOf(status);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
      {STATUS_STEPS.map((step, i) => {
        const done = !rejected && i <= idx;
        return (
          <React.Fragment key={step}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 9, height: 9, borderRadius: "50%",
                background: done ? "var(--sage)" : "var(--line)",
                border: done ? "none" : "1px solid var(--line)",
              }} />
              <span style={{
                fontSize: 12.5, fontFamily: "var(--sans)",
                color: done ? "var(--ink)" : "var(--muted)",
              }}>{step}</span>
            </div>
            {i < STATUS_STEPS.length - 1 && (
              <div style={{ width: 18, height: 1, background: done ? "var(--sage)" : "var(--line)" }} />
            )}
          </React.Fragment>
        );
      })}
      {rejected && (
        <span style={{ marginLeft: 8, fontSize: 12.5, color: "var(--rust)", fontFamily: "var(--sans)", fontWeight: 600 }}>
          Not moving forward
        </span>
      )}
    </div>
  );
}
