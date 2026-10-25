/* ---------------------------------------------------------
   REST API call - Arbeitnow public job board API.
   - Free, no API key needed.
   - Returns real (mostly Europe / remote) job listings.
   This file only talks to the API and reshapes the result.
   Loading / error state is handled in hooks/useLiveJobs.js
--------------------------------------------------------- */

const API_URL = "https://www.arbeitnow.com/api/job-board-api";

// The API gives job descriptions as HTML. We turn it into plain text
// so we never have to insert raw HTML into the page.
function htmlToText(html) {
  const doc = new DOMParser().parseFromString(html || "", "text/html");
  doc.querySelectorAll("script, style").forEach((el) => el.remove()); // drop code, keep readable text
  return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
}

// Convert one API job into the shape our UI uses.
function toLiveJob(item) {
  const text = htmlToText(item.description);
  const posted = item.created_at ? new Date(item.created_at * 1000) : null;
  return {
    id: `live-${item.slug}`,
    title: item.title || "Untitled role",
    company: item.company_name || "Unknown company",
    location: item.remote ? `${item.location || "Anywhere"} (Remote)` : item.location || "Not specified",
    type: Array.isArray(item.job_types) && item.job_types.length ? item.job_types[0] : "Job",
    tags: Array.isArray(item.tags) ? item.tags : [],
    summary: text.length > 180 ? text.slice(0, 180) + "…" : text,
    postedOn: posted && !isNaN(posted) ? posted.toLocaleDateString() : "",
    // only allow normal web links
    url: /^https?:\/\//.test(item.url || "") ? item.url : "",
  };
}

// Returns an array of live jobs, or throws an Error with a readable message.
export async function fetchLiveJobs(signal) {
  let response;
  try {
    response = await fetch(API_URL, { signal });
  } catch (error) {
    if (error.name === "AbortError") throw error; // we cancelled it ourselves
    throw new Error("Could not reach the live jobs API. Check your internet connection.");
  }

  if (!response.ok) {
    throw new Error(`The live jobs API returned an error (status ${response.status}).`);
  }

  let json;
  try {
    json = await response.json();
  } catch (error) {
    throw new Error("The live jobs API sent a response we could not read.");
  }

  if (!json || !Array.isArray(json.data)) {
    throw new Error("The live jobs API sent data in an unexpected format.");
  }
  return json.data.filter((item) => item && item.slug).map(toLiveJob);
}
