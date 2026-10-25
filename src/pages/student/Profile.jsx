import React, { useState } from "react";
import { FileText, Trash2, Upload } from "lucide-react";
import { SKILL_POOL } from "../../data/constants.js";
import { useJobStore } from "../../store/useJobStore.js";
import { useToast } from "../../context/ToastContext.jsx";
import useForm from "../../hooks/useForm.js";
import { validateProfile, validateResumeFile } from "../../utils/validators.js";
import TextField from "../../components/TextField.jsx";
import Pill from "../../components/Pill.jsx";

export default function Profile() {
  const profile = useJobStore((s) => s.profile);
  const saveProfile = useJobStore((s) => s.saveProfile);
  const showToast = useToast();

  // The form text is LOCAL state (a draft). It goes into the global store only when "Save" is valid.
  const { values, setValues, errors, setErrors, handleChange, handleBlur, handleSubmit } = useForm(
    { name: profile.name, branch: profile.branch, cgpa: profile.cgpa, skills: profile.skills },
    validateProfile
  );
  const [resumeError, setResumeError] = useState("");

  const toggleSkill = (skill) => {
    const list = values.skills.includes(skill) ? values.skills.filter((x) => x !== skill) : [...values.skills, skill];
    setValues((v) => ({ ...v, skills: list }));
    setErrors((e) => ({ ...e, skills: "" }));
  };

  const handleResume = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const message = validateResumeFile(file);
    if (message) { setResumeError(message); return; }
    setResumeError("");
    saveProfile({ resumeName: file.name }); // only the file name is kept (no real storage)
    showToast("Resume added");
  };

  const onValidSubmit = (formValues) => {
    saveProfile({
      name: formValues.name.trim(),
      branch: formValues.branch.trim(),
      cgpa: formValues.cgpa.trim(),
      skills: formValues.skills,
    });
    showToast("Profile saved");
  };

  // completion meter (same rule as before), now live while typing
  const fields = [values.name, values.branch, values.cgpa, values.skills.length > 0, profile.resumeName];
  const completion = Math.round((fields.filter(Boolean).length / fields.length) * 100);

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "26px 22px" }}>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, marginBottom: 6 }}>Your profile</h2>
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "var(--muted)", marginBottom: 6 }}>
          <span>Profile completion</span><span>{completion}%</span>
        </div>
        <div style={{ height: 6, background: "var(--line)", borderRadius: 999 }}>
          <div style={{ width: `${completion}%`, height: "100%", background: "var(--teal)", borderRadius: 999, transition: "width .3s" }} />
        </div>
      </div>

      <form onSubmit={handleSubmit(onValidSubmit)} noValidate style={{ display: "grid", gap: 14 }}>
        <TextField label="Full name" name="name" value={values.name} error={errors.name}
          onChange={handleChange} onBlur={handleBlur} placeholder="e.g. Priya Sharma" />
        <div className="form-row" style={{ display: "flex", gap: 12 }}>
          <TextField style={{ flex: 1 }} label="Branch" name="branch" value={values.branch} error={errors.branch}
            onChange={handleChange} onBlur={handleBlur} placeholder="e.g. CSE" />
          <TextField style={{ flex: 1 }} label="CGPA" name="cgpa" value={values.cgpa} error={errors.cgpa}
            onChange={handleChange} onBlur={handleBlur} placeholder="e.g. 8.2" />
        </div>
        <div>
          <span style={{ fontSize: 12.5, color: "var(--muted)", display: "block", marginBottom: 6 }}>Skills</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {SKILL_POOL.map((s) => (
              <Pill key={s} active={values.skills.includes(s)} onClick={() => toggleSkill(s)}>{s}</Pill>
            ))}
          </div>
          {errors.skills && <div role="alert" style={{ color: "var(--rust)", fontSize: 12.5, marginTop: 6 }}>{errors.skills}</div>}
        </div>
        <div>
          <span style={{ fontSize: 12.5, color: "var(--muted)", display: "block", marginBottom: 6 }}>Resume</span>
          {profile.resumeName ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 11px", border: "1px solid var(--line)", borderRadius: 4, background: "#fff" }}>
              <FileText size={15} color="var(--teal)" />
              <span style={{ fontSize: 13.5, flex: 1 }}>{profile.resumeName}</span>
              <button type="button" aria-label="Remove resume" onClick={() => saveProfile({ resumeName: "" })} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <Trash2 size={14} color="var(--muted)" />
              </button>
            </div>
          ) : (
            <label style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              border: "1px dashed var(--line)", borderRadius: 4, padding: "16px", cursor: "pointer", color: "var(--muted)", fontSize: 13.5,
            }}>
              <Upload size={15} /> Upload PDF or Word, up to 2 MB
              <input type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }} onChange={handleResume} />
            </label>
          )}
          {resumeError && <div role="alert" style={{ color: "var(--rust)", fontSize: 12.5, marginTop: 6 }}>{resumeError}</div>}
        </div>
        <button type="submit" className="btn-primary">Save profile</button>
      </form>
    </div>
  );
}
