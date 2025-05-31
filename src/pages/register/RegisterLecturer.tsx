import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import FormAuthLayout from "../../components/layout/FormAuthLayout";
import { signUpLecturerSchema, SignUpLecturer } from "../../common/validation/lecturer.validation";
import { useSignUpLecturer } from "../../common/hooks/useSignUpLecturer";

const RegisterLecturer = () => {
  const { mutate: signUp, isPending } = useSignUpLecturer();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpLecturer>({
    resolver: zodResolver(signUpLecturerSchema),
  });

  const onSubmit = (data: SignUpLecturer) => {
    signUp(data);
  };

  return (
    <div className="w-full overflow-auto">
      <section className="w-full flex flex-col items-center justify-center pt-8 pb-20 overflow-auto">
        <FormAuthLayout
          title="Sign Up Lecturer"
          description="Isi form dibawah untuk membuat akun dosen baru"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 ml-2"
          >
            <Input
              register={register}
              name="email"
              label="Email"
              placeholder="Masukkan email anda"
              errors={errors.email}
            />
            <Input
              register={register}
              name="username"
              label="Username"
              placeholder="Masukkan username anda"
              errors={errors.username}
            />
            <Input
              register={register}
              name="fullname"
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap anda"
              errors={errors.fullname}
            />
            <Input
              register={register}
              name="password"
              label="Password"
              placeholder="Masukkan password anda"
              type="password"
              errors={errors.password}
            />
            <Input
              register={register}
              name="nip"
              label="NIP"
              placeholder="Masukkan NIP anda"
              errors={errors.nip}
            />
            <Button variant="secondary" className="w-100 mt-4">
              {isPending ? "Loading..." : "Sign Up"}
            </Button>
          </form>
          <div className="w-full mt-4 text-center text-base font-semibold">
            <span>Sudah punya akun? </span>
            <Link
              to="/auth/sign-in"
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

export default RegisterLecturer;
