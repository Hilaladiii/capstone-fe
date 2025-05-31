import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("Email tidak valid").min(1, "Email wajib diisi"),
  fullname: z.string().min(1, "Nama lengkap wajib diisi"),
  username: z
    .string()
    .min(1, "Username wajib diisi")
    .min(4, "Username harus lebih dari 3 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const signUpLecturerSchema = z
  .object({
    nip: z
      .string()
      .min(1, "NIP wajib diisi")
      .length(16, "NIP harus terdiri dari 16 karakter"),
  })
  .merge(userSchema);

export type SignUpLecturer = z.infer<typeof signUpLecturerSchema>;
