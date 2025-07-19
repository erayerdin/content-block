import React from "react";
import ReactDOM from "react-dom/client";

import GlobalProvider from "@/providers/index.tsx";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
