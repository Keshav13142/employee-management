import {
  AcademicCapIcon,
  ArchiveIcon,
  UserIcon,
} from "@heroicons/react/outline";

export const adminSideNav = [
  {
    path: "", // for the root path
    name: "Employees",
    icon: UserIcon,
  },
  {
    path: "departments",
    name: "Departments",
    icon: ArchiveIcon,
  },
  {
    path: "roles",
    name: "Roles",
    icon: AcademicCapIcon,
  },
];

export const empSideNav = [
  {
    path: "", // for the root path
    name: "Profile",
    icon: ArchiveIcon,
  },
];
