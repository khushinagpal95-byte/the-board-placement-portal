import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Link2 } from "lucide-react";
import { SKILL_POOL, CTC_BANDS, EXP_BANDS } from "../../data/constants.js";
import { useJobStore } from "../../store/useJobStore.js";
import { useToast } from "../../context/ToastContext.jsx";
import useDebounce from "../../hooks/useDebounce.js";
import { filterJobs, sortJobs, paginate } from "../../utils/jobFilters.js";
import Pill from "../../components/Pill.jsx";
import Tabs from "../../components/Tabs.jsx";
import Pagination from "../../components/Pagination.jsx";
import JobRow from "../../components/JobRow.jsx";
import LiveJobsPanel from "../../components/LiveJobsPanel.jsx";
import DataBadge from "../../components/DataBadge.jsx";

const PAGE_SIZE = 5;
const TABS = [
  { id: "demo", label: "Demo jobs" },
  { id: "live", label: "Live jobs (API)" },
];
const SORT_OPTIONS = {
  demo: [["default", "Default order"], ["ctc-high", "CTC: high to low"], ["ctc-low", "CTC: low to high"], ["title", "Title: A to Z"]],
  live: [["default", "Newest first"], ["title", "Title: A to Z"]],
};
const labelStyle = { fontSize: 12.5, color: "var(--muted)", display: "block", marginBottom: 6 };

/* ---------------------------------------------------------
   Browse page. All filters live in the URL query string
   (useSearchParams), e.g. /student?q=react&ctc=5-10&page=2
   so a refresh or a shared link restores the same search.
--------------------------------------------------------- */
export default function BrowseJobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const showToast = useToast();

  const jobs = useJobStore((s) => s.jobs);
  const savedIds = useJobStore((s) => s.savedIds);
  const applications = useJobStore((s) => s.applications);
  const toggleSave = useJobStore((s) => s.toggleSave);

  // ----- read the current settings from the URL -----
  const source = searchParams.get("source") === "live" ? "live" : "demo";
  const filters = {
    q: searchParams.get("q") || "",
    location: searchParams.get("location") || "All",
    ctc: searchParams.get("ctc") || "All",
    exp: searchParams.get("exp") || "All",
    skills: (searchParams.get("skills") || "").split(",").filter(Boolean),
  };
  const requestedSort = searchParams.get("sort") || "default";
  const sortKey = SORT_OPTIONS[source].some(([key]) => key === requestedSort) ? requestedSort : "default";
  const page = parseInt(searchParams.get("page"), 10) || 1;

  // ----- change the URL (this is how filters are "set") -----
  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(changes)) {
      const isEmpty = value === "" || value === "All" || value === null ||
        (key === "sort" && value === "default") || (key === "page" && value === 1);
      if (isEmpty) next.delete(key);
      else next.set(key, String(value));
    }
    if (!("page" in changes)) next.delete("page"); // any filter change goes back to page 1
    setSearchParams(next, { replace: true });
  };

  // ----- debounced search: the box updates instantly, the URL updates after a pause -----
  const [searchText, setSearchText] = useState(filters.q); // local state: what is typed
  const debouncedText = useDebounce(searchText, 400);
  useEffect(() => {
    if (debouncedText !== filters.q) updateParams({ q: debouncedText });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText]);

  const toggleSkillFilter = (skill) => {
    const list = filters.skills.includes(skill) ? filters.skills.filter((s) => s !== skill) : [...filters.skills, skill];
    updateParams({ skills: list.join(",") });
  };

  // ----- demo jobs: filter -> sort -> paginate -----
  const locations = ["All", ...new Set(jobs.map((j) => j.location))];
  const filtered = filterJobs(jobs, filters);
  const sorted = sortJobs(filtered, sortKey);
  const { pageItems, totalPages, currentPage } = paginate(sorted, page, PAGE_SIZE);

  const shareableLink = `${window.location.origin}${location.pathname}${location.search}`;

  return (
    <div className="layout" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 26, padding: "26px 22px" }}>
      <aside className="sidebar" style={{ borderRight: "1px solid var(--line)", paddingRight: 20 }}>
        {source === "demo" ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, color: "var(--muted)", fontSize: 13, fontFamily: "var(--sans)" }}>
              <SlidersHorizontal size={14} /> Filters
            </div>
            <div style={{ marginBottom: 18 }}>
              <label htmlFor="filter-location" style={{ ...labelStyle, marginBottom: 5 }}>Location</label>
              <select id="filter-location" value={filters.location} onChange={(e) => updateParams({ location: e.target.value })}>
                {locations.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 18 }}>
              <span style={labelStyle}>CTC band</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                <Pill active={filters.ctc === "All"} onClick={() => updateParams({ ctc: "All" })}>All</Pill>
                {CTC_BANDS.map((b) => (
                  <Pill key={b.id} active={filters.ctc === b.id} onClick={() => updateParams({ ctc: b.id })}>{b.label}</Pill>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <span style={labelStyle}>Experience</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                <Pill active={filters.exp === "All"} onClick={() => updateParams({ exp: "All" })}>All</Pill>
                {EXP_BANDS.map((b) => (
                  <Pill key={b.id} active={filters.exp === b.id} onClick={() => updateParams({ exp: b.id })}>{b.label}</Pill>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <span style={labelStyle}>Skills</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {SKILL_POOL.map((s) => (
                  <Pill key={s} active={filters.skills.includes(s)} onClick={() => toggleSkillFilter(s)}>{s}</Pill>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.6, marginTop: 0 }}>
            Live jobs come from the free Arbeitnow API. They have no CTC or experience data, so only search and
            sort are available here. Apply on the company's own page.
          </p>
        )}

        <div style={{ marginTop: 22, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>
            <Link2 size={13} /> Shareable filter link
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <input readOnly aria-label="Shareable filter link" value={shareableLink} style={{ fontSize: 12 }} />
            <button className="btn-ghost" style={{ padding: "6px 10px" }}
              onClick={() => { navigator.clipboard?.writeText(shareableLink); showToast("Link copied"); }}>Copy</button>
          </div>
          <p style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 8, lineHeight: 1.5 }}>
            Filters live in the URL, so this exact search is restorable on reload or when shared — no server round trip needed.
          </p>
        </div>
      </aside>

      <main>
        <Tabs tabs={TABS} activeId={source} onChange={(id) => updateParams({ source: id === "live" ? "live" : "" })} />

        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: "1 1 220px" }}>
            <Search size={15} style={{ position: "absolute", left: 11, top: 11, color: "var(--muted)" }} />
            <input aria-label="Search role or company" placeholder="Search role or company" value={searchText}
              onChange={(e) => setSearchText(e.target.value)} style={{ paddingLeft: 32 }} />
          </div>
          <select aria-label="Sort jobs" value={sortKey} onChange={(e) => updateParams({ sort: e.target.value })} style={{ width: 180 }}>
            {SORT_OPTIONS[source].map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
        </div>

        {source === "live" ? (
          <LiveJobsPanel q={filters.q} sortKey={sortKey} page={page}
            onPageChange={(p) => updateParams({ page: p })}
            onUseDemo={() => updateParams({ source: "" })} />
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <DataBadge kind="demo" />
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{sorted.length} opening{sorted.length !== 1 ? "s" : ""}</span>
            </div>
            <div>
              {sorted.length === 0 && (
                <div style={{ padding: 30, textAlign: "center", color: "var(--muted)", border: "1px dashed var(--line)", borderRadius: 6 }}>
                  Nothing matches these filters. Try clearing a skill or widening the CTC band.
                </div>
              )}
              {pageItems.map((job) => (
                <JobRow key={job.id} job={job}
                  applied={applications[job.id]} saved={savedIds.includes(job.id)}
                  onToggleSave={() => toggleSave(job.id)}
                  onOpen={() => navigate(`/student/jobs/${job.id}`, { state: { backTo: location.pathname + location.search } })} />
              ))}
            </div>
            <Pagination page={currentPage} totalPages={totalPages} onPageChange={(p) => updateParams({ page: p })} />
          </>
        )}
      </main>
    </div>
  );
}
