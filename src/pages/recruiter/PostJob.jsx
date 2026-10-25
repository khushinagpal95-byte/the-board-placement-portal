import React from "react";
import { useNavigate } from "react-router-dom";
import { useJobStore } from "../../store/useJobStore.js";
import { useToast } from "../../context/ToastContext.jsx";
import { emptyJobForm, formValuesToJob } from "../../utils/jobForm.js";
import { makeId } from "../../utils/id.js";
import JobForm from "../../components/JobForm.jsx";

// CRUD "Create"
export default function PostJob() {
  const addJob = useJobStore((s) => s.addJob);
  const showToast = useToast();
  const navigate = useNavigate();

  const handleCreate = (values) => {
    addJob({
      id: makeId(),
      company: "Your Company",
      postedByRecruiter: true,
      ...formValuesToJob(values),
    });
    showToast("Job posted");
    navigate("/recruiter");
  };

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "26px 22px" }}>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, marginBottom: 18 }}>Post a job</h2>
      <JobForm initialValues={emptyJobForm} submitLabel="Publish job" onSubmit={handleCreate} />
    </div>
  );
}
