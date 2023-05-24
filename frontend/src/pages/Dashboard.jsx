import { LogoutIcon, MenuAlt3Icon } from "@heroicons/react/outline";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Icon } from "@tremor/react";
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function Dashboard({ navList }) {
  const location = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen flex-col gap-5">
      {/* <div className="h-2 w-[100px] animate-pulse rounded-md bg-gray-200" /> */}
      <header className="flex items-center justify-between gap-12 border-b-2 px-5  py-2">
        <div className="flex items-center gap-2">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild className="lg:hidden">
              <Icon
                icon={MenuAlt3Icon}
                variant="simple"
                className="cursor-pointer text-black"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade ml-5 min-w-[190px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
                sideOffset={5}
              >
                {navList.map((item, idx) => (
                  <DropdownMenu.Item
                    key={idx}
                    className={`group relative my-0.5 flex cursor-pointer select-none items-center gap-2 rounded-md border border-white text-sm leading-none text-slate-800 hover:border-slate-400 ${
                      location === item.path || (item.path === "" && !location)
                        ? "bg-gray-200"
                        : ""
                    } px-2 py-1.5`}
                    onClick={() => {
                      navigate(item.path);
                    }}
                  >
                    {React.createElement(item.icon, {
                      className: "ml-1 max-w-[20px]",
                    })}
                    <span>{item.name}</span>
                    {idx !== navList.length - 1 ? (
                      <DropdownMenu.Separator className="m-[5px] h-[1px] bg-violet6" />
                    ) : null}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          <h1 className="text-xl lg:py-0.5">Dashboard</h1>
        </div>
        <Icon
          icon={LogoutIcon}
          className="cursor-pointer text-slate-700"
          onClick={() => {
            navigate("/");
          }}
        />
      </header>
      <div className="grid flex-1 px-5 lg:grid-cols-[200px_1fr]">
        <aside className="hidden w-[150px] flex-col lg:flex">
          <div className="flex w-full flex-col gap-2">
            {navList.map((item, idx) => (
              <Link
                key={idx}
                className={`flex cursor-pointer gap-2 rounded-md border-white text-sm hover:border ${
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
