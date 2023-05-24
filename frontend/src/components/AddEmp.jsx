import { createEmp } from "@/lib/api";
import { newEmployeeSchema, parseZodErrors } from "@/lib/validations";
import {
  EnvelopeIcon,
  LockClosedIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Dropdown, DropdownItem, TextInput } from "@tremor/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const defaultInputs = {
  firstName: "",
  lastName: "",
  age: null,
  mobileNumber: "",
  address: "",
  emailId: "",
  password: "",
  joinDate: "",
  jobDepartment: {
    id: null,
  },
  roles: {
    id: null,
  },
};

const defaultErrors = {
  firstName: null,
  lastName: null,
  age: null,
  mobileNumber: null,
  address: null,
  emailId: null,
  password: null,
  joinDate: null,
  jobDepartment: null,
  roles: null,
};

const SelectField = ({ label, error, onChange, data, value }) => (
  <div className="flex w-[45%] flex-col">
    <span className="mb-1 text-sm text-slate-600">{label}</span>
    <Dropdown onValueChange={onChange} placeholder="Select..">
      {data?.map((field) => (
        <DropdownItem
          key={field.id}
          value={field.id}
          text={field[`${value}`]}
        />
      ))}
    </Dropdown>
    <span className="mt-1 text-sm text-red-400">{error}</span>
  </div>
);

const AddEmployee = () => {
  const [open, setOpen] = React.useState(false);

  const [inputs, setInputs] = useState(defaultInputs);

  const [errors, setErrors] = useState(defaultErrors);

  const queryClient = useQueryClient();

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

  const onChange = ({ target: { name, value, type } }) => {
    setInputs((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const onSelectChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: { id: value } }));
    setErrors((prev) => ({ ...prev, [name]: null }));
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
      className: "max-w-sm",
      name: "address",
    },
    {
      placeholder: "hello",
      name: "joinDate",
      type: "date",
      label: "Date of Joining",
    },
  ];

  const addEmp = (e) => {
    e.preventDefault();
    // Check the form inputs for error
    const parsedInputs = newEmployeeSchema.safeParse(inputs);

    // Map through the errors and get then in the right format
    if (!parsedInputs.success) {
      setErrors((p) => ({ ...p, ...parseZodErrors(parsedInputs) }));
      return;
    }

    mutation.mutate(inputs);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        setOpen((prev) => !prev);
        // Reset input state
        setInputs(defaultInputs);
        setErrors(defaultErrors);
      }}
    >
      <Dialog.Trigger asChild>
        <Button variant="secondary" color="gray" icon={PlusIcon}>
          Add Employee
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[95vh] w-[90vw] max-w-2xl translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 mb-7 mt-[10px] text-xl font-medium text-mauve12">
            <span>Add a new Employee</span>
          </Dialog.Title>
          <form
            className="flex flex-wrap justify-evenly gap-5"
            onSubmit={addEmp}
          >
            {inputFieldData.map((input, idx) => (
              <div key={idx} className="flex w-[45%] flex-col">
                <span className="text-sm text-slate-600">{input.label}</span>
                <TextInput
                  name={input.name}
                  type={input.type ?? "text"}
                  onChange={onChange}
                  placeholder={input.placeholder ?? ""}
                  icon={input.icon}
                  className="placeholder mt-1"
                />
                <span className="mt-1 text-sm text-red-400">
                  {errors[input.name]}
                </span>
              </div>
            ))}
            <SelectField
              label="Department"
              onChange={(value) =>
                onSelectChange("jobDepartment", Number(value))
              }
              data={queryClient.getQueryData(["deptList"])}
              value="deptName"
              error={errors["jobDepartment"]}
            />
            <SelectField
              label="Role"
              onChange={(value) => onSelectChange("roles", Number(value))}
              data={queryClient.getQueryData(["rolesList"])}
              value="role"
              error={errors["roles"]}
            />
            <Button
              variant="secondary"
              color="gray"
              icon={PlusIcon}
              loading={mutation.isLoading}
              type="submit"
              onClick={addEmp}
              className="self-end"
            >
              Add Employee
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

export default AddEmployee;
