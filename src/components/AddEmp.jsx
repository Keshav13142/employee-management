import {
  LockClosedIcon,
  MailIcon,
  UserAddIcon,
} from "@heroicons/react/outline";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Divider,
  SelectBox,
  SelectBoxItem,
  TextInput,
  Title,
} from "@tremor/react";
import { useState } from "react";
import { getAllDepts, getAllRoles } from "../api";

const AddEmp = () => {
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

  const { data: deptList, isLoading: isDeptLoading } = useQuery(
    ["deptList"],
    getAllDepts
  );
  const { data: roleList, isLoading: isRolesLoading } = useQuery(
    ["rolesList"],
    getAllRoles
  );

  const onChange = ({ target: { name, value } }) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const addEmp = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-2">
      <div className="flex gap-5">
        <Title className="text-2xl">Add a new Employee</Title>
        <Button
          className="min-w-[10%]"
          icon={UserAddIcon}
          type="submit"
          size="xs"
        >
          Add
        </Button>
      </div>
      <form className="flex flex-col items-center" onSubmit={addEmp}>
        <div className="flex gap-5 mt-5 justify-evenly flex-wrap">
          <TextInput
            placeholder="Email"
            icon={MailIcon}
            className="max-w-sm"
            name="emailId"
            type="email"
          />
          <TextInput
            placeholder="password"
            icon={LockClosedIcon}
            className="max-w-sm"
            name="password"
            type="password"
          />
          <TextInput
            placeholder="First Name"
            className="max-w-sm"
            name="firstName"
          />
          <TextInput
            placeholder="Last Name"
            className="max-w-sm"
            name="lastName"
          />
          <TextInput
            placeholder="Age"
            type="number"
            className="max-w-sm"
            name="age"
          />
          <TextInput
            placeholder="Mobile Number"
            className="max-w-sm"
            name="mobileNumber"
            type="number"
          />
          <TextInput
            placeholder="Address"
            className="max-w-sm"
            name="address"
          />
          <TextInput placeholder="Join Date" type="date" className="max-w-sm" />
        </div>
        <Divider />
        {isDeptLoading || isRolesLoading ? (
          <></>
        ) : (
          <div className="flex w-full items-center justify-evenly">
            <div className="w-full max-w-sm">
              <span className="text-sm text-slate-600">Department</span>
              <SelectBox
                onValueChange={(value) =>
                  console.log("the new value is", value)
                }
                defaultValue="1"
              >
                {deptList.map(({ id, deptName }) => (
                  <SelectBoxItem key={id} value={id} text={deptName} />
                ))}
              </SelectBox>
            </div>
            <div className="w-full max-w-sm">
              <span className="text-sm text-slate-600">Role</span>
              <SelectBox
                onValueChange={(value) =>
                  console.log("the new value is", value)
                }
                defaultValue="1"
              >
                {roleList.map(({ id, role }) => (
                  <SelectBoxItem key={id} value={id} text={role} />
                ))}
              </SelectBox>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddEmp;
