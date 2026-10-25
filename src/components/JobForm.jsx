import React from "react";
import useForm from "../hooks/useForm.js";
import { validateJob } from "../utils/validators.js";
import { JOB_TYPES } from "../data/constants.js";
import TextField from "./TextField.jsx";

// The recruiter form. Used for BOTH "Post a job" (create) and "Edit job" (update).
// The parent page decides what happens on submit via the onSubmit prop.
export default function JobForm({ initialValues, submitLabel, onSubmit }) {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(initialValues, validateJob);
  const field = { onChange: handleChange, onBlur: handleBlur };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: "grid", gap: 14 }}>
      <TextField label="Title" name="title" value={values.title} error={errors.title} placeholder="e.g. Frontend Developer" {...field} />
      <div className="form-row" style={{ display: "flex", gap: 12 }}>
        <TextField style={{ flex: 1 }} label="Location" name="location" value={values.location} error={errors.location} placeholder="e.g. Chennai" {...field} />
        <TextField style={{ flex: 1 }} label="CTC (LPA)" name="ctc" value={values.ctc} error={errors.ctc} placeholder="e.g. 10" {...field} />
        <TextField style={{ flex: 1 }} label="Min. experience" name="experience" value={values.experience} error={errors.experience} placeholder="0" {...field} />
      </div>
      <TextField as="select" label="Job type" name="type" value={values.type} error={errors.type} {...field}>
        {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
      </TextField>
      <TextField label="Skills (comma separated)" name="skills" value={values.skills} error={errors.skills} placeholder="React, Node.js, SQL" {...field} />
      <TextField as="textarea" rows={4} label="Description" name="description" value={values.description} error={errors.description} placeholder="What will they actually work on?" {...field} />
      <TextField as="textarea" rows={2} label="Eligibility" name="eligibility" value={values.eligibility} error={errors.eligibility} placeholder="CGPA cutoff, branch, backlogs policy" {...field} />
      <button type="submit" className="btn-primary">{submitLabel}</button>
    </form>
  );
}
