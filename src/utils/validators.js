/* ---------------------------------------------------------
   Form validation (no backend needed).
   Each function receives the form values and returns an
   "errors" object, e.g. { title: "Title is required." }.
   An empty object {} means the form is valid.
--------------------------------------------------------- */

export function validateProfile(values) {
  const errors = {};

  const name = values.name.trim();
  if (!name) errors.name = "Full name is required.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  else if (!/^[\p{L}][\p{L} .'-]*$/u.test(name)) errors.name = "Name can only have letters, spaces, dots, hyphens and apostrophes.";

  const branch = values.branch.trim();
  if (!branch) errors.branch = "Branch is required.";
  else if (branch.length < 2 || branch.length > 30) errors.branch = "Branch must be 2-30 characters (e.g. CSE).";

  const cgpaText = values.cgpa.trim();
  if (!cgpaText) errors.cgpa = "CGPA is required.";
  else if (isNaN(Number(cgpaText))) errors.cgpa = "CGPA must be a number, like 8.2";
  else if (Number(cgpaText) < 0 || Number(cgpaText) > 10) errors.cgpa = "CGPA must be between 0 and 10.";

  if (values.skills.length === 0) errors.skills = "Pick at least one skill.";

  return errors;
}

export function validateJob(values) {
  const errors = {};

  const title = values.title.trim();
  if (!title) errors.title = "Job title is required.";
  else if (title.length < 3) errors.title = "Title must be at least 3 characters.";
  else if (title.length > 60) errors.title = "Title can be at most 60 characters.";

  const location = values.location.trim();
  if (!location) errors.location = "Location is required.";
  else if (location.length < 2 || location.length > 40) errors.location = "Location must be 2-40 characters.";

  const ctcText = values.ctc.trim();
  if (!ctcText) errors.ctc = "CTC is required.";
  else if (isNaN(Number(ctcText)) || Number(ctcText) <= 0) errors.ctc = "CTC must be a number greater than 0.";
  else if (Number(ctcText) > 200) errors.ctc = "CTC looks too high (max 200 LPA).";

  const expText = values.experience.trim();
  if (expText === "") errors.experience = "Enter 0 for freshers.";
  else if (!/^\d+$/.test(expText) || Number(expText) > 20) errors.experience = "Whole number from 0 to 20.";

  const skills = parseSkills(values.skills);
  if (skills.length > 10) errors.skills = "Add at most 10 skills.";
  else if (skills.some((s) => s.length > 30)) errors.skills = "Each skill must be under 30 characters.";

  if (values.description.length > 600) errors.description = "Description can be at most 600 characters.";
  if (values.eligibility.length > 200) errors.eligibility = "Eligibility can be at most 200 characters.";

  return errors;
}

// Checks the chosen resume file. Returns an error message, or "" if it is fine.
export function validateResumeFile(file) {
  const okType = /\.(pdf|doc|docx)$/i.test(file.name);
  const okSize = file.size <= 2 * 1024 * 1024;
  if (!okType) return "Only PDF or Word documents are accepted.";
  if (!okSize) return "File must be under 2 MB.";
  return "";
}

// "React, Node.js ,, SQL" -> ["React", "Node.js", "SQL"] (no empty items, no duplicates)
export function parseSkills(text) {
  const list = text.split(",").map((s) => s.trim()).filter(Boolean);
  return [...new Set(list)];
}
