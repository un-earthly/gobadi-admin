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
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <div>login</div>,
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
        element: <div>User Management</div>
      },
      {
        path: "category-management",
        element: <div>User Management</div>
      },
      {
        path: "sales-marketing",
        element: <div>User Management</div>
      },
      {
        path: "app-settings",
        element: <div>User Management</div>
      },
      {
        path: "bug-report",
        element: <div>User Management</div>
      },
      {
        path: "appointment-management",
        element: <div>User Management</div>
      },
      {
        path: "payment-management",
        element: <div>User Management</div>
      },
      {
        path: "landing-page-settings",
        element: <div>User Management</div>
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
