import { z } from "zod";

export const signinScheme = z.object({
  email: z.string().email({ message: "format email tidak valid" }),
  password: z
    .string()
    .min(5)
    .max(150)
    .nonempty({ message: "password tidak boleh kosong" }),
});

export const signupSchema = z.object({
  firstName: z.string().min(5).max(20),
  lastName: z.string().min(5).max(20),
  email: z.string().email({ message: "format email tidak valid" }),
  phone: z
    .string()
    .regex(/^(?:\+[0-9]+|[0-9]+)$/, {
      message: "Format nomor telepon tidak valid",
    })
    .min(8)
    .max(16),
  city: z.string().min(1).max(20),
  password: z.string().min(5).max(150),
});
