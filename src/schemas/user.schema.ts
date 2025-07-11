import { z } from "zod";

// Schema for validating login payload
export const userCreateSchema = z.object({
  firstName: z
    .string()
    .trim() // Remove leading/trailing whitespace
    .min(1, "First name is required"), // Ensure first name is not empty

  lastName: z
    .string()
    .trim() // Remove leading/trailing whitespace
    .min(1, "Last name is required"), // Ensure last name is not empty,

  email: z
    .string()
    .trim() // Remove leading/trailing whitespace
    .min(1, "Email is required") // Ensure email is not empty
    .email("Invalid email format"), // Validate proper email format

  password: z
    .string()
    .trim()
    .min(4, "Password must be at least 4 characters long") // Minimum length
    .max(100, "Password is too long"), // Optional: limit max length for security
});

export const userUpdateSchema = z.object({
  firstName: z
    .string()
    .trim() // Remove leading/trailing whitespace
    .min(1, "First name is required"), // Ensure first name is not empty

  lastName: z
    .string()
    .trim() // Remove leading/trailing whitespace
    .min(1, "Last name is required"), // Ensure last name is not empty,

  email: z
    .string()
    .trim() // Remove leading/trailing whitespace
    .min(1, "Email is required") // Ensure email is not empty
    .email("Invalid email format"), // Validate proper email format
});
