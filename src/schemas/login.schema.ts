import { z } from 'zod';

// Schema for validating login payload
export const loginSchema = z.object({
  email: z
    .string()
    .trim() // Remove leading/trailing whitespace
    .min(1, "Email is required") // Ensure email is not empty
    .email("Invalid email format"), // Validate proper email format

  password: z
    .string()
    .min(4, "Password must be at least 4 characters long") // Minimum length
    .max(100, "Password is too long"), // Optional: limit max length for security
});
