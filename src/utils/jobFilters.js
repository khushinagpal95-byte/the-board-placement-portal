import { CTC_BANDS, EXP_BANDS } from "../data/constants.js";

/* ---------------------------------------------------------
   Search / filter / sort / paginate helpers.
   These are plain functions: give them a list, get a new list.
   They do not touch React state, which makes them easy to explain.
--------------------------------------------------------- */

// Does the job match the search text? (title, company, and tags for live jobs)
export function matchesSearch(job, q) {
  if (!q) return true;
  const text = `${job.title} ${job.company} ${(job.tags || []).join(" ")}`.toLowerCase();
  return text.includes(q.toLowerCase());
}

// filters = { q, location, ctc, exp, skills }
export function filterJobs(jobs, filters) {
  return jobs.filter((j) => {
    if (!matchesSearch(j, filters.q)) return false;
    if (filters.location !== "All" && j.location !== filters.location) return false;
    if (filters.ctc !== "All") {
      const band = CTC_BANDS.find((b) => b.id === filters.ctc);
      if (band && !band.test(j.ctc)) return false;
    }
    if (filters.exp !== "All") {
      const band = EXP_BANDS.find((b) => b.id === filters.exp);
      if (band && !band.test(j.experience)) return false;
    }
    if (filters.skills.length && !filters.skills.every((s) => j.skills.includes(s))) return false;
    return true;
  });
}

// Returns a sorted COPY (we never change the original array)
export function sortJobs(jobs, sortKey) {
  const copy = [...jobs];
  if (sortKey === "ctc-high") copy.sort((a, b) => b.ctc - a.ctc);
  else if (sortKey === "ctc-low") copy.sort((a, b) => a.ctc - b.ctc);
  else if (sortKey === "title") copy.sort((a, b) => a.title.localeCompare(b.title));
  return copy; // "default" keeps the original order
}

// Cuts one page out of a list. Also keeps the page number inside the valid range.
export function paginate(items, page, perPage) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return { pageItems: items.slice(start, start + perPage), totalPages, currentPage };
}
