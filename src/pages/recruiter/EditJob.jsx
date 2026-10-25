import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useJobStore } from "../../store/useJobStore.js";
import { useToast } from "../../context/ToastContext.jsx";
import { jobToFormValues, formValuesToJob } from "../../utils/jobForm.js";
import JobForm from "../../components/JobForm.jsx";

// CRUD "Update". Dynamic route: /recruiter/edit/:jobId
export default function EditJob() {
  const { jobId } = useParams();
  const job = useJobStore((s) => s.jobs.find((j) => j.id === jobId));
  const updateJob = useJobStore((s) => s.updateJob);
  const showToast = useToast();
  const navigate = useNavigate();

  // unknown id, or a job a recruiter did not post -> cannot be edited
  if (!job || !job.postedByRecruiter) {
    return (
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "26px 22px" }}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 24 }}>Job not found</h2>
        <p style={{ color: "var(--muted)" }}>We couldn't find a job of yours with this id.</p>
        <Link to="/recruiter">Back to your postings</Link>
      </div>
    );
  }

  const handleUpdate = (values) => {
    updateJob(job.id, formValuesToJob(values));
    showToast("Job updated");
    navigate("/recruiter");
  };

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "26px 22px" }}>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, marginBottom: 18 }}>Edit job</h2>
      <JobForm initialValues={jobToFormValues(job)} submitLabel="Save changes" onSubmit={handleUpdate} />
    </div>
  );
}
