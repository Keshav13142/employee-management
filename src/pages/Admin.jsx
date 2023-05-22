import AddEmp from "../components/AddEmp";
import EmpTable from "../components/Table";

function Admin() {
  return (
    <main className="min-h-screen p-5 flex flex-col gap-5">
      <AddEmp />
      <EmpTable />
    </main>
  );
}

export default Admin;
