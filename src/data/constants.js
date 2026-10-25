/* ---------------------------------------------------------
   Demo data and constants used across the app.
   SEED_JOBS is the original mock data - it is the "demo / fallback"
   data set, shown with a "Demo data" label in the UI.
--------------------------------------------------------- */
export const SKILL_POOL = ["React", "Node.js", "SQL", "Python", "Java", "AWS", "Figma", "DSA", "TypeScript", "Excel"];

export const SEED_JOBS = [
  { id: "j1", title: "Frontend Engineer Intern", company: "Northwind Labs", location: "Bengaluru", ctc: 8, experience: 0, skills: ["React", "TypeScript"], type: "Internship", postedByRecruiter: false,
    description: "Build customer-facing dashboards used by 40k daily merchants. You'll pair with senior engineers on real production surfaces from week one, not throwaway tasks.",
    eligibility: "CGPA 7.0+, no active backlogs, CSE/IT/ECE." },
  { id: "j2", title: "Backend Developer", company: "Ferrous Systems India", location: "Pune", ctc: 12, experience: 1, skills: ["Node.js", "SQL", "AWS"], type: "Full-time", postedByRecruiter: false,
    description: "Own services that process payouts for our logistics partners. Strong ownership culture — you ship, you monitor, you fix.",
    eligibility: "CGPA 6.5+, one prior internship or a shipped project preferred." },
  { id: "j3", title: "Data Analyst — Grad Program", company: "Meridian Retail", location: "Gurugram", ctc: 9, experience: 0, skills: ["SQL", "Python", "Excel"], type: "Full-time", postedByRecruiter: false,
    description: "Rotate across pricing, supply chain and marketing analytics in your first year. Heavy SQL, some Python, a lot of stakeholder conversation.",
    eligibility: "Any branch, CGPA 7.0+." },
  { id: "j4", title: "Software Engineer — New Grad", company: "Solace Cloud", location: "Remote", ctc: 18, experience: 0, skills: ["Java", "DSA", "AWS"], type: "Full-time", postedByRecruiter: true,
    description: "Work on the distributed job-scheduling layer that runs 2M+ tasks a day. Expect a DSA-heavy interview loop.",
    eligibility: "CGPA 7.5+, strong DSA fundamentals." },
  { id: "j5", title: "UI/UX Design Intern", company: "Northwind Labs", location: "Bengaluru", ctc: 5, experience: 0, skills: ["Figma"], type: "Internship", postedByRecruiter: false,
    description: "Redesign onboarding flows alongside product and engineering. Portfolio review is the main interview gate.",
    eligibility: "Any branch, design portfolio required." },
  { id: "j6", title: "Full Stack Developer", company: "Ferrous Systems India", location: "Pune", ctc: 15, experience: 2, skills: ["React", "Node.js", "SQL"], type: "Full-time", postedByRecruiter: true,
    description: "End-to-end feature ownership on our merchant portal — React on the front, Node + Postgres on the back.",
    eligibility: "CGPA 6.5+, at least one full-stack project on GitHub." },
  { id: "j7", title: "Cloud Support Engineer", company: "Meridian Retail", location: "Hyderabad", ctc: 7, experience: 0, skills: ["AWS", "SQL"], type: "Full-time", postedByRecruiter: false,
    description: "First line of response for infrastructure incidents. Great grounding role if you want to move into SRE later.",
    eligibility: "CGPA 6.0+, any branch." },
  { id: "j8", title: "Machine Learning Intern", company: "Solace Cloud", location: "Remote", ctc: 10, experience: 0, skills: ["Python", "DSA"], type: "Internship", postedByRecruiter: false,
    description: "Prototype ranking models for our internal search product. Publishable work if it pans out.",
    eligibility: "CGPA 7.5+, coursework in ML or equivalent project." },
];

export const CTC_BANDS = [
  { id: "0-5", label: "0–5 LPA", test: (v) => v <= 5 },
  { id: "5-10", label: "5–10 LPA", test: (v) => v > 5 && v <= 10 },
  { id: "10-15", label: "10–15 LPA", test: (v) => v > 10 && v <= 15 },
  { id: "15+", label: "15+ LPA", test: (v) => v > 15 },
];
export const EXP_BANDS = [
  { id: "0", label: "Fresher", test: (v) => v === 0 },
  { id: "1-2", label: "1–2 yrs", test: (v) => v >= 1 && v <= 2 },
  { id: "3+", label: "3+ yrs", test: (v) => v >= 3 },
];
export const STATUS_STEPS = ["Applied", "Shortlisted", "Interview", "Offer"];
export const STATUS_COLOR = {
  Applied: "var(--mustard)", Shortlisted: "var(--mustard)", Interview: "var(--mustard)",
  Offer: "var(--sage)", Rejected: "var(--rust)",
};

// Job types a recruiter can choose in the job form (dropdown)
export const JOB_TYPES = ["Full-time", "Internship"];

// Status values a recruiter can give an applicant
export const APPLICANT_STATUSES = ["Applied", "Shortlisted", "Interview", "Offer", "Rejected"];

// Demo applicants for the two seed jobs that were posted by a recruiter
// (ids are fixed strings so saved data stays consistent after a refresh)
export const SEED_APPLICANTS = {
  j4: [
    { id: "a1", name: "Aarav Mehta", branch: "CSE", cgpa: "8.4", status: "Shortlisted" },
    { id: "a2", name: "Diya Kulkarni", branch: "ECE", cgpa: "7.9", status: "Applied" },
  ],
  j6: [
    { id: "a3", name: "Rohan Iyer", branch: "IT", cgpa: "8.1", status: "Interview" },
  ],
};

export const EMPTY_PROFILE = { name: "", branch: "", cgpa: "", skills: [], resumeName: "" };
