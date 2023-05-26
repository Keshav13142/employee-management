import { AppContext } from "@/components/ContextProvider";
import { getAbsences, updateEmp } from "@/lib/api";
import { newEmployeeSchema, parseZodErrors } from "@/lib/validations";
import {
  CalendarDaysIcon,
  CalendarIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  PencilIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  DateRangePicker,
  Icon,
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
  firstName: null,
  lastName: null,
  age: null,
  mobileNumber: null,
  address: null,
};

const format = (date) => {
  return Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const Employee = () => {
  const { user, setUser } = useContext(AppContext);
  const [isFetchEnabled, setIsFetchEnabled] = useState(false);
  const [errors, setErrors] = useState(defaultErrors);
  const [inputs, setInputs] = useState(defaultInputs);
  const [selected, setSelected] = useState(null);
  const [addItem, setAddItem] = useState(null);

  const { data, isLoading } = useQuery(
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

  const mutation = useMutation(updateEmp, {
    onError: () => {
      toast.error("Failed to update!");
    },
    onSuccess: (data) => {
      setUser(data);
      toast.success("Successfully updated!");
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

    mutation.mutate(inputs);
  };

  return (
    <div className="flex justify-between gap-5">
      <div className="flex-1 rounded-md border border-slate-300 p-5">
        <div className="mb-5 flex items-center gap-3 text-2xl">
          <h1>Your Profile</h1>
          <UserIcon className="max-w-[20px]" />
        </div>
        <form className="flex flex-col gap-2" onSubmit={updateProfile}>
          {!user || isLoading
            ? [...new Array(9)].map((_, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="h-[1.36rem] w-20 animate-pulse rounded-md bg-gray-200" />
                  <div className="mt-1 h-10 animate-pulse rounded-md bg-gray-200" />
                </div>
              ))
            : inputFieldData.map((input, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-sm text-slate-600">{input.label}</span>
                  <TextInput
                    name={input.name}
                    type={input.type ?? "text"}
                    onChange={onChange}
                    value={inputs[input.name]}
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
            loading={mutation.isLoading}
          >
            Update
          </Button>
        </form>
      </div>
      <div className="rounded-lg border-2 border-slate-200" />
      <div className="flex-1 rounded-md border border-slate-300 p-5">
        <div className="flex items-center gap-3 text-2xl">
          <h1>Your Absences</h1>
          <CalendarDaysIcon className="max-w-[20px]" />
        </div>
        <List className="h-full flex-1">
          {data?.map((item) => (
            <ListItem
              key={item.id}
              className="flex min-h-fit items-start text-base text-slate-800"
            >
              {selected?.id === item.id ? (
                <div className="ml-1 flex w-full items-center justify-between">
                  <DateRangePicker
                    className="max-w-sm"
                    enableDropdown={false}
                    value={[item.fromDate, item.toDate]}
                    // onValueChange={() => {}}
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      icon={CheckCircleIcon}
                      loading={mutation.isLoading}
                      variant="secondary"
                      color="green"
                      type="submit"
                      onClick={() => {
                        // if (selected?.[field].trim() === "") {
                        //   setSelected(null);
                        //   return;
                        // }
                        // mutation.mutate(selected);
                      }}
                    >
                      Save
                    </Button>
                    <Icon
                      unselectable="off"
                      icon={XMarkIcon}
                      color="red"
                      className="cursor-pointer rounded-full bg-red-100 transition-all duration-200 hover:scale-110 hover:shadow-lg"
                      onClick={() => {
                        setSelected(null);
                      }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span>{format(item.fromDate)}</span>-
                    <span>{format(item.toDate)}</span>
                  </div>
                  <Icon
                    icon={PencilIcon}
                    color="gray"
                    className="cursor-pointer rounded-full transition-all duration-200 hover:scale-110 hover:bg-slate-200 hover:shadow-lg"
                    onClick={() => {
                      setSelected(item);
                    }}
                  />
                </>
              )}
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Employee;
