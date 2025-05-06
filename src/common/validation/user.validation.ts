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

export const signUpSchema = z
  .object({
    nim: z
      .string()
      .min(1, "NIM wajib diisi")
      .length(15, "NIM harus terdiri dari 15 karakter"),
    sks: z.coerce
      .number({
        required_error: "SKS wajib diisi",
        invalid_type_error: "SKS harus berupa angka",
      })
      .min(96, "SKS tidak boleh kurang dari 96"),
    year: z.coerce
      .number({
        required_error: "Tahun wajib diisi",
        invalid_type_error: "Tahun harus berupa angka",
      })
      .min(2000, "Tahun tidak valid"),
  })
  .merge(userSchema);

export type SignUp = z.infer<typeof signUpSchema>;
