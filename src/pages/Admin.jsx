import axios from "axios";
import { useEffect, useState } from "react";
import AddEmp from "../components/AddEmp";
import EmpTable from "../components/Table";

function Admin() {
  const [allEmp, setAllEmp] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:8080/employees");
      setAllEmp(response.data);
      console.log(response.data);
    })();
  }, []);

  return (
    <main className="min-h-screen">
      <AddEmp />
      <EmpTable data={allEmp} />
    </main>
  );
}

export default Admin;
