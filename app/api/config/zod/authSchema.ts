import { z } from "zod";

export const signinScheme = z.object({
  email: z.string().email({ message: "format email tidak valid" }),
  password: z
    .string()
    .min(5)
    .max(150)
    .nonempty({ message: "password tidak boleh kosong" }),
});

export type ISignin = z.infer<typeof signinScheme>;

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "first name tidak boleh kurang dari 3" })
      .max(20, { message: "first name tidak boleh lebih dari 20" }),
    lastName: z
      .string()
      .min(3, { message: "last name tidak boleh kurang dari 3" })
      .max(20, { message: "last name tidak boleh lebih dari 20" }),
    email: z.string().email({ message: "format email tidak valid" }),
    phone: z
      .string()
      .regex(/^(?:\+[0-9]+|[0-9]+)$/, {
        message: "Format nomor telepon tidak valid",
      })
      .min(8)
      .max(16),
    city: z
      .string()
      .min(1, { message: "nama city tidak boleh kosong" })
      .max(20, { message: "nama city tidak boleh lebih dari 20" }),
    password: z
      .string()
      .min(5, { message: "password tidak boleh kurang dari 5" })
      .max(150, { message: "password tidak boleh lebih dari 150" }),
    confirmPassword: z
      .string()
      .min(5, { message: "password tidak boleh kurang dari 5" })
      .max(150, { message: "password tidak boleh lebih dari 150" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "password don't match",
  });

export type ISignup = z.infer<typeof signupSchema>;
