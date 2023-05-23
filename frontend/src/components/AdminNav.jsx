import { ShieldCheckIcon } from "@heroicons/react/outline";
import React from "react";

const AdminNav = () => {
  return (
    <header className="container flex items-center gap-12 self-center border-b-2 px-5 py-4">
      <div className="flex items-center gap-2">
        {/* <ShieldCheckIcon className="max-w-[20px]" /> */}
        <h1 className="text-xl">Admin Dashboard</h1>
      </div>
    </header>
  );
};

export default AdminNav;
