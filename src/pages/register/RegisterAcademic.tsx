import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { registerAcademic } from "../../services/register.service";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const registerAcademicSchema = z.object({
  email: z.string().email("Email tidak valid").min(1, "Email wajib diisi"),
  username: z
    .string()
    .min(1, "Username wajib diisi")
    .min(4, "Username harus lebih dari 3 karakter"),
  fullname: z.string().min(1, "Nama lengkap wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  nip: z
    .string()
    .min(1, "NIP wajib diisi")
    .length(16, "NIP harus terdiri dari 16 karakter"),
});

type TSignUp = z.infer<typeof registerAcademicSchema>;

const RegisterAcademic = () => {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUp>({
    resolver: zodResolver(registerAcademicSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: TSignUp) => {
    try {
      const result = await registerAcademic(data);
      setResponseMessage("Success: " + result.message);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResponseMessage("Error: " + error.message);
      } else {
        setResponseMessage("Unknown error occurred");
      }
    }
  };

  useEffect(() => {
    if (responseMessage) {
      const timer = setTimeout(() => {
        setResponseMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [responseMessage]);

  return (
    <div className="max-h-screen flex overflow-hidden">
      {responseMessage && (
        <div
          className={`${
            responseMessage.includes("Error")
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          } fixed text-center top-5 left-1/2 transform -translate-x-1/2 p-4 rounded-lg w-auto z-50`}
        >
          {responseMessage}
        </div>
      )}

      <section className="w-2/3 relative flex justify-center items-center">
        <div className="w-240 h-240 bottom-52 right-48 rounded-full bg-gradient-to-b from-[#131E30] to-[#17294C] border-6 border-secondary text-white flex flex-col justify-center items-center p-4 relative">
          <div className="z-10 absolute top-2/4 left-4/12">
            <h1 className="text-4xl font-bold mb-6">Welcome to PKLapps!</h1>
            <p className="text-sm leading-relaxed max-w-md">
              PKLapps adalah aplikasi yang memfasilitasi akadmik dalam proses
              ihgouguou whfiwufwifo jfeifefhefn eifheufjwnclfwofu efihwueghw3jg
              weoifhwug3hfjw ihefughquwfg uahwgfiygqwf woif hrwufg efhweiufgh
            </p>
          </div>
          <div className="absolute -bottom-30 left-36 w-64 h-64 bg-gradient-to-b from-[#17294C] to-[#131E30] bg-[top_60%] rounded-full border-t-4 border-l-2 border-r-2 border-b-0 border-secondary z-0" />
          <div className="absolute -bottom-8 left-130 w-44 h-44 bg-gradient-to-b from-[#0c1728] to-[#17294C] rounded-full border-t-0 border-l-2 border-r-2 border-b-5 border-secondary z-0" />
        </div>
      </section>

      <section className="w-1/2 bg-white flex-col items-center justify-center mb-10 pt-8 pb-20 overflow-auto">
        <div className="w-full h-3/4">
          <h2 className="text-3xl font-bold text-secondary mb-2">Sign Up</h2>
          <p className="font-semibold text-base mb-6">
            Isi form dibawah untuk membuat akun baru
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 ml-2">
            <Input
              register={register}
              name="email"
              label="Email"
              placeholder="Masukkan email anda"
              errors={errors.email}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <Input
              register={register}
              name="username"
              label="Username"
              placeholder="Masukkan username anda"
              errors={errors.username}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
            <Input
              register={register}
              name="fullname"
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap anda"
              errors={errors.fullname}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname.message}</p>
            )}
            <Input
              register={register}
              name="nip"
              label="NIP"
              placeholder="Masukkan NIP anda"
              errors={errors.nip}
            />
            {errors.nip && (
              <p className="text-red-500 text-sm">{errors.nip.message}</p>
            )}
            <Input
              register={register}
              name="password"
              label="Password"
              placeholder="Masukkan password anda"
              type="password"
              errors={errors.password}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <Button variant="secondary" className="w-100 mt-4">
              Register
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-base font-semibold">
              <span>Sudah punya akun? </span>
              <Link
                to="/login"
                className="pr-40 text-secondary font-semibold hover:underline"
              >
                Login sekarang
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterAcademic;
