import { useForm } from "react-hook-form";
import { SignIn, signInSchema } from "../../common/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "../../components/ui/input";
import FormAuthLayout from "../../components/layout/FormAuthLayout";
import { useSignIn } from "../../common/hooks/useSignIn";
import { useState } from "react";

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const { mutate: signIn, isPending } = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignIn) => {
    signIn({ ...data });
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
          <div className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-white bg-white border-2 border-black rounded accent-black cursor-pointer"
            />
            <label
              htmlFor="rememberMe"
              className="text-sm font-normal text-black"
            >
              Remember me
            </label>
          </div>
          <Button variant="secondary" className="w-100 mt-4">
            {isPending ? "Loading..." : "Sign In"}
          </Button>
        </form>
        <div className="w-full mt-4 text-center text-sm font-semibold">
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
