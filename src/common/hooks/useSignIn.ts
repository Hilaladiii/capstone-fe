import { useMutation } from "@tanstack/react-query";
import { SignIn } from "../validation/auth.validation";
import { AuthService } from "../../services/auth/auth.service";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { axiosErrorHandling } from "../../services/setup.service";

export function useSignIn() {
  const [_, setCookie] = useCookies(["token"]);
  return useMutation({
    mutationFn: (data: SignIn) => AuthService.signIn(data),
    onSuccess: (response) => {
      const token = response.data.data.token;
      setCookie("token", token);
      toast.success(response.data.message);
    },
    onError: (error) => {
      const message = axiosErrorHandling(error);
      toast.error(message);
    },
  });
}
