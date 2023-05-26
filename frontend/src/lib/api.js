import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080",
});

export const getAllEmployees = async () => {
  const { data } = await client.get("/employees");
  return data;
};

export const getAllDepts = async () => {
  const { data } = await client.get("/department");
  return data;
};

export const getAllRoles = async () => {
  const { data } = await client.get("/role");
  return data;
};

export const createEmp = async (empData) => {
  const { data } = await client.post("/employees", empData);
  return data;
};

export const updateEmp = async ({ id, ...rest }) => {
  const { data } = await client.put(`/employees/${id}`, rest);
  return data;
};

export const deleteEmp = async (id) => {
  const { data } = await client.delete(`/employees/${id}`);
  return data;
};

export const empLogin = async (empData) => {
  const { data } = await client.post("/employees/login", empData);
  return data;
};

export const editDept = async ({ id, deptName }) => {
  const { data } = await client.put(`/department/${id}`, { deptName });
  return data;
};

export const editRole = async ({ id, role }) => {
  const { data } = await client.put(`/role/${id}`, { role });
  return data;
};

export const createDept = async (deptName) => {
  const { data } = await client.post(`/department/`, { deptName });
  return data;
};

export const createRole = async (role) => {
  const { data } = await client.post(`/role`, { role, salary: 100000 });
  return data;
};

export const getAbsences = async (id) => {
  const { data } = await client.get(`/absences?empId=${id}`);
  return data;
};
