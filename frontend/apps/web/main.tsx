import React from "react";
import ReactDOM from "react-dom/client";
import TestApp from "./src/TestApp.tsx";
import "./src/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App showForms={true} /> */}
    <TestApp />
  </React.StrictMode>
);
