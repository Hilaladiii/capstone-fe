import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useChangePassword } from "../../../common/hooks/useProfile";
import { ChangePasswordData } from "../../../common/types/user.type";

const passwordSchema = z
  .object({
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(8, "Konfirmasi password minimal 8 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

interface PasswordChangeSectionProps {
  email?: string | null;
}

const PasswordChangeSection: React.FC<PasswordChangeSectionProps> = ({ email }) => {
  const { mutate: changePassword, isPending: isUpdatingPassword } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = (data: z.infer<typeof passwordSchema>) => {
    const passwordData: ChangePasswordData = {
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    changePassword(passwordData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="flex flex-col items-center mt-10 w-full mx-auto bg-white text-black p-8 rounded-lg shadow-lg">
      <h2 className="text-base font-semibold mb-6 bg-black text-white rounded-lg w-7xl px-4 py-2 text-center">Ganti Password Baru</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-7xl">
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm">Email</label>
            <input type="text" value={email || ""} className="border-black border-3 text-black rounded-lg p-3 mt-1" readOnly />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Password Baru</label>
            <input {...register("password")} type="password" className="border-black border-3 text-black rounded-lg p-3 mt-1" placeholder="Minimal 8 karakter, kombinasi huruf dan angka" />
            {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>}
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Konfirmasi Password Baru</label>
            <input {...register("confirmPassword")} type="password" className="border-black border-3 text-black rounded-lg p-3 mt-1" placeholder="Konfirmasi password baru" />
            {errors.confirmPassword && <span className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</span>}
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" disabled={isUpdatingPassword} className="mt-6 bg-black text-white text-sm font-semibold py-2 px-6 rounded-full cursor-pointer">
            {isUpdatingPassword ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChangeSection;
