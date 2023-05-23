import AdminNav from "@/components/AdminNav";
import {
  AcademicCapIcon,
  ArchiveIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { Link, Outlet, useLocation } from "react-router-dom";

function Admin() {
  const location = useLocation().pathname.split("/")[2];

  return (
    <main className="flex min-h-screen flex-col gap-5">
      {/* <div className="h-2 w-[100px] animate-pulse rounded-md bg-gray-200" /> */}
      <AdminNav />
      <div className="container grid flex-1 gap-12 self-center px-5 md:grid-cols-[200px_1fr]">
        <aside className="w-[200px] flex-col">
          <div className="flex w-full flex-col gap-5">
            <Link
              className={`flex cursor-pointer gap-2 rounded-md ${
                !location ? "bg-gray-200" : ""
              } px-2 py-1.5`}
              to=""
            >
              <UserIcon className="ml-1 max-w-[20px]" />
              <span>Employees</span>
            </Link>
            <Link
              className={`flex cursor-pointer gap-2 rounded-md ${
                location === "departments" ? "bg-gray-200" : ""
              } px-2 py-1.5`}
              to="departments"
            >
              <ArchiveIcon className="ml-1 max-w-[20px]" />
              <span>Departments</span>
            </Link>
            <Link
              className={`flex cursor-pointer gap-2 rounded-md ${
                location === "roles" ? "bg-gray-200" : ""
              } px-2 py-1.5`}
              to="roles"
            >
              <AcademicCapIcon className="ml-1 max-w-[20px]" />
              <span>Roles</span>
            </Link>
          </div>
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden rounded-md">
          <Outlet />
        </main>
      </div>
    </main>
  );
}

export default Admin;
