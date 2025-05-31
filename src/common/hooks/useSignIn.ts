import { useMutation } from "@tanstack/react-query";
import { SignIn } from "../validation/auth.validation";
import { AuthService } from "../../services/auth/auth.service";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { axiosErrorHandling } from "../../services/setup.service";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/user.type";

interface SignInWithRemember extends SignIn {
  rememberMe: boolean;
}

export function useSignIn() {
  const [, setCookie] = useCookies(["token", "userClaims"]);
  
  return useMutation({
    mutationFn: (data: SignInWithRemember) => {
      const { email, password } = data;
      return AuthService.signIn({ email, password });
    },
    onSuccess: (response, variables) => {
      const token = response.data.data.token;
      const decodedToken = jwtDecode<JwtPayload>(token);
      
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenExpiration = decodedToken.exp && decodedToken.exp > currentTime 
        ? decodedToken.exp - currentTime 
        : 24 * 60 * 60;
        
      const cookieMaxAge = variables.rememberMe 
        ? 30 * 24 * 60 * 60
        : tokenExpiration;
      
      setCookie("token", token, {
        path: "/",
        maxAge: cookieMaxAge,
      });
      
      const userClaimsWithRemember = {
        ...decodedToken,
        rememberMe: variables.rememberMe
      };
      
      setCookie("userClaims", userClaimsWithRemember, {
        path: "/",
        maxAge: cookieMaxAge,
      });
      
      toast.success(response.data.message);
    },
    onError: (error) => {
      const message = axiosErrorHandling(error);
      toast.error(message);
    },
  });
}