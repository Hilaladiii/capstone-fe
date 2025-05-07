import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Email tidak valid").min(1, "Email wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export type SignIn = z.infer<typeof signInSchema>;
