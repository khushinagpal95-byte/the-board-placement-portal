import { loadFromStorage } from "../utils/storage.js";

/* ---------------------------------------------------------
   Reads the saved demo data from localStorage - safely.
   We never trust stored data: each part is checked, and if it
   looks wrong we use the default value for that part instead.
--------------------------------------------------------- */

export const STORAGE_KEY = "theboard-demo-data-v1";

const isObject = (x) => typeof x === "object" && x !== null && !Array.isArray(x);

const isValidJob = (j) =>
  isObject(j) &&
  typeof j.id === "string" &&
  typeof j.title === "string" &&
  typeof j.company === "string" &&
  typeof j.location === "string" &&
  typeof j.ctc === "number" &&
  typeof j.experience === "number" &&
  Array.isArray(j.skills);

export function loadSavedState(defaults) {
  const saved = loadFromStorage(STORAGE_KEY, null);
  if (!isObject(saved)) return defaults;

  const jobs = Array.isArray(saved.jobs) && saved.jobs.every(isValidJob) ? saved.jobs : defaults.jobs;
  const savedIds = Array.isArray(saved.savedIds) ? saved.savedIds.filter((id) => typeof id === "string") : defaults.savedIds;
  const applications = isObject(saved.applications) ? saved.applications : defaults.applications;
  const applicantsByJob = isObject(saved.applicantsByJob) ? saved.applicantsByJob : defaults.applicantsByJob;
  // profile: start from the default shape, then copy over only the fields we know
  const profile = { ...defaults.profile };
  if (isObject(saved.profile)) {
    for (const key of Object.keys(defaults.profile)) {
      if (typeof saved.profile[key] === typeof defaults.profile[key]) profile[key] = saved.profile[key];
    }
  }

  return { jobs, savedIds, applications, applicantsByJob, profile };
}
