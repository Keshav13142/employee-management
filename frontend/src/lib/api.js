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

export const deleteEmp = async (id) => {
  const { data } = await client.delete(`/employees/${id}`);
  return data;
};

export const empLogin = async (empData) => {
  const { data } = await client.post("/employees/login", empData);
  return data;
};
