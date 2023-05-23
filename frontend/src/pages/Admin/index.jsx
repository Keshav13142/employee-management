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
    <main className="flex min-h-screen flex-col gap-10 p-5">
      {/* <div className="h-2 w-[100px] animate-pulse rounded-md bg-slate-300" /> */}
      <AdminNav />
      <div className="container mx-auto grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="w-[200px] flex-col">
          <div className="flex w-full flex-col gap-5">
            <Link
              className={`flex cursor-pointer items-center gap-2 rounded-md ${
                !location ? "bg-slate-200" : ""
              } p-2`}
              to=""
            >
              <UserIcon className="max-w-[20px]" />
              <span>Employees</span>
            </Link>
            <Link
              className={`flex cursor-pointer gap-2 rounded-md ${
                location === "departments" ? "bg-slate-200" : ""
              } p-2`}
              to="departments"
            >
              <ArchiveIcon className="max-w-[20px]" />
              <span>Departments</span>
            </Link>
            <Link
              className={`flex cursor-pointer gap-2 rounded-md ${
                location === "roles" ? "bg-slate-200" : ""
              } p-2`}
              to="roles"
            >
              <AcademicCapIcon className="max-w-[20px]" />
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
