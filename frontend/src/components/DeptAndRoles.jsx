import {
  createDept,
  createRole,
  editDept,
  editRole,
  getAllDepts,
  getAllRoles,
} from "@/lib/api";
import {
  CheckCircleIcon,
  PencilIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Icon, List, ListItem, TextInput } from "@tremor/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const EditableList = ({
  title,
  data,
  selected,
  setSelected,
  field,
  mutation,
  onAdd,
}) => (
  <div className="flex flex-1 flex-col gap-3 rounded-md p-2">
    <div className="flex items-center justify-between">
      <span className="text-lg lg:text-xl">{title}</span>
      <Button
        icon={PlusIcon}
        size="xs"
        variant="secondary"
        color="gray"
        onClick={onAdd}
      >
        Add
      </Button>
    </div>
    <div className="rounded-md border-2 p-3 shadow-sm">
      <List>
        {data?.length === 0 ? (
          <div className="m-5 mx-auto max-w-fit rounded-xl border-2 border-slate-300 p-5 shadow-sm">
            <span>Nothing to show</span>
          </div>
        ) : (
          data?.map((item) => (
            <ListItem key={item.id} className="text-base text-slate-800">
              {selected?.id === item.id ? (
                <form
                  className="ml-1 flex w-full items-center justify-between"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (selected?.[field].trim() === "") {
                      setSelected(null);
                      return;
                    }
                    mutation.mutate(selected);
                  }}
                >
                  <TextInput
                    autoFocus
                    value={selected?.[field]}
                    className="max-w-sm"
                    onChange={({ target: { value } }) => {
                      setSelected((prev) => ({
                        ...prev,
                        [field]: value,
                      }));
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      icon={CheckCircleIcon}
                      loading={mutation.isLoading}
                      variant="secondary"
                      color="green"
                      type="submit"
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
                </form>
              ) : (
                <>
                  <span>{item[field]}</span>
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
          ))
        )}
      </List>
    </div>
  </div>
);

const AddRole = ({ open, setOpen }) => {
  const [inputs, setInputs] = useState({
    role: "",
    salary: "",
  });

  const queryClient = useQueryClient();

  const createRoleMutation = useMutation(createRole, {
    onError: () => {
      toast.error(`Failed to create role!`);
    },
    onSuccess: () => {
      toast.success(`Created role successfully!`);

      queryClient.invalidateQueries({ queryKey: ["rolesList"] });
      queryClient.invalidateQueries({ queryKey: ["allEmployees"] });
    },
    onSettled: () => {
      setOpen(false);
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
            Add a new Role
          </Dialog.Title>
          <form
            className="mt-5 flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (inputs.role.trim() === "" || inputs.salary === "") return;
              createRoleMutation.mutate(inputs);
            }}
          >
            <TextInput
              value={inputs.name}
              placeholder="Name..."
              name="role"
              onChange={({ target: { value, name } }) => {
                setInputs((prev) => ({ ...prev, [name]: value }));
              }}
            />
            <TextInput
              value={inputs.salary}
              placeholder="Salary"
              type="number"
              name="salary"
              onChange={({ target: { value, name } }) => {
                setInputs((prev) => ({ ...prev, [name]: value }));
              }}
            />
            <Button
              variant="secondary"
              color="gray"
              className="self-end"
              loading={createRoleMutation.isLoading}
            >
              Add
            </Button>
          </form>
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
  );
};

const AddDept = () => {};

const DeptAndRoles = () => {
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [open, setOpen] = useState(false);
  const [deptName, setDeptName] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);

  const { data: deptList, isLoading: isDeptLoading } = useQuery(
    ["deptList"],
    getAllDepts
  );

  const { data: roleList, isLoading: isRolesLoading } = useQuery(
    ["rolesList"],
    getAllRoles
  );

  const queryClient = useQueryClient();

  const onSuccess = (message, updateKey) => {
    toast.success(`${message} successfully!`);

    queryClient.invalidateQueries({ queryKey: [updateKey] });
    queryClient.invalidateQueries({ queryKey: ["allEmployees"] });
  };

  const onError = (message) => {
    toast.error(`Failed to ${message}!`);
  };

  const editDeptMutation = useMutation(editDept, {
    onError: () => {
      onError("update");
    },
    onSuccess: () => {
      onSuccess("Updated", "deptList");
      setSelectedDept(null);
    },
  });

  const editRoleMutation = useMutation(editRole, {
    onError: () => {
      onError("update");
    },
    onSuccess: () => {
      onSuccess("Updated", "rolesList");
      setSelectedRole(null);
    },
  });

  const createDeptMutation = useMutation(createDept, {
    onError: () => {
      onError("create");
    },
    onSuccess: () => {
      onSuccess("Created", "deptList");
      setDeptName("");
    },
    onSettled: () => {
      setOpen(false);
    },
  });

  const onAddSumbit = (e) => {
    e.preventDefault();

    if (deptName.trim() === "") {
      return;
    }

    createDeptMutation.mutate(deptName);
  };

  return (
    <div className="mb-10 flex flex-1 flex-col gap-5 md:flex-row">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
            <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
              Add a new Department
            </Dialog.Title>
            <form className="mt-5 flex flex-col gap-5" onSubmit={onAddSumbit}>
              <TextInput
                value={deptName}
                placeholder="Type..."
                onChange={({ target: { value } }) => {
                  setDeptName(value);
                }}
              />
              <Button
                variant="secondary"
                color="gray"
                className="self-end"
                loading={createDeptMutation.isLoading}
              >
                Add
              </Button>
            </form>
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
      <EditableList
        title="Departments"
        data={deptList}
        onAdd={() => {
          setOpen(true);
          setAddItem((prev) => ({ ...prev, name: "Department" }));
        }}
        selected={selectedDept || []}
        setSelected={setSelectedDept}
        field="deptName"
        mutation={editDeptMutation}
      />
      {/* <EditableList
        title="Roles"
        data={roleList || []}
        onAdd={() => {
          setOpen(true);
          setAddItem((prev) => ({ ...prev, name: "Role" }));
        }}
        selected={selectedRole}
        setSelected={setSelectedRole}
        field="role"
        mutation={editRoleMutation}
      /> */}
      <div className="flex flex-1 flex-col gap-3 rounded-md p-2">
        <div className="flex items-center justify-between">
          <span className="text-lg lg:text-xl">Roles</span>
          <AddRole open={roleOpen} setOpen={setRoleOpen} />
          <Button
            icon={PlusIcon}
            size="xs"
            variant="secondary"
            color="gray"
            onClick={setRoleOpen}
          >
            Add
          </Button>
        </div>
        <div className="rounded-md border-2 p-3 shadow-sm">
          <List>
            {roleList?.length === 0 ? (
              <div className="m-5 mx-auto max-w-fit rounded-xl border-2 border-slate-300 p-5 shadow-sm">
                <span>Nothing to show</span>
              </div>
            ) : (
              roleList?.map((item) => (
                <ListItem key={item.id} className="text-base text-slate-800">
                  {selectedRole?.id === item.id ? (
                    <form
                      className="ml-1 flex w-full items-center justify-between"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (selectedRole?.role.trim() === "") {
                          setSelectedRole(null);
                          return;
                        }
                        editRoleMutation.mutate(selectedRole);
                      }}
                    >
                      <div className="flex flex-col gap-2">
                        <TextInput
                          placeholder="Name"
                          autoFocus
                          value={selectedRole?.role}
                          className="max-w-xs"
                          onChange={({ target: { value } }) => {
                            setSelectedRole((prev) => ({
                              ...prev,
                              role: value,
                            }));
                          }}
                        />
                        <TextInput
                          placeholder="Salary"
                          value={selectedRole?.salary}
                          className="max-w-xs"
                          type="number"
                          onChange={({ target: { value } }) => {
                            setSelectedRole((prev) => ({
                              ...prev,
                              salary: value,
                            }));
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          icon={CheckCircleIcon}
                          loading={editRoleMutation.isLoading}
                          variant="secondary"
                          color="green"
                          type="submit"
                        >
                          Save
                        </Button>
                        <Icon
                          unselectable="off"
                          icon={XMarkIcon}
                          color="red"
                          className="cursor-pointer rounded-full bg-red-100 transition-all duration-200 hover:scale-110 hover:shadow-lg"
                          onClick={() => {
                            setSelectedRole(null);
                          }}
                        />
                      </div>
                    </form>
                  ) : (
                    <>
                      <span>
                        {item.role} -{" "}
                        <span className="text-slate-500">₹{item.salary}</span>
                      </span>
                      <Icon
                        icon={PencilIcon}
                        color="gray"
                        className="cursor-pointer rounded-full transition-all duration-200 hover:scale-110 hover:bg-slate-200 hover:shadow-lg"
                        onClick={() => {
                          setSelectedRole(item);
                        }}
                      />
                    </>
                  )}
                </ListItem>
              ))
            )}
          </List>
        </div>
      </div>
    </div>
  );
};

export default DeptAndRoles;
