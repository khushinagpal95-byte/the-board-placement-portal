import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import Toast from "../components/Toast.jsx";

/* ---------------------------------------------------------
   Context API #1 - toast messages.
   Any page can call showToast("Saved") without passing props
   down through many components ("prop drilling").
--------------------------------------------------------- */
const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = useCallback((message) => {
    setToast(message);
    clearTimeout(timerRef.current); // a new toast replaces the old timer
    timerRef.current = setTimeout(() => setToast(null), 2400);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toast toast={toast} />
    </ToastContext.Provider>
  );
}

// usage:  const showToast = useToast();
export function useToast() {
  return useContext(ToastContext);
}
