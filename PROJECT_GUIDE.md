# Project guide (for studying and the viva)

## 1. Folder structure

```
src/
  main.jsx            starts React and wraps the app in <BrowserRouter>
  App.jsx             the ROUTE MAP (which URL shows which page) + Context providers
  index.css           colours, fonts and shared styles (moved from the old App.jsx)
  pages/              one file per screen
    RolePicker.jsx, NotFound.jsx
    student/   BrowseJobs, JobDetail, Applications, SavedJobs, Profile
    recruiter/ MyPostings, PostJob, EditJob
  components/         small reusable pieces
    NavBar, PortalLayout, ProtectedRoute, TextField, JobForm, Modal, ConfirmModal,
    Tabs, Pagination, Pill, Toast, StatusStepper, JobRow, LiveJobRow, LiveJobsPanel, DataBadge
  context/            Context API: RoleContext.jsx, ToastContext.jsx
  store/              Zustand: useJobStore.js (+ savedState.js for safe loading)
  hooks/              useForm, useDebounce, useLiveJobs
  services/jobsApi.js the fetch() call to the live jobs API
  utils/              plain functions: validators, jobFilters, jobForm, storage, id
  data/constants.js   the original demo jobs + filter bands
```

The old 771-line `App.jsx` was split into these files. The look (colours, fonts, layout) is unchanged.

## 2. React Router (navigation)

- `main.jsx` wraps the app in `<BrowserRouter>`: the URL changes but the page never reloads (SPA).
- `App.jsx` has `<Routes>` with `<Route path=... element=... />`.
- **Nested routes:** `/student` renders `PortalLayout` (nav bar). The child page
  (browse, saved, ...) appears where `PortalLayout` has `<Outlet />`.
- **Dynamic routes:** `jobs/:jobId` and `edit/:jobId`. The page reads the id with `useParams()`.
- **Protected routes:** `ProtectedRoute.jsx` checks the role from Context. No role: redirect to `/`.
  Wrong role: redirect to your own home. It uses `<Navigate />`.
- **404:** `path="*"` shows `NotFound.jsx`.
- Links: `<Link>` / `<NavLink>` (NavLink knows if it is the active page). `useNavigate()` changes page from code.
- **Query string:** `useSearchParams()` in `BrowseJobs.jsx` stores filters in the URL.

## 3. State: where each piece lives and why

| State | Where | Why |
|---|---|---|
| role (student/recruiter) | Context (`RoleContext`) | needed by the guard, nav bar and picker |
| toast message | Context (`ToastContext`) | any page can call `showToast()` |
| jobs, saved ids, applications, applicants, profile | **Zustand** (`useJobStore`) | many pages share it and it is saved to localStorage |
| form text, search box text, modal open/closed, "simulate failure" checkbox, live-API loading/error | **local** `useState` | only one page/component needs it |

Rule of thumb: keep state as local as possible; make it global only when several pages need it.
Context is used for two small "app-wide settings"; Zustand holds the bigger data with actions
(`addJob`, `updateJob`, `deleteJob`, `toggleSave`, `applyToJob` ...). Each piece lives in only one place.

In a component: `const jobs = useJobStore((s) => s.jobs);` (pick only what you need).
At the bottom of `useJobStore.js`, `subscribe` saves the data to localStorage after every change.

## 4. Forms and validation

- **Controlled components:** every input has `value={...}` and `onChange` that updates state.
- `hooks/useForm.js` holds `values` and `errors`:
  `handleChange` (typing, clears that field's error), `handleBlur` (validate when leaving a field),
  `handleSubmit` (validate everything; only call your function if there are no errors).
- `utils/validators.js` has plain functions `validateProfile`, `validateJob`, `validateResumeFile`.
  They return an object like `{ title: "Job title is required." }`; `{}` means valid.
- `components/TextField.jsx` is the reusable field (label + input/textarea/select + error text).
- `JobForm.jsx` is used by both Post and Edit pages (create and update share one form).

## 5. Search, debounce, filter, sort, pagination

All in `BrowseJobs.jsx` + `utils/jobFilters.js`:

1. Settings are read from the URL (`searchParams.get("q")` ...).
2. `filterJobs(jobs, filters)`: search text, location, CTC, experience, skills.
3. `sortJobs(list, sortKey)`: returns a sorted **copy**.
4. `paginate(list, page, 5)`: cuts out one page.
5. **Debounce** (`hooks/useDebounce.js`): the box shows what you type instantly; the real search
   (URL) changes only after you pause 400 ms. This avoids filtering on every key press.

## 6. API requests, loading/error, fallback

- `services/jobsApi.js`: `fetchLiveJobs()` calls `fetch(...)`, checks `response.ok`, checks the JSON
  shape, converts each job into our shape (HTML description to plain text), and throws a readable
  `Error` when something fails.
- `hooks/useLiveJobs.js`: keeps `jobs`, `loading`, `error`; `useEffect` runs the request;
  `retry()` runs it again; the cleanup cancels the request if you leave.
- `components/LiveJobsPanel.jsx` shows 4 states: loading, error (Retry + "Use demo jobs instead"),
  empty, and the list.
- Fallback: the **Demo jobs** tab always works offline. Tabs show badges: "Demo data" vs "Live data".

## 7. CRUD (recruiter jobs)

| Action | Where |
|---|---|
| Create | `PostJob.jsx` -> `addJob()` |
| Read | `MyPostings.jsx` (list + applicants) |
| Update | `EditJob.jsx` (`/recruiter/edit/:jobId`) -> `updateJob()` |
| Delete | trash icon in `MyPostings.jsx` -> `ConfirmModal` -> `deleteJob()` |

Deleting also removes that job from saved lists, applications and applicants.

## 8. What is stored where

- **localStorage** `theboard-demo-data-v1`: jobs, saved ids, applications, applicants, profile.
- **localStorage** `theboard-role`: chosen role (demo only).
- **External API:** only the Live jobs tab (read-only, never stored).
- `store/savedState.js` checks stored data before using it. Broken or wrong-shaped data is ignored
  and defaults are used. `utils/storage.js` wraps localStorage in try/catch.
- Resume: only the file *name* is kept (no real file storage).

## 9. CE-II topics and where they appear

| Topic | Files |
|---|---|
| Multi-page SPA, nested/dynamic routes, protected routes, 404 | `main.jsx`, `App.jsx`, `ProtectedRoute.jsx`, `PortalLayout.jsx`, `NotFound.jsx` |
| Component architecture, reusable components | `components/` |
| Custom hooks | `useForm`, `useDebounce`, `useLiveJobs` |
| Context API | `context/RoleContext.jsx`, `context/ToastContext.jsx` |
| Global vs local state, Zustand | `store/useJobStore.js` (global) vs `useState` in pages |
| Async state, loading/error/retry | `useLiveJobs.js`, `LiveJobsPanel.jsx`, optimistic apply in `JobDetail.jsx` |
| Forms, controlled inputs, validation, reusable inputs | `useForm.js`, `validators.js`, `TextField.jsx`, `JobForm.jsx`, `Profile.jsx` |
| Modal, tabs, dropdowns, toast | `Modal.jsx`, `ConfirmModal.jsx`, `Tabs.jsx`, sort/location/status selects, `Toast.jsx` |
| Search, filter, sort, pagination, debounce | `BrowseJobs.jsx`, `jobFilters.js`, `Pagination.jsx`, `useDebounce.js` |
| REST API with fetch | `services/jobsApi.js` |
| CRUD workflow | `PostJob.jsx`, `MyPostings.jsx`, `EditJob.jsx` |

**Not used on purpose:** Redux Toolkit (Zustand covers the "state library" topic), Axios (`fetch` is enough),
infinite scroll (pagination chosen instead), any backend or paid API.
