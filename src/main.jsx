import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Admin from "./pages/Admin";
import Employee from "./pages/Employee";
import Home from "./pages/Home";
import Root from "./pages/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "employee",
        element: <Employee />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
