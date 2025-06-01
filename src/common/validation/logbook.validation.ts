import { z } from "zod";

export const logbookSchema = z.object({
  date: z.string().min(1, "Tanggal wajib diisi"),
  duration: z.coerce.number().min(1, "Durasi wajib diisi"),
  file: z
    .instanceof(File, { message: "File dokumen wajib diisi" })
    .refine((file) => file.size <= 3 * 1024 * 1024, "Maksimal ukuran file 3MB")
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/png",
          "image/jpeg",
        ].includes(file.type),
      "File harus bertipe pdf, docx, png, atau jpg/jpeg"
    ),
  description: z.string().min(1, "deskripsi wajib diisi"),
});

export type Logbook = z.infer<typeof logbookSchema>;