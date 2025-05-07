import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import {
  JwtAcademicClaim,
  JwtLecturerClaim,
  JwtStudentClaim,
} from "../types/user.type";

export const useAuth = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;
  let userClaims = null;
  let isAuthenticated = false;

  if (token) {
    try {
      const decodedToken = jwtDecode<
        JwtAcademicClaim & JwtLecturerClaim & JwtStudentClaim
      >(cookies.token);
      userClaims = decodedToken;
      isAuthenticated = true;
    } catch (error) {
      userClaims = null;
      isAuthenticated = false;
    }
  }
  return { userClaims, isAuthenticated };
};
