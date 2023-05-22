import {
  AcademicCapIcon,
  ArchiveIcon,
  MailIcon,
} from "@heroicons/react/outline";
import { TextInput, Title } from "@tremor/react";

const AddEmp = () => {
  return (
    <div className="p-5">
      <Title className="text-2xl">Add a new Employee</Title>
      <form className="flex gap-10 mt-5 justify-evenly flex-wrap">
        <TextInput placeholder="First Name" className="max-w-sm" />
        <TextInput placeholder="Last Name" className="max-w-sm" />
        <TextInput placeholder="Email" icon={MailIcon} className="max-w-sm" />
        <TextInput placeholder="Age" type="number" className="max-w-sm" />
        <TextInput placeholder="Mobile Number" className="max-w-sm" />
        <TextInput
          placeholder="Department"
          icon={AcademicCapIcon}
          className="max-w-sm"
        />
        <TextInput placeholder="Role" icon={ArchiveIcon} className="max-w-sm" />
        <TextInput placeholder="Join Date" type="date" className="max-w-sm" />
      </form>
    </div>
  );
};

export default AddEmp;
