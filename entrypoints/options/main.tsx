import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Navigate, Route, Routes } from "react-router";

import GlobalProvider from "@/providers/index.tsx";

import OptionsLayout from "./layout";
import AboutPage from "./pages/about";
import FilterEditorPage from "./pages/filter-editor";
import FilterListPage from "./pages/filter-list";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <HashRouter>
        <Routes>
          <Route element={<OptionsLayout />}>
            <Route element={<Navigate replace to="/about" />} path="/" />
            <Route element={<FilterListPage />} path="/filters" />
            <Route element={<FilterEditorPage />} path="/filter/:id" />
            <Route element={<AboutPage />} path="/about" />
          </Route>
        </Routes>
      </HashRouter>
    </GlobalProvider>
  </React.StrictMode>
);
