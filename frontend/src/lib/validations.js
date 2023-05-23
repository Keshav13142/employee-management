import { z } from "zod";

export const newEmployeeSchema = z.object({
  emailId: z.string().email({ message: "Invalid email" }),
  firstName: z
    .string({ required_error: "Invalid first name" })
    .min(1, { message: "Invalid first name" }),
  lastName: z
    .string({ required_error: "Invalid last name" })
    .min(1, { message: "Invalid last name" }),
  age: z
    .number({
      required_error: "Invalid age",
      invalid_type_error: "Invalid age",
    })
    .min(1, { message: "Invalid age" })
    .max(120),
  address: z
    .string({ required_error: "Invalid address" })
    .min(1, { message: "Invalid address" }),
  mobileNumber: z
    .number({
      required_error: "Invalid number",
      invalid_type_error: "Invalid number",
    })
    .min(1, { message: "Invalid number" }),
  joinDate: z
    .string({
      required_error: "Select a date",
      invalid_type_error: "Select a date",
    })
    .min(1, { message: "Select a date" }),
  jobDepartment: z.object({
    id: z
      .number({
        required_error: "Select a department",
        invalid_type_error: "Select a department",
      })
      .min(1),
  }),
  roles: z.object({
    id: z
      .number({
        required_error: "Select a role",
        invalid_type_error: "Select a role",
      })
      .min(1),
  }),
  password: z.string().min(6, { message: "Min 6 characters" }),
});

export const loginSchema = z.object({
  emailId: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Enter a password" }),
});

export const parseZodErrors = (zodError) => {
  const errors = {};

  zodError.error.issues.forEach((e) => {
    errors[e.path[0]] = e.message;
  });

  return errors;
};
