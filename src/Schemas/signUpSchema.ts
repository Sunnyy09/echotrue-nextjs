import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters")
  .max(20, "Username must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be in following pattern"
    ),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  //   verifyCode: z
  //     .string()
  //     .min(6, { message: "Verify code must be at least 6 characters" }),
});
