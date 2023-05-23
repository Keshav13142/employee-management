import AdminNav from "@/components/AdminNav";
import EmpTable from "@/components/Table";

function Admin() {
  return (
    <main className="flex min-h-screen flex-col gap-5 p-5">
      {/* <div className="h-2 w-[100px] animate-pulse rounded-md bg-slate-300" /> */}
      <AdminNav />
      <EmpTable />
    </main>
  );
}

export default Admin;
