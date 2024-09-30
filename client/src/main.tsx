import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
// import { Switch } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
// import 'dotenv/config'

import { Routes as RoutePath } from "./layout/types.ts";

import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Authentication from "./pages/Authentication.tsx";
import AdminAuth from "./pages/AdminAuth.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Course from "./pages/Course.tsx";
import Profile from "./pages/Profile.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);

function Main() {
  return (
    <BrowserRouter>
      <NextUIProvider>
        <main
          className={
            " dark text-foreground bg-background h-screen w-full overflow-hidden"
          }
        >
          <Routes>
            <Route path={RoutePath.HOME} element={<Home />} />
            <Route path={RoutePath.AUTH} element={<Authentication />} />
            <Route path={RoutePath.ADMIN_AUTH} element={<AdminAuth />} />
            <Route path={RoutePath.APP} element={<App />}>
              <Route path={RoutePath.DASHBOARD} element={<Dashboard />} />
              <Route path={RoutePath.COURSE} element={<Course />} />
              <Route path={RoutePath.PROFILE} element={<Profile />} />
            </Route>
          </Routes>
        </main>
      </NextUIProvider>
    </BrowserRouter>
  );
}
