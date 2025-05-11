import { useMutation } from "@tanstack/react-query";
import { SignIn } from "../validation/auth.validation";
import { AuthService } from "../../services/auth/auth.service";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { axiosErrorHandling } from "../../services/setup.service";
import { jwtDecode } from "jwt-decode";

export function useSignIn() {
  const [_, setCookie] = useCookies(["token", "userClaims"]);
  return useMutation({
    mutationFn: (data: SignIn) => AuthService.signIn(data),
    onSuccess: (response) => {
      const token = response.data.data.token;
      const decodedToken = jwtDecode(token);
      setCookie("token", token, {
        path: "/",
        maxAge: decodedToken.exp,
      });
      setCookie("userClaims", decodedToken, {
        path: "/",
        maxAge: decodedToken.exp,
      });
      toast.success(response.data.message);
    },
    onError: (error) => {
      const message = axiosErrorHandling(error);
      toast.error(message);
    },
  });
}
