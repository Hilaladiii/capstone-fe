import { useMutation } from "@tanstack/react-query";
import { SignIn } from "../validation/auth.validation";
import { AuthService } from "../../services/auth/auth.service";
import toast from "react-hot-toast";
import { axiosErrorHandling } from "../../services/setup.service";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

export function useSignIn() {
  const cookies = new Cookies(null, { path: "/" });
  return useMutation({
    mutationFn: (data: SignIn) => AuthService.signIn(data),
    onSuccess: (response) => {
      const token = response.data.data.token;
      const decodedToken = jwtDecode(token);
      cookies.set("token", token, {
        path: "/",
        maxAge: decodedToken.exp,
      });
      cookies.set("userClaims", decodedToken, {
        path: "/",
        maxAge: decodedToken.exp,
      });
      toast.success(response.data.message);
      window.location.reload();
    },
    onError: (error) => {
      const message = axiosErrorHandling(error);
      toast.error(message);
    },
  });
}
