import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// BrowserRouter turns this one-page app into a multi-page SPA:
// the URL changes, but the browser never reloads the page.
// The `future` flags only switch on React Router 7 behaviour early,
// which also hides warnings in the browser console.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
