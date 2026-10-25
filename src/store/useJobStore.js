import { create } from "zustand";
import { SEED_JOBS, SEED_APPLICANTS, EMPTY_PROFILE } from "../data/constants.js";
import { saveToStorage } from "../utils/storage.js";
import { STORAGE_KEY, loadSavedState } from "./savedState.js";

/* ---------------------------------------------------------
   Zustand store = the GLOBAL data of the app.
   Why global? Many pages need the same data:
   - jobs: browse page, detail page, saved page, recruiter pages
   - savedIds / applications: nav counts + several pages
   - applicantsByJob: recruiter pages
   - profile: profile page + the "apply" check on the detail page

   Data that only one page needs (form text, search box text,
   modal open/closed) stays LOCAL in that page with useState.
--------------------------------------------------------- */

const defaultState = {
  jobs: SEED_JOBS,
  savedIds: [],              // array of job ids
  applications: {},          // { jobId: { status } }
  applicantsByJob: SEED_APPLICANTS, // { jobId: [applicant, ...] }
  profile: EMPTY_PROFILE,
};

export const useJobStore = create((set) => ({
  // starting values: saved data from localStorage, or the defaults
  ...loadSavedState(defaultState),

  /* ---------- jobs (recruiter CRUD) ---------- */
  addJob: (job) =>
    set((state) => ({
      jobs: [job, ...state.jobs],
      applicantsByJob: { ...state.applicantsByJob, [job.id]: [] },
    })),

  updateJob: (jobId, changes) =>
    set((state) => ({
      jobs: state.jobs.map((job) => (job.id === jobId ? { ...job, ...changes } : job)),
    })),

  deleteJob: (jobId) =>
    set((state) => {
      // also clean up everything that pointed to this job
      const applications = { ...state.applications };
      delete applications[jobId];
      const applicantsByJob = { ...state.applicantsByJob };
      delete applicantsByJob[jobId];
      return {
        jobs: state.jobs.filter((job) => job.id !== jobId),
        savedIds: state.savedIds.filter((id) => id !== jobId),
        applications,
        applicantsByJob,
      };
    }),

  /* ---------- student actions ---------- */
  toggleSave: (jobId) =>
    set((state) => ({
      savedIds: state.savedIds.includes(jobId)
        ? state.savedIds.filter((id) => id !== jobId)
        : [...state.savedIds, jobId],
    })),

  applyToJob: (jobId) =>
    set((state) => ({ applications: { ...state.applications, [jobId]: { status: "Applied" } } })),

  // used for "Withdraw" and also for rolling back a failed apply
  removeApplication: (jobId) =>
    set((state) => {
      const applications = { ...state.applications };
      delete applications[jobId];
      return { applications };
    }),

  saveProfile: (changes) => set((state) => ({ profile: { ...state.profile, ...changes } })),

  /* ---------- recruiter: applicants ---------- */
  changeApplicantStatus: (jobId, applicantId, status) =>
    set((state) => ({
      applicantsByJob: {
        ...state.applicantsByJob,
        [jobId]: (state.applicantsByJob[jobId] || []).map((ap) =>
          ap.id === applicantId ? { ...ap, status } : ap
        ),
      },
    })),

  resetDemoData: () => set({ ...defaultState }),
}));

// Every time the store changes, save the data part to localStorage.
useJobStore.subscribe((state) => {
  saveToStorage(STORAGE_KEY, {
    jobs: state.jobs,
    savedIds: state.savedIds,
    applications: state.applications,
    applicantsByJob: state.applicantsByJob,
    profile: state.profile,
  });
});
