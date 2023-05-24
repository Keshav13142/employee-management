import NavDropDown from "@/components/NavDropDown";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function Dashboard({ navlist }) {
  const location = useLocation().pathname.split("/")[2];

  return (
    <main className="flex min-h-screen flex-col gap-5">
      {/* <div className="h-2 w-[100px] animate-pulse rounded-md bg-gray-200" /> */}
      <header className="flex items-center gap-12 border-b-2 px-5 py-2">
        <div className="flex items-center gap-2">
          <NavDropDown navList={navlist} />
          <h1 className="text-xl lg:py-0.5">Dashboard</h1>
        </div>
      </header>
      <div className="grid flex-1 gap-0 px-5 lg:grid-cols-[200px_1fr]">
        <aside className="hidden w-[150px] flex-col lg:flex">
          <div className="flex w-full flex-col gap-5">
            {navlist.map((item, idx) => (
              <Link
                key={idx}
                className={`flex cursor-pointer gap-2 rounded-md text-sm ${
                  location === item.path || (item.path === "" && !location)
                    ? "bg-gray-200"
                    : ""
                } px-2 py-1.5 text-slate-800`}
                to={item.path}
              >
                {React.createElement(item.icon, {
                  className: "ml-1 max-w-[20px]",
                })}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden rounded-md">
          <Outlet />
        </main>
      </div>
    </main>
  );
}

export default Dashboard;
