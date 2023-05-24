import DashboardLayout from "@/components/DashboardLayout";
import { TailwindIndicator } from "@/components/tailwindcss-indcator";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Employee from "./pages/Employee";

const queryClient = new QueryClient();

const Root = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 1500 }}
        />
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
        path: "",
        element: <Login />,
      },
      {
        path: "admin",
        element: (
          <DashboardLayout>
            <Admin />
          </DashboardLayout>
        ),
      },
      {
        path: "employee",
        element: (
          <DashboardLayout>
            <Employee />
          </DashboardLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
