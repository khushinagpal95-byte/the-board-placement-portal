import { useEffect, useState } from "react";
import { fetchLiveJobs } from "../services/jobsApi.js";

// Loads live jobs and tracks the 3 async states: loading, error, data.
// Call retry() to try again after an error.
export default function useLiveJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0); // changing this re-runs the effect

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    fetchLiveJobs(controller.signal)
      .then((list) => {
        setJobs(list);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // page was left, ignore
        setError(err.message || "Something went wrong while loading jobs.");
        setLoading(false);
      });

    // cleanup: cancel the request if the user leaves the tab/page
    return () => controller.abort();
  }, [attempt]);

  const retry = () => setAttempt((n) => n + 1);

  return { jobs, loading, error, retry };
}
