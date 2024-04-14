import { z } from "zod";

export const userZodSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, { message: "username is required" })
      .transform((val) => val.trim().replace(/\s+/g, "_")),
    email: z.string().email("This is not a valid email.").toLowerCase(),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    confirmPasswrod: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    profilePicUrl: z.string().optional(),
  })
  .refine((data) => data.confirmPasswrod === data.password, {
    message: "Passwords don't match",
    path: ["confirmPasswrod"],
  });
