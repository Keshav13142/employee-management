import { AppContext } from "@/components/ContextProvider";
import { addAbsence, getAbsences, updateEmp } from "@/lib/api";
import { newEmployeeSchema, parseZodErrors } from "@/lib/validations";
import {
  CalendarDaysIcon,
  CalendarIcon,
  EnvelopeIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  DateRangePicker,
  List,
  ListItem,
  TextInput,
} from "@tremor/react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const inputFieldData = [
  {
    placeholder: "you@example.com",
    label: "Email",
    icon: EnvelopeIcon,
    name: "emailId",
    type: "email",
    disabled: true,
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
    name: "joinDate",
    label: "Date of Joining",
    icon: CalendarIcon,
    disabled: true,
  },
  {
    label: "Leave count",
    type: "number",
    name: "totalLeaveCount",
    disabled: true,
  },
  {
    label: "Training slots",
    type: "number",
    name: "trainingSlot",
    disabled: true,
  },
];

const defaultErrors = {
  firstName: null,
  lastName: null,
  age: null,
  mobileNumber: null,
  address: null,
};

const defaultInputs = {
  firstName: "",
  lastName: "",
  age: "",
  mobileNumber: "",
  address: "",
};

const humanFormat = (date) => {
  return Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const format = (date) => {
  return Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

const Employee = () => {
  const { user, setUser } = useContext(AppContext);
  const [isFetchEnabled, setIsFetchEnabled] = useState(false);
  const [errors, setErrors] = useState(defaultErrors);
  const [inputs, setInputs] = useState(defaultInputs);
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState([]);

  const { data, refetch } = useQuery(
    ["allAbsences"],
    () => {
      return getAbsences(user.id);
    },
    { enabled: isFetchEnabled }
  );

  useEffect(() => {
    if (user && !isFetchEnabled) {
      setIsFetchEnabled(true);
      setInputs(user);
      setInputs((prev) => ({
        ...prev,
        mobileNumber: Number(prev.mobileNumber),
      }));
    }
  }, [user]);

  const onChange = ({ target: { name, value, type } }) => {
    setInputs((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const updateEmpMutation = useMutation(updateEmp, {
    onError: () => {
      toast.error("Failed to update!");
    },
    onSuccess: (data) => {
      setUser(data);
      toast.success("Successfully updated!");
    },
  });

  const absenceMutation = useMutation(addAbsence, {
    onError: () => {
      toast.error("Insufficient leave count!");
    },
    onSuccess: () => {
      toast.success("Successfully applied!");
      setOpen(false);
      refetch();
    },
  });

  const updateProfile = (e) => {
    e.preventDefault();
    // Check the form inputs for error
    const parsedInputs = newEmployeeSchema
      .omit({ password: true })
      .safeParse(inputs);

    // Map through the errors and get then in the right format
    if (!parsedInputs.success) {
      setErrors((p) => ({ ...p, ...parseZodErrors(parsedInputs) }));
      return;
    }

    updateEmpMutation.mutate(inputs);
  };

  const applyAbsence = (e) => {
    e.preventDefault();
    if (!dateRange[1]) {
      toast.error("Please select a date range");
      return;
    }
    absenceMutation.mutate({
      id: user.id,
      fromDate: format(dateRange[0]),
      toDate: format(dateRange[1]),
    });
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
            <Dialog.Title className="m-0 text-xl font-medium text-mauve12">
              Apply for leave
            </Dialog.Title>
            <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal text-mauve11">
              Select the date range. Click apply when you're done.
            </Dialog.Description>
            <div className="flex flex-col gap-5">
              <DateRangePicker
                enableDropdown={false}
                onValueChange={setDateRange}
              />
              <Button
                className="self-end"
                variant="secondary"
                loading={absenceMutation.isLoading}
                onClick={applyAbsence}
              >
                Apply
              </Button>
            </div>
            <Dialog.Close asChild>
              <button
                className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                aria-label="Close"
              >
                <XMarkIcon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <div className="container mx-auto flex flex-col justify-between gap-5 md:flex-row">
        <div className="flex-1 rounded-md border border-slate-300 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex flex-1 items-center gap-3 text-2xl">
              <h1>Your Profile</h1>
              <UserIcon className="max-w-[20px]" />
            </div>
            <div className="flex items-center gap-2">
              <Button size="xs" variant="secondary" color="gray">
                Update password
              </Button>
              <Button size="xs" variant="secondary" color="gray">
                Request certificate
              </Button>
            </div>
          </div>
          <form className="flex flex-col gap-2" onSubmit={updateProfile}>
            {!user
              ? [...new Array(9)].map((_, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="h-[1.36rem] w-20 animate-pulse rounded-md bg-gray-200" />
                    <div className="mt-1 h-10 animate-pulse rounded-md bg-gray-200" />
                  </div>
                ))
              : inputFieldData.map((input, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-sm text-slate-600">
                      {input.label}
                    </span>
                    <TextInput
                      name={input.name}
                      type={input.type ?? "text"}
                      onChange={onChange}
                      value={inputs[input.name] ?? ""}
                      placeholder={input.placeholder ?? ""}
                      icon={input.icon}
                      disabled={input.disabled}
                      className="placeholder mt-1"
                    />
                    <span className="mt-1 text-sm text-red-400">
                      {errors[input.name]}
                    </span>
                  </div>
                ))}
            <Button
              className="mt-2 self-end"
              type="submit"
              variant="secondary"
              loading={updateEmpMutation.isLoading}
            >
              Update
            </Button>
          </form>
        </div>
        <div className="rounded-lg border-2 border-slate-200" />
        <Accordion className="h-fit flex-1 border border-slate-300">
          <AccordionHeader className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-3 text-2xl">
              <h1>Your Absences</h1>
              <CalendarDaysIcon className="max-w-[20px]" />
            </div>
            <Button
              onClick={setOpen}
              variant="secondary"
              color="gray"
              size="xs"
            >
              Apply
            </Button>
          </AccordionHeader>
          <AccordionBody>
            <List className="flex flex-1 flex-col gap-3">
              {data?.length === 0 ? (
                <div className="m-5 mx-auto max-w-fit rounded-xl border-2 border-slate-300 p-5 shadow-sm">
                  <span>Nothing to show</span>
                </div>
              ) : (
                data?.map((item) => (
                  <ListItem
                    key={item.id}
                    className="flex min-h-fit items-start text-base text-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <span>{humanFormat(item.fromDate)}</span>-
                      <span>{humanFormat(item.toDate)}</span>
                    </div>
                  </ListItem>
                ))
              )}
            </List>
          </AccordionBody>
        </Accordion>
      </div>
    </>
  );
};

export default Employee;
