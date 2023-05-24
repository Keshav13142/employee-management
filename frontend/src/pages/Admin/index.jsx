import {
  deleteEmp,
  getAllDepts,
  getAllEmployees,
  getAllRoles,
} from "@/lib/api";
import {
  AcademicCapIcon,
  ArchiveIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Badge,
  Button,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import AddEmp from "../../components/AddEmp";

const AdminDashboard = () => {
  const { data, isLoading, refetch } = useQuery(
    ["allEmployees"],
    getAllEmployees
  );

  const [open, setOpen] = useState(false);

  const [selectedEmployee, setSeletedEmployee] = useState(null);

  const mutation = useMutation(deleteEmp, {
    onError: () => {
      toast.error("Failed to Delete Employee!");
    },
    onSuccess: () => {
      toast.success("Successfully Deleted Employee!");
      refetch();
      setOpen(false);
      setSeletedEmployee(null);
    },
  });

  const { data: deptList, isLoading: isDeptLoading } = useQuery(
    ["deptList"],
    getAllDepts
  );

  const { data: roleList, isLoading: isRolesLoading } = useQuery(
    ["rolesList"],
    getAllRoles
  );

  if (isLoading) return null;

  return (
    <>
      <Dialog.Root
        open={open}
        onOpenChange={() => {
          setOpen((prev) => !prev);
          setSeletedEmployee(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed left-[50%] top-[50%] flex max-h-[95vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] flex-col gap-5 overflow-y-auto rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
            <Dialog.Title className="m-0 text-xl font-medium text-mauve12">
              Are you absolutely sure?
            </Dialog.Title>
            <div className="text-mauve12">
              This action cannot be undone. This will permanently delete the
              user's account and remove their data.
              <p className="mt-2">
                You are about to delete{" "}
                <span className="font-medium">{selectedEmployee?.name}</span> 's
                account!!
              </p>
            </div>
            <div className="flex gap-3 self-end">
              <Button
                color="gray"
                variant="secondary"
                onClick={() => {
                  setOpen(false);
                  setSeletedEmployee(null);
                }}
              >
                Cancel
              </Button>
              <Button
                color="red"
                loading={mutation.isLoading}
                onClick={() => {
                  mutation.mutate(selectedEmployee.id);
                }}
                className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-red4 px-[15px] font-medium leading-none text-red11 outline-none hover:bg-red5 focus:shadow-[0_0_0_2px] focus:shadow-red7"
              >
                Yes, delete account
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <div className="flex items-center justify-between">
        <Title className="text-lg lg:text-2xl">Employee list</Title>
        <AddEmp />
      </div>
      <Table className="my-5 rounded-md border-2">
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
            <TableHeaderCell className="text-center">Actions</TableHeaderCell>
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
              <TableCell className="text-center">
                <Icon
                  icon={TrashIcon}
                  color="red"
                  className="cursor-pointer"
                  onClick={() => {
                    setSeletedEmployee({
                      name: item.firstName,
                      id: item.id,
                    });
                    setOpen(true);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="flex-1 rounded-md p-2">
          <Title className="text-lg lg:text-xl">Departments</Title>
        </div>
        <div className="border-x-2 border-slate-200" />
        <div className="flex-1 rounded-md p-2">
          <Title className="text-lg lg:text-xl">Roles</Title>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
