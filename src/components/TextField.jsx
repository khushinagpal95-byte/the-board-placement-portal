import React from "react";

/* ---------------------------------------------------------
   Reusable form field: label + input/textarea/select + error text.
   Used by the profile form and the job form, so the look and the
   error handling are written only once.
   - as="input" (default) | "textarea" | "select"  (select gets <option>s as children)
--------------------------------------------------------- */
export default function TextField({
  label, name, value, onChange, onBlur, error, placeholder,
  as = "input", rows, style, children,
}) {
  const id = `field-${name}`;
  const common = {
    id, name, value, onChange, onBlur,
    className: error ? "has-error" : "",
    "aria-invalid": error ? "true" : "false",
  };

  return (
    <div style={style}>
      <label htmlFor={id} style={{ fontSize: 12.5, color: "var(--muted)", display: "block", marginBottom: 5 }}>
        {label}
      </label>
      {as === "textarea" && <textarea rows={rows} placeholder={placeholder} {...common} />}
      {as === "select" && <select {...common}>{children}</select>}
      {as === "input" && <input type="text" placeholder={placeholder} {...common} />}
      {error && (
        <div role="alert" style={{ color: "var(--rust)", fontSize: 12.5, marginTop: 5 }}>{error}</div>
      )}
    </div>
  );
}
