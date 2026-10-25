import React from "react";
import Modal from "./Modal.jsx";

// "Are you sure?" popup built on top of Modal. Used before deleting / resetting.
export default function ConfirmModal({ title, message, confirmLabel, onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p style={{ lineHeight: 1.6, color: "var(--muted)", fontSize: 14, margin: "0 0 20px" }}>{message}</p>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button className="btn-ghost" onClick={onCancel}>Cancel</button>
        <button className="btn-danger" onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </Modal>
  );
}
