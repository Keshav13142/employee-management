import { TailwindIndicator } from "@/components/tailwindcss-indcator";
import Department from "@/pages/Admin/Department";
import Roles from "@/pages/Admin/Roles";
import Dashboard from "@/pages/Dashboard";
import Employee from "@/pages/Employee";
import Login from "@/pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import EmpTable from "./components/EmpTable";
import "./index.css";
import { adminSideNav, empSideNav } from "./lib/nav-list";

const queryClient = new QueryClient();

const Root = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" reverseOrder={false} />
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
        <TailwindIndicator />
      </QueryClientProvider>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "admin",
        element: <Dashboard navlist={adminSideNav} />,
        children: [
          {
            path: "",
            element: <EmpTable />,
          },
          {
            path: "departments",
            element: <Department />,
          },
          {
            path: "roles",
            element: <Roles />,
          },
        ],
      },
      {
        path: "employee",
        element: <Dashboard navlist={empSideNav} />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
