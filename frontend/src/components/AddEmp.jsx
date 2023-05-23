import { createEmp, getAllDepts, getAllRoles } from "@/lib/api";
import { LockClosedIcon, MailIcon, XIcon } from "@heroicons/react/outline";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, SelectBox, SelectBoxItem, TextInput } from "@tremor/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const DialogDemo = () => {
  const [open, setOpen] = React.useState(false);

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    age: null,
    mobileNumber: "",
    address: "",
    emailId: "",
    password: "",
    joinDate: null,
    jobDepartment: {
      id: null,
    },
    roles: {
      id: null,
    },
  });

  const queryClient = useQueryClient();

  const { data: deptList, isLoading: isDeptLoading } = useQuery(
    ["deptList"],
    getAllDepts
  );

  const { data: roleList, isLoading: isRolesLoading } = useQuery(
    ["rolesList"],
    getAllRoles
  );

  const mutation = useMutation(createEmp, {
    onError: () => {
      toast.error("Failed to create Employee!");
    },
    onSuccess: () => {
      toast.success("Successfully created Employee!");
      queryClient.invalidateQueries({ queryKey: ["allEmployees"] });
      setOpen(false);
    },
  });

  const onChange = ({ target: { name, value } }) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const onSelectChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: { id: value } }));
  };

  const inputFieldData = [
    {
      placeholder: "Email",
      icon: MailIcon,
      name: "emailId",
      type: "email",
      onChange,
    },
    {
      placeholder: "password",
      icon: LockClosedIcon,
      name: "password",
      type: "password",
      onChange,
    },
    {
      placeholder: "First Name",
      name: "firstName",
      onChange,
    },
    {
      placeholder: "Last Name",
      name: "lastName",
      onChange,
    },
    {
      placeholder: "Age",
      type: "number",
      name: "age",
      onChange,
    },
    {
      placeholder: "Mobile Number",
      name: "mobileNumber",
      type: "number",
      onChange,
    },
    {
      placeholder: "Address",
      className: "max-w-sm",
      name: "address",
      onChange,
    },
  ];

  const addEmp = (e) => {
    e.preventDefault();
    mutation.mutate(inputs);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none text-gray-800 shadow-[0_2px_10px] shadow-blackA7 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          Add Employee
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[95vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 mb-5 mt-[10px] text-[17px] font-medium text-mauve12">
            Add a new Employee
          </Dialog.Title>
          <form className="flex flex-col gap-5" onSubmit={addEmp}>
            {inputFieldData.map((input, idx) => (
              <TextInput
                key={idx}
                label={input.label}
                name={input.name}
                type={input.type}
                onChange={input.onChange}
                placeholder={input.placeholder ?? ""}
                icon={input.icon}
              />
            ))}
            <div className="w-full">
              <span className="text-sm text-slate-600">Date of Joining</span>
              <TextInput type="date" name="joinDate" onChange={onChange} />
            </div>
            {isDeptLoading || isRolesLoading ? (
              <ClipLoader size={45} color="blue" className="mt-2" />
            ) : (
              <>
                <div>
                  <span className="text-sm text-slate-600">Department</span>
                  <SelectBox
                    onValueChange={(value) =>
                      onSelectChange("jobDepartment", value)
                    }
                    defaultValue="1"
                  >
                    {deptList.map(({ id, deptName }) => (
                      <SelectBoxItem key={id} value={id} text={deptName} />
                    ))}
                  </SelectBox>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Role</span>
                  <SelectBox
                    onValueChange={(value) => onSelectChange("roles", value)}
                    defaultValue="1"
                  >
                    {roleList.map(({ id, role }) => (
                      <SelectBoxItem key={id} value={id} text={role} />
                    ))}
                  </SelectBox>
                </div>
              </>
            )}
            <div className="mt-[25px] self-end">
              <Button
                loading={mutation.isLoading}
                type="submit"
                onClick={addEmp}
                color="blue"
                variant="secondary"
              >
                Add
              </Button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full hover:text-blue-400 focus:shadow-[0_0_0_2px] focus:shadow-blue-400 focus:outline-none"
              aria-label="Close"
            >
              <XIcon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogDemo;
