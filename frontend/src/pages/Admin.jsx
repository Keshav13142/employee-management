import DeptAndRoles from "@/components/DeptAndRoles";
import { deleteEmp, editEmp, getAllEmployees } from "@/lib/api";
import { newEmployeeSchema, parseZodErrors } from "@/lib/validations";
import {
  AcademicCapIcon,
  ArchiveBoxIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
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
  TextInput,
} from "@tremor/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AddEmp from "../components/AddEmp";

const defaultErrors = {
  firstName: null,
  lastName: null,
  age: null,
  mobileNumber: null,
  address: null,
  emailId: null,
  joinDate: null,
};

const inputFieldData = [
  {
    placeholder: "you@example.com",
    label: "Email",
    icon: EnvelopeIcon,
    name: "emailId",
    type: "email",
  },
  {
    placeholder: "super secret",
    label: "Password",
    icon: LockClosedIcon,
    name: "password",
    type: "password",
  },
  {
    placeholder: "John",
    label: "First Name",
    name: "firstName",
  },
  {
    placeholder: "Doe",
    label: "Last Name",
    name: "lastName",
  },
  {
    placeholder: "69",
    label: "Age",
    type: "number",
    name: "age",
  },
  {
    placeholder: "6942069420",
    label: "Mobile Number",
    name: "mobileNumber",
    type: "number",
  },
  {
    placeholder: "Type....",
    label: "Address",
    name: "address",
  },
  {
    name: "joinDate",
    type: "date",
    label: "Date of Joining",
  },
];

const EditEmp = ({ emp, open, setOpen }) => {
  const [inputs, setInputs] = useState(null);

  const [errors, setErrors] = useState(defaultErrors);

  const queryClient = useQueryClient();

  const mutation = useMutation(editEmp, {
    onError: () => {
      toast.error("Failed to update Employee!");
    },
    onSuccess: () => {
      toast.success("Successfully updated Employee!");
      queryClient.invalidateQueries({ queryKey: ["allEmployees"] });
      setOpen(false);
    },
  });

  const onChange = ({ target: { name, value, type } }) => {
    setInputs((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const onEditSubmit = (e) => {
    e.preventDefault();

    // Check the form inputs for error
    const parsedInputs = newEmployeeSchema
      .omit({ jobDepartment: true, roles: true, password: true })
      .safeParse(inputs);

    // Map through the errors and get then in the right format
    if (!parsedInputs.success) {
      setErrors((p) => ({ ...p, ...parseZodErrors(parsedInputs) }));
      return;
    }

    mutation.mutate(inputs);
  };

  useEffect(() => {
    if (emp) {
      setInputs(emp);
    }
  }, [emp]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        setOpen((prev) => !prev);
        // Reset error state
        setErrors(defaultErrors);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[95vh] w-[90vw] max-w-2xl translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 mb-7 mt-[10px] text-xl font-medium text-mauve12">
            <span>Edit employee info</span>
          </Dialog.Title>
          <form
            className="flex flex-wrap justify-evenly gap-5"
            onSubmit={onEditSubmit}
          >
            {inputFieldData.map((item, idx) => (
              <div key={idx} className="flex w-[45%] flex-col">
                <span className="text-sm text-slate-600">{item.label}</span>
                <TextInput
                  name={item.name}
                  type={item.type ?? "text"}
                  onChange={onChange}
                  placeholder={item.placeholder ?? ""}
                  icon={item.icon}
                  value={inputs ? inputs[item.name] : ""}
                  className="placeholder mt-1"
                />
                <span className="mt-1 text-sm text-red-400">
                  {errors[item.name]}
                </span>
              </div>
            ))}
            <Button
              variant="secondary"
              color="gray"
              icon={PlusIcon}
              loading={mutation.isLoading}
              type="submit"
              className="self-end"
            >
              Edit
            </Button>
          </form>
          <Dialog.Close asChild>
            <button
              className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full hover:text-blue-400 focus:shadow-[0_0_0_2px] focus:shadow-blue-400 focus:outline-none"
              aria-label="Close"
            >
              <XMarkIcon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const AdminDashboard = () => {
  const { data, isLoading, refetch } = useQuery(
    ["allEmployees"],
    getAllEmployees
  );

  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [selectedEmployee, setSeletedEmployee] = useState(null);

  const deleteEmpMutation = useMutation(deleteEmp, {
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

  if (isLoading) return null;

  return (
    <>
      <EditEmp emp={selectedEmployee} open={editOpen} setOpen={setEditOpen} />
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
                loading={deleteEmpMutation.isLoading}
                onClick={() => {
                  deleteEmpMutation.mutate(selectedEmployee.id);
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
        <span className="text-lg lg:text-2xl">Employee list</span>
        <AddEmp />
      </div>
      {data?.length === 0 ? (
        <div className="m-5 mx-auto rounded-xl border-2 border-slate-300 p-5 shadow-sm">
          <span>There are no employee to show</span>
        </div>
      ) : (
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
                  <Badge color="cyan" icon={ArchiveBoxIcon}>
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
                    icon={PencilIcon}
                    className="mr-2 cursor-pointer rounded-full transition-all duration-200 hover:scale-110 hover:bg-red-100 hover:shadow-lg"
                    onClick={() => {
                      setSeletedEmployee(item);
                      setEditOpen(true);
                    }}
                  />
                  <Icon
                    icon={TrashIcon}
                    color="red"
                    className="cursor-pointer rounded-full transition-all duration-200 hover:scale-110 hover:bg-red-100 hover:shadow-lg"
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
      )}
      <DeptAndRoles />
    </>
  );
};

export default AdminDashboard;
