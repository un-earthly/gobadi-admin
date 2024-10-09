import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Login from "./login/Login.tsx";
import AdminUserManagement from "./dashboard/pages/user-management.tsx";
import CategoryManagement from "./dashboard/pages/category-management.tsx";
import LandingPageSettings from "./dashboard/pages/landing-page-settings.tsx";
import PaymentManagement from "./dashboard/pages/payment-management.tsx";
import AppointmentManagement from "./dashboard/pages/appointment-management.tsx";
import BugReporting from "./dashboard/pages/bug-report.tsx";
import AppSettings from "./dashboard/pages/app-settings.tsx";
import SalesMarketingManagement from "./dashboard/pages/sales-marketing.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "dashboard",
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "user-management",
        element: <AdminUserManagement />
      },
      {
        path: "category-management",
        element: <CategoryManagement />
      },
      {
        path: "sales-marketing",
        element: <SalesMarketingManagement />
      },
      {
        path: "app-settings",
        element: <AppSettings />
      },
      {
        path: "bug-report",
        element: <BugReporting />
      },
      {
        path: "appointment-management",
        element: <AppointmentManagement />
      },
      {
        path: "payment-management",
        element: <PaymentManagement />
      },
      {
        path: "landing-page-settings",
        element: <LandingPageSettings />
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
