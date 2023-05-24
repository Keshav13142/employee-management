import {
  Cog8ToothIcon,
  ArrowLeftOnRectangleIcon as LogoutIcon,
} from "@heroicons/react/24/outline";
import { Icon } from "@tremor/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const location = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen flex-col">
      {/* <div className="h-2 w-[100px] animate-pulse rounded-md bg-gray-200" /> */}
      <header className="flex items-center justify-between gap-12 border-b-2 px-5 py-2">
        <div className="flex items-center gap-1">
          <Icon
            icon={Cog8ToothIcon}
            size="lg"
            className="text-black transition-all duration-700 hover:rotate-180 hover:scale-110"
          />
          <h1 className="text-xl lg:py-0.5">Dashboard</h1>
        </div>
        <Icon
          icon={LogoutIcon}
          className="cursor-pointer rounded-full text-slate-700 transition-all duration-200 hover:scale-110 hover:bg-slate-200 hover:shadow-lg"
          onClick={() => {
            navigate("/");
          }}
        />
      </header>
      <div className="flex w-full flex-1 flex-col overflow-hidden rounded-md p-5">
        <Outlet />
      </div>
    </main>
  );
}

export default Dashboard;
