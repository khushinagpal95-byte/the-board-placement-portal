# The Board — Job Board & Placement Portal

A two-sided frontend portal. **Students** browse and filter jobs, save jobs, upload a
resume, apply and track application status. **Recruiters** post, edit and delete jobs,
view applicants and update their status.

Built with React 18, Vite, JavaScript, lucide-react, **React Router** and **Zustand**.
There is no backend: everything runs in the browser.

## Setup and run (Windows / macOS / Linux)

You need Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

```bash
npm run build     # production build (output in dist/)
npm run preview   # serve the production build locally
```

> The first `npm install` also updates `package-lock.json` to include the two new
> packages (`react-router-dom`, `zustand`). That is normal.

## Pages (React Router)

| URL | Page | Who |
|---|---|---|
| `/` | Role picker | everyone |
| `/student` | Browse jobs (Demo / Live tabs) | student |
| `/student/jobs/:jobId` | Job detail | student |
| `/student/applications` | Application tracker | student |
| `/student/saved` | Saved jobs | student |
| `/student/profile` | Profile form | student |
| `/recruiter` | Your postings + applicants | recruiter |
| `/recruiter/post` | Post a job | recruiter |
| `/recruiter/edit/:jobId` | Edit a job | recruiter |
| anything else | 404 page | everyone |

**Role selection is frontend demo logic only.** There is no password or server; the chosen
role is remembered in `localStorage` so the route guards can be demonstrated. It is not
real security.

## Features

Existing features (kept): role selection, job filters (location, CTC, experience, skills),
job detail, saved jobs, resume validation (PDF/Word, max 2 MB), apply/withdraw with the
optimistic-update + simulated-failure rollback demo, application status tracker, profile
completion meter, recruiter postings, applicant status changes, toasts.

New in this version:

- Real multi-page routing with nested routes, dynamic routes (`:jobId`), route guards and a 404 page
- Search (debounced), sort dropdown and pagination; all stored in the URL, so the
  "Shareable filter link" now genuinely restores the search
- **Live jobs tab** using the public Arbeitnow API, with loading, error, retry and empty states
- Recruiter CRUD: create, read, update (edit page) and delete (with confirmation popup)
- Validated forms (profile and job) built from reusable `TextField` + `useForm`
- Modal, tabs, dropdowns and toast notifications
- Demo data saved in `localStorage` (jobs, saved jobs, applications, profile), read safely
- "Reset demo data" link in the footer

## Data: what is demo, what is live

- **Demo data** (labelled "Demo data"): the original seed jobs and recruiter-posted jobs.
  Stored in your browser's `localStorage`; never sent anywhere.
- **Live data** (labelled "Live data · Arbeitnow API"): fetched from
  `https://www.arbeitnow.com/api/job-board-api` (free, no key).

API limitations:

- Only the first page of results is loaded (about 100 latest jobs); search/sort/pagination
  then work on those.
- Live jobs have no CTC or experience fields, so CTC/experience/skills filters apply only to demo jobs.
- Applying to a live job happens on the company's own page (link opens in a new tab).
- The jobs are mostly Europe-based or remote. If the API is down or you are offline, the
  Live tab shows an error with **Retry**, and **Use demo jobs instead**.

## Dependencies

react, react-dom, lucide-react (original) + `react-router-dom` (routing) and `zustand`
(global store). Dev: vite, @vitejs/plugin-react.

See **PROJECT_GUIDE.md** for a beginner-friendly walkthrough of the code.
