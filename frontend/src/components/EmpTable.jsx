import { getAllEmployees } from "@/lib/api";
import { AcademicCapIcon, ArchiveIcon } from "@heroicons/react/outline";
import { useQuery } from "@tanstack/react-query";
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import AddEmp from "./AddEmp";

const EmpTable = () => {
  const { data, isLoading } = useQuery(["allEmployees"], getAllEmployees);

  if (isLoading) return null;

  return (
    <div className="max-h-fit">
      <div className="flex items-center justify-between">
        <Title className="text-2xl">Employee list</Title>
        <AddEmp />
      </div>
      <Table className="mt-5 rounded-md border-2">
        <TableHead>
          <TableRow>
            <TableHeaderCell>First Name</TableHeaderCell>
            <TableHeaderCell>Last Name</TableHeaderCell>
            <TableHeaderCell>Age</TableHeaderCell>
            <TableHeaderCell>Email Id</TableHeaderCell>
            <TableHeaderCell>Join Date</TableHeaderCell>
            <TableHeaderCell>Department</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Mobile Number</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.firstName}>
              <TableCell>{item.firstName}</TableCell>
              <TableCell>
                <Text>{item.lastName}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.age}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.emailId}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.joinDate}</Text>
              </TableCell>
              <TableCell>
                <Badge color="cyan" icon={ArchiveIcon}>
                  {item.jobDepartment.deptName}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge color="emerald" icon={AcademicCapIcon}>
                  {item.roles.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Text>{item.mobileNumber}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmpTable;
