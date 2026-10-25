/* ---------------------------------------------------------
   Safe localStorage helpers.
   localStorage can be unavailable (private mode), full, or hold
   broken text. Every call is wrapped in try/catch so the app
   never crashes because of it - we just fall back to defaults.
--------------------------------------------------------- */

export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    return fallback; // broken JSON or storage blocked
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // storage full or blocked - ignore, the app still works in memory
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    // ignore
  }
}
