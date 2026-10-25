import { useEffect, useState } from "react";

// Returns `value`, but only after it has stopped changing for `delay` ms.
// Used so we filter after the user pauses typing, not on every keystroke.
export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // typing again cancels the old timer
  }, [value, delay]);

  return debounced;
}
