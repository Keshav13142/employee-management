import React from "react";
import AddEmp from "../components/AddEmp";

const AdminNav = () => {
  return (
    <div className="flex items-center justify-between px-5">
      <h1 className="text-3xl">Admin Dashboard</h1>
      <div>
        <AddEmp />
      </div>
    </div>
  );
};

export default AdminNav;
