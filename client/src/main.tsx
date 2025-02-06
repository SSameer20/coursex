import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
// import { Switch } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
// import 'dotenv/config'

import { Routes as RoutePath } from "./layout/types.ts";

import App from "./App.tsx";
import Home from "./pages/User/Home.tsx";
import Authentication from "./pages/User/Authentication.tsx";
import AdminAuth from "./pages/Admin/AdminAuth.tsx";
import Dashboard from "./pages/User/Dashboard.tsx";
import MyCourses from "./pages/User/MyCourses.tsx";
import Profile from "./pages/User/Profile.tsx";
import Admin from "./pages/Admin/Admin.tsx";

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
            " dark text-foreground bg-background font-mono h-screen w-full overflow-hidden"
          }
        >
          <Routes>
            <Route path={RoutePath.HOME} element={<Home />} />
            <Route path={RoutePath.AUTH} element={<Authentication />} />
            <Route path={RoutePath.ADMIN_AUTH} element={<AdminAuth />} />
            <Route path={RoutePath.APP} element={<App />}>
              <Route path={RoutePath.DASHBOARD} element={<Dashboard />} />
              <Route path={RoutePath.COURSE} element={<MyCourses />} />
              <Route path={RoutePath.PROFILE} element={<Profile />} />
            </Route>
            <Route path={RoutePath.ADMIN} element={<Admin />}>
              <Route path={RoutePath.ADMIN_DASHBOARD} element={<Dashboard />} />
              <Route path={RoutePath.ADMIN_COURSE} element={<MyCourses />} />
              <Route path={RoutePath.ADMIN_PROFILE} element={<Profile />} />
            </Route>
          </Routes>
        </main>
      </NextUIProvider>
    </BrowserRouter>
  );
}
