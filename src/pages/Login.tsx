import { useForm } from "react-hook-form";
import { SignIn, signInSchema } from "../common/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import FormAuthLayout from "../components/layout/FormAuthLayout";
import { useSignIn } from "../common/hooks/useSignIn";

const Login = () => {
  const { mutate: signIn, isPending } = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignIn) => {
    signIn(data);
  };
  return (
    <section className="w-full flex flex-col items-center justify-center pt-8 pb-20 overflow-auto">
      <FormAuthLayout
        title="Sign In"
        description="Isi form dibawah untuk login ke akun anda"
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
            name="password"
            label="Password"
            placeholder="Masukkan password anda"
            type="password"
            errors={errors.password}
          />
          <Button variant="secondary" className="w-100 mt-4">
            {isPending ? "Loading..." : "Sign In"}
          </Button>
        </form>
        <div className="w-full mt-4 text-center text-base font-semibold">
          <span>Belum punya akun? </span>
          <Link
            to="/auth/sign-up"
            className="text-secondary font-semibold hover:underline"
          >
            Daftar sekarang
          </Link>
        </div>
      </FormAuthLayout>
    </section>
  );
};

export default Login;
