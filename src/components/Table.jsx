import { AcademicCapIcon, ArchiveIcon } from "@heroicons/react/outline";
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

const EmpTable = ({ data }) => (
  <Card>
    <Title className="text-2xl">Employee list</Title>
    <Table className="mt-5">
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
        {data?.map((item) => (
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
  </Card>
);

export default EmpTable;
