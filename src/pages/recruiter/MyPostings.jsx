import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Plus, Trash2, Pencil } from "lucide-react";
import { APPLICANT_STATUSES } from "../../data/constants.js";
import { useJobStore } from "../../store/useJobStore.js";
import { useToast } from "../../context/ToastContext.jsx";
import ConfirmModal from "../../components/ConfirmModal.jsx";

// CRUD: this page is the "Read" (list), "Update" (Edit link) and "Delete" (trash + confirm).
export default function MyPostings() {
  const jobs = useJobStore((s) => s.jobs);
  const applicantsByJob = useJobStore((s) => s.applicantsByJob);
  const deleteJob = useJobStore((s) => s.deleteJob);
  const changeApplicantStatus = useJobStore((s) => s.changeApplicantStatus);
  const showToast = useToast();

  // local state: which applicants panel is open, and which job is waiting for delete confirmation
  const [openJobId, setOpenJobId] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);

  const recruiterJobs = jobs.filter((j) => j.postedByRecruiter);

  const confirmDelete = () => {
    deleteJob(jobToDelete.id);
    showToast("Job removed");
    setJobToDelete(null);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "26px 22px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, margin: 0 }}>Your postings</h2>
        <Link to="/recruiter/post" className="btn-primary" style={{ textDecoration: "none", color: "#fff" }}>
          <Plus size={14} style={{ verticalAlign: -2, marginRight: 4 }} />Post a job
        </Link>
      </div>
      {recruiterJobs.length === 0 && (
        <div style={{ padding: 30, textAlign: "center", color: "var(--muted)", border: "1px dashed var(--line)", borderRadius: 6 }}>You haven't posted anything yet.</div>
      )}
      {recruiterJobs.map((job) => {
        const applicants = applicantsByJob[job.id] || [];
        return (
          <div key={job.id} style={{ padding: "16px 4px", borderBottom: "1px solid var(--line)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 16.5 }}>{job.title}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", margin: "3px 0 10px" }}>{job.location} · ₹{job.ctc} LPA · {job.type}</div>
                <button className="btn-ghost" onClick={() => setOpenJobId(openJobId === job.id ? null : job.id)}>
                  <Users size={13} style={{ verticalAlign: -2, marginRight: 5 }} />
                  {applicants.length} applicant{applicants.length !== 1 ? "s" : ""}
                </button>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <Link to={`/recruiter/edit/${job.id}`} aria-label={`Edit ${job.title}`} style={{ color: "var(--muted)", padding: 4, display: "inline-flex" }}>
                  <Pencil size={16} />
                </Link>
                <button aria-label={`Delete ${job.title}`} onClick={() => setJobToDelete(job)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            {openJobId === job.id && (
              <div style={{ marginTop: 14, background: "#fbfbf8", border: "1px solid var(--line)", borderRadius: 6, padding: 14 }}>
                {applicants.length === 0 && <div style={{ fontSize: 13, color: "var(--muted)" }}>No applicants yet.</div>}
                {applicants.map((ap) => (
                  <div key={ap.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid var(--line)" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{ap.name}</div>
                      <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{ap.branch} · CGPA {ap.cgpa}</div>
                    </div>
                    <select aria-label={`Status for ${ap.name}`} value={ap.status} onChange={(e) => changeApplicantStatus(job.id, ap.id, e.target.value)} style={{ width: 150 }}>
                      {APPLICANT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {jobToDelete && (
        <ConfirmModal
          title="Delete this job?"
          message={`"${jobToDelete.title}" and its applicants will be removed. This cannot be undone.`}
          confirmLabel="Delete"
          onCancel={() => setJobToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
