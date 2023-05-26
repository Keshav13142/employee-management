import {
  Cog8ToothIcon,
  ArrowLeftOnRectangleIcon as LogoutIcon,
} from "@heroicons/react/24/outline";
import { Icon } from "@tremor/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./ContextProvider";

function Dashboard({ children }) {
  const { setUser } = useContext(AppContext);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between gap-12 border-b-2 px-5 py-2">
        <div className="flex items-center gap-1">
          <Icon
            icon={Cog8ToothIcon}
            size="lg"
            className="text-black transition-all duration-700 hover:rotate-180 hover:scale-110"
          />
          <h1 className="text-xl lg:py-0.5">Dashboard</h1>
        </div>
        <Link
          to="/"
          onClick={() => {
            setUser(null);
            localStorage.removeItem("user");
          }}
        >
          <Icon
            icon={LogoutIcon}
            className="cursor-pointer rounded-full text-slate-700 transition-all duration-200 hover:scale-110 hover:bg-slate-200 hover:shadow-lg"
          />
        </Link>
      </header>
      <main className="flex w-full flex-1 flex-col p-5">{children}</main>
    </div>
  );
}

export default Dashboard;
