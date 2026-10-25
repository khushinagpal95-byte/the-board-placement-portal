import { parseSkills } from "./validators.js";

// The job form keeps everything as text (that is how inputs work).
// These helpers convert between "form text" and a real job object.

export const emptyJobForm = {
  title: "", location: "", ctc: "", experience: "0",
  skills: "", type: "Full-time", description: "", eligibility: "",
};

// job object -> text values (used when editing a job)
export function jobToFormValues(job) {
  return {
    title: job.title,
    location: job.location,
    ctc: String(job.ctc),
    experience: String(job.experience),
    skills: job.skills.join(", "),
    type: job.type,
    description: job.description,
    eligibility: job.eligibility,
  };
}

// text values -> the job fields (numbers become real numbers)
export function formValuesToJob(values) {
  return {
    title: values.title.trim(),
    location: values.location.trim(),
    ctc: Number(values.ctc),
    experience: Number(values.experience),
    skills: parseSkills(values.skills),
    type: values.type,
    description: values.description.trim() || "No description provided yet.",
    eligibility: values.eligibility.trim() || "Not specified.",
  };
}
