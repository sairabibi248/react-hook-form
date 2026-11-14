import { z } from "zod";

export const signupSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),

    email: z.email({ message: "Enter a valid email" }),

    password: z
      .string()
      .min(8, { message: "Password must have at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must have an uppercase letter" })
      .regex(/[a-z]/, { message: "Password must have a lowercase letter" })
      .regex(/[0-9]/, { message: "Password must have a number" })
      .regex(/[@$!%*?&#]/, { message: "Password must have a special character" }),

    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),

    cookies: z.enum(["accept", "reject"], {
      message: "Select any one option",
    }),

    terms: z.boolean().refine((value) => value === true, {
      message: "Accept Terms and Conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormFields = z.infer<typeof signupSchema>;
