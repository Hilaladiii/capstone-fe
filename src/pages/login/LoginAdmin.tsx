import { useForm } from "react-hook-form";
import { SignIn, signInSchema } from "../../common/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import FormAuthLayout from "../../components/layout/FormAuthLayout";
import { useSignInAdmin } from "../../common/hooks/useSignInAdmin";
import { useState } from "react";

const LoginAdmin = () => {
  const [selectedRole, setSelectedRole] = useState<"academic" | "lecturer">("academic");
  const [rememberMe, setRememberMe] = useState(false);
  const { mutate: signInAdmin, isPending } = useSignInAdmin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignIn) => {
    signInAdmin({ ...data, selectedRole, rememberMe });
  };

  return (
    <section className="w-full flex flex-col items-center justify-center pt-8 pb-20 overflow-hidden">
        <div className="mb-10 w-114">
            <div className="flex bg-primary h-11 rounded-2xl">
            <button
                type="button"
                onClick={() => setSelectedRole("academic")}
                className={`flex-1 py-2 px-4 rounded-2xl text-sm font-medium transition-colors ${selectedRole === "academic" ? "bg-secondary text-white shadow-sm border-2 border-black" : "text-white hover:text-secondary"}`}
            >
                Akademik
            </button>
            <button
                type="button"
                onClick={() => setSelectedRole("lecturer")}
                className={`flex-1 py-2 px-4 rounded-2xl text-sm font-medium transition-colors ${selectedRole === "lecturer" ? "bg-secondary text-white shadow-sm border-2 border-black" : "text-white hover:text-secondary"}`}
            >
                Dosen
            </button>
            </div>
        </div>
        <FormAuthLayout 
            title="Sign In" 
            description="Isi form dibawah untuk login ke akun anda">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 ml-2">
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

                <Button variant="secondary" className="w-100 mt-4 cursor-pointer">
                {isPending ? "Loading..." : "Sign In"}
                </Button>
            </form>
        </FormAuthLayout>
    </section>
  );
};

export default LoginAdmin;