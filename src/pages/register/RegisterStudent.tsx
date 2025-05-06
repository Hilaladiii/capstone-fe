import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import FormAuthLayout from "../../components/layout/FormAuthLayout";
import { signUpSchema, SignUp } from "../../common/validation/user.validation";
import { StudentService } from "../../services/user/student/student.service";
import toast from "react-hot-toast";

const RegisterStudent = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUp) => {
    const response = await StudentService.signUp(data);
    if (response.status == 201) {
      navigate("/auth/login");
    } else {
      toast(response.data.message);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <section className="w-full flex flex-col items-center justify-center pt-8 pb-20 overflow-auto">
        <FormAuthLayout
          title="Sign Up"
          description="Isi form dibawah untuk membuat akun baru"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 ml-2"
          >
            <Input
              register={register}
              name="email"
              label="Email UB"
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
              name="password"
              label="Password"
              placeholder="Masukkan password anda"
              type="password"
              errors={errors.password}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <Input
              register={register}
              name="nim"
              label="NIM"
              placeholder="Masukkan NIM anda"
              errors={errors.nim}
            />
            {errors.nim && (
              <p className="text-red-500 text-sm">{errors.nim.message}</p>
            )}
            <Input
              register={register}
              name="sks"
              label="SKS"
              placeholder="Masukkan SKS anda"
              errors={errors.sks}
            />
            {errors.sks && (
              <p className="text-red-500 text-sm">{errors.sks.message}</p>
            )}
            <Input
              register={register}
              name="year"
              label="Tahun"
              placeholder="Masukkan tahun masuk anda"
              type="number"
              errors={errors.year}
            />
            {errors.year && (
              <p className="text-red-500 text-sm">{errors.year.message}</p>
            )}
            <Button variant="secondary" className="w-100 mt-4">
              Register
            </Button>
          </form>
          <div className="w-full mt-4 text-center text-base font-semibold">
            <span>Sudah punya akun? </span>
            <Link
              to="/login"
              className="text-secondary font-semibold hover:underline"
            >
              Login sekarang
            </Link>
          </div>
        </FormAuthLayout>
      </section>
    </div>
  );
};

export default RegisterStudent;
