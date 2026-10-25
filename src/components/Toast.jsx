import React from "react";

export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div role="status" style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      background: "var(--ink)", color: "var(--bg)", padding: "10px 18px",
      borderRadius: 4, fontSize: 14, zIndex: 400, boxShadow: "0 6px 20px rgba(0,0,0,.25)",
      fontFamily: "var(--sans)",
    }}>
      {toast}
    </div>
  );
}
