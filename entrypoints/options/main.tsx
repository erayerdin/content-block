import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Navigate, Route, Routes } from "react-router";

import GlobalProvider from "@/providers/index.tsx";

import OptionsLayout from "./layout";
import AboutTab from "./tabs/about";
import FiltersTab from "./tabs/filters";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <HashRouter>
        <Routes>
          <Route element={<OptionsLayout />}>
            <Route element={<Navigate replace to="/about" />} path="/" />
            <Route element={<FiltersTab />} path="/filters" />
            <Route element={<AboutTab />} path="/about" />
          </Route>
        </Routes>
      </HashRouter>
    </GlobalProvider>
  </React.StrictMode>
);
