import { useMutation } from "@tanstack/react-query";
import { SignIn } from "../validation/auth.validation";
import { AuthService } from "../../services/auth/auth.service";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { axiosErrorHandling } from "../../services/setup.service";
import { jwtDecode } from "jwt-decode";
import { JwtPayload, Roles } from "../types/user.type";

interface SignInWithRole extends SignIn {
  selectedRole: "academic" | "lecturer";
  rememberMe: boolean;
}

export function useSignInAdmin() {
  const [, setCookie] = useCookies(["token", "userClaims"]);

  return useMutation({
    mutationFn: (data: SignInWithRole) => {
      const { email, password } = data;
      return AuthService.signIn({ email, password });
    },
    onSuccess: (response, variables) => {
      const token = response.data.data.token;
      const decodedToken = jwtDecode<JwtPayload>(token);

      const roles = decodedToken.roles as Roles[];

      const selectedRoleEnum = variables.selectedRole === "academic" ? Roles.ACADEMIC : Roles.LECTURER;
      const hasSelectedRole = roles.includes(selectedRoleEnum);

      if (!hasSelectedRole) {
        toast.error(`Anda tidak memiliki akses sebagai ${variables.selectedRole === "academic" ? "Akademik" : "Dosen"}.`);
        return;
      }

      const isAdmin = roles.includes(Roles.LECTURER) || roles.includes(Roles.ACADEMIC);

      if (!isAdmin) {
        toast.error("Anda tidak memiliki akses admin.");
        return;
      }

      const tokenExpiration = decodedToken.exp - Math.floor(Date.now() / 1000);
      const cookieMaxAge = variables.rememberMe 
        ? 30 * 24 * 60 * 60 
        : tokenExpiration;

      setCookie("token", token, {
        path: "/",
        maxAge: cookieMaxAge,
      });
      
      const userClaimsWithRole = {
        ...decodedToken,
        selectedRole: variables.selectedRole,
        rememberMe: variables.rememberMe
      };
      
      setCookie("userClaims", userClaimsWithRole, {
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