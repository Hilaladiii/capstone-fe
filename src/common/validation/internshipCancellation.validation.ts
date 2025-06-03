import { z } from 'zod';

// Schema untuk anggota kelompok
const groupMemberSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama anggota wajib diisi')
    .min(2, 'Nama anggota minimal 2 karakter')
    .max(100, 'Nama anggota maksimal 100 karakter')
    .regex(/^[a-zA-Z\s]+$/, 'Nama hanya boleh mengandung huruf dan spasi'),
  
  nim: z
    .string()
    .min(1, 'NIM anggota wajib diisi')
    .regex(/^\d+$/, 'NIM hanya boleh mengandung angka')
    .min(8, 'NIM minimal 8 digit')
    .max(15, 'NIM maksimal 15 digit'),
  
  email: z
    .string()
    .min(1, 'Email anggota wajib diisi')
    .email('Format email tidak valid')
    .regex(/^[a-zA-Z0-9._%+-]+@(student\.)?ub\.ac\.id$/, 'Email harus menggunakan domain UB (@ub.ac.id atau @student.ub.ac.id)'),
  
  totalSks: z
    .string()
    .min(1, 'SKS lulus wajib diisi')
    .regex(/^\d+$/, 'SKS hanya boleh berupa angka')
    .refine(val => parseInt(val) >= 0, 'SKS tidak boleh negatif')
    .refine(val => parseInt(val) <= 200, 'SKS maksimal 200'),
  
  phoneNumber: z.string().optional(),
});

// Schema utama untuk form pembatalan PKL
export const internshipCancellationSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama wajib diisi')
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter')
    .regex(/^[a-zA-Z\s]+$/, 'Nama hanya boleh mengandung huruf dan spasi'),
  
  nim: z
    .string()
    .min(1, 'NIM wajib diisi')
    .regex(/^\d+$/, 'NIM hanya boleh mengandung angka')
    .min(8, 'NIM minimal 8 digit')
    .max(15, 'NIM maksimal 15 digit'),
  
  phoneNumber: z
    .string()
    .min(1, 'Nomor HP wajib diisi')
    .regex(/^(\+62|62|0)[0-9]{9,11}$/, 'Format nomor HP tidak valid (contoh: 081234567890)')
    .min(10, 'Nomor HP minimal 10 digit')
    .max(13, 'Nomor HP maksimal 13 digit'),
  
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid')
    .regex(/^[a-zA-Z0-9._%+-]+@(student\.)?ub\.ac\.id$/, 'Email harus menggunakan domain UB (@ub.ac.id atau @student.ub.ac.id)'),
  
  agencyName: z
    .string()
    .min(1, 'Nama instansi wajib diisi')
    .min(2, 'Nama instansi minimal 2 karakter')
    .max(200, 'Nama instansi maksimal 200 karakter'),
  
  agencyAddress: z
    .string()
    .min(1, 'Alamat instansi wajib diisi')
    .min(10, 'Alamat instansi minimal 10 karakter')
    .max(500, 'Alamat instansi maksimal 500 karakter'),
  
  cancellationReason: z
    .string()
    .min(1, 'Alasan pembatalan wajib diisi')
    .min(10, 'Alasan pembatalan minimal 10 karakter')
    .max(1000, 'Alasan pembatalan maksimal 1000 karakter'),
  
  supportingDocumentFile: z
    .union([
      z.instanceof(File),
      z.null(),
      z.undefined()
    ])
    .refine(
      (file) => file instanceof File,
      {
        message: 'Dokumen pendukung wajib diupload'
      }
    )
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024, // 5MB
      {
        message: 'Ukuran file maksimal 5MB'
      }
    )
    .refine(
      (file) => !file || ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
      {
        message: 'Format file harus PDF, JPG, JPEG, atau PNG'
      }
    ),
  
  groupMembers: z
    .array(groupMemberSchema)
    .optional()
    .refine(
      (members) => !members || members.length <= 2,
      'Maksimal 2 anggota kelompok'
    ),
  
  isGroup: z.boolean().optional(),
});

// Schema conditional untuk validasi berdasarkan jenis pengajuan
export const createConditionalSchema = (isGroup: boolean) => {
  const baseSchema = internshipCancellationSchema;
  
  if (isGroup) {
    return baseSchema.refine(
      (data) => data.groupMembers && data.groupMembers.length > 0,
      {
        message: 'Minimal 1 anggota kelompok harus ditambahkan',
        path: ['groupMembers']
      }
    ).refine(
      (data) => {
        if (!data.groupMembers) return true;
        
        // Validasi unique NIM
        const nims = data.groupMembers.map(member => member.nim);
        const uniqueNims = new Set(nims);
        
        // Cek apakah NIM ketua sama dengan anggota
        if (nims.includes(data.nim)) {
          return false;
        }
        
        return uniqueNims.size === nims.length;
      },
      {
        message: 'NIM tidak boleh sama antar anggota dan dengan ketua',
        path: ['groupMembers']
      }
    ).refine(
      (data) => {
        if (!data.groupMembers) return true;
        
        // Validasi unique email
        const emails = data.groupMembers.map(member => member.email);
        const uniqueEmails = new Set(emails);
        
        // Cek apakah email ketua sama dengan anggota
        if (emails.includes(data.email)) {
          return false;
        }
        
        return uniqueEmails.size === emails.length;
      },
      {
        message: 'Email tidak boleh sama antar anggota dan dengan ketua',
        path: ['groupMembers']
      }
    );
  }
  
  return baseSchema;
};

// Type inference dari schema
export type InternshipCancellationFormData = z.infer<typeof internshipCancellationSchema>;

// Utility function untuk validasi form
export const validateInternshipCancellation = (data: InternshipCancellationFormData, isGroup: boolean = false) => {
  const schema = createConditionalSchema(isGroup);
  return schema.safeParse(data);
};

// Custom validation messages
export const validationMessages = {
  required: 'Field ini wajib diisi',
  email: 'Format email tidak valid',
  phone: 'Format nomor HP tidak valid',
  nim: 'NIM hanya boleh mengandung angka',
  name: 'Nama hanya boleh mengandung huruf dan spasi',
  fileSize: 'Ukuran file maksimal 5MB',
  fileType: 'Format file tidak didukung',
  minLength: (min: number) => `Minimal ${min} karakter`,
  maxLength: (max: number) => `Maksimal ${max} karakter`,
  uniqueNim: 'NIM tidak boleh sama',
  uniqueEmail: 'Email tidak boleh sama',
  ubEmail: 'Email harus menggunakan domain UB',
};