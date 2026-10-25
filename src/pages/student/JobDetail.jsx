import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useJobStore } from "../../store/useJobStore.js";
import { useToast } from "../../context/ToastContext.jsx";

// Dynamic route: /student/jobs/:jobId  -> useParams() gives us the jobId from the URL.
export default function JobDetail() {
  const { jobId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const showToast = useToast();

  const job = useJobStore((s) => s.jobs.find((j) => j.id === jobId));
  const application = useJobStore((s) => s.applications[jobId]);
  const isSaved = useJobStore((s) => s.savedIds.includes(jobId));
  const hasResume = useJobStore((s) => Boolean(s.profile.resumeName));
  const toggleSave = useJobStore((s) => s.toggleSave);
  const applyToJob = useJobStore((s) => s.applyToJob);
  const removeApplication = useJobStore((s) => s.removeApplication);

  // local state: only this page uses it
  const [simulateFailure, setSimulateFailure] = useState(false);

  const backTo = location.state?.backTo || "/student";

  // The id in the URL might not exist (old link, deleted job)
  if (!job) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "26px 22px" }}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 24 }}>Job not found</h2>
        <p style={{ color: "var(--muted)" }}>This job doesn't exist any more. It may have been removed by the recruiter.</p>
        <Link to="/student">Back to listings</Link>
      </div>
    );
  }

  const handleApply = () => {
    if (!hasResume) {
      showToast("Add a resume in your profile before applying");
      navigate("/student/profile");
      return;
    }
    // optimistic update: show "Applied" immediately...
    applyToJob(job.id);
    showToast("Application sent");
    // ...then pretend the server answered 0.7s later. If it "failed", roll back.
    setTimeout(() => {
      if (simulateFailure) {
        removeApplication(job.id);
        showToast("Application failed — rolled back. Try again.");
      }
    }, 700);
  };

  const handleWithdraw = () => {
    removeApplication(job.id);
    showToast("Application withdrawn");
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "26px 22px" }}>
      <Link to={backTo} className="navlink" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 18 }}>
        <ArrowLeft size={14} /> Back to listings
      </Link>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, margin: "0 0 4px" }}>{job.title}</h2>
      <div style={{ color: "var(--muted)", marginBottom: 18 }}>{job.company} · {job.location} · ₹{job.ctc} LPA · {job.experience === 0 ? "Fresher" : `${job.experience}+ yrs`}</div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 }}>
        {job.skills.map((s) => <span key={s} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 999, border: "1px solid var(--line)", color: "var(--muted)" }}>{s}</span>)}
      </div>

      <h4 style={{ fontFamily: "var(--sans)", fontSize: 13.5, color: "var(--muted)", marginBottom: 6 }}>About the role</h4>
      <p style={{ lineHeight: 1.7, marginBottom: 20 }}>{job.description}</p>

      <h4 style={{ fontFamily: "var(--sans)", fontSize: 13.5, color: "var(--muted)", marginBottom: 6 }}>Eligibility</h4>
      <p style={{ lineHeight: 1.7, marginBottom: 26 }}>{job.eligibility}</p>

      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        {application ? (
          <>
            <span style={{ fontSize: 13.5, color: "var(--teal)", fontWeight: 600 }}>Applied — {application.status}</span>
            <button className="btn-ghost" onClick={handleWithdraw}>Withdraw</button>
          </>
        ) : (
          <button className="btn-primary" onClick={handleApply}>Apply now</button>
        )}
        <button className="btn-ghost" onClick={() => toggleSave(job.id)}>
          {isSaved ? "Saved" : "Save for later"}
        </button>
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 22, fontSize: 12, color: "var(--muted)" }}>
        <input type="checkbox" style={{ width: "auto" }} checked={simulateFailure} onChange={(e) => setSimulateFailure(e.target.checked)} />
        Simulate a failed apply (demonstrates optimistic-update rollback)
      </label>
    </div>
  );
}
