import React, { useEffect } from "react";

// A simple popup. Click the dark background or press Escape to close.
export default function Modal({ title, children, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(27,31,29,.45)", zIndex: 300,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()} style={{
        background: "var(--surface)", borderRadius: 6, maxWidth: 420, width: "100%", padding: 22,
        border: "1px solid var(--line)", boxShadow: "0 12px 40px rgba(0,0,0,.25)",
      }}>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, margin: "0 0 10px" }}>{title}</h3>
        {children}
      </div>
    </div>
  );
}
