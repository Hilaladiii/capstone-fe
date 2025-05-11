import { useCookies } from "react-cookie";
import {
  JwtAcademicClaim,
  JwtLecturerClaim,
  JwtStudentClaim,
} from "../types/user.type";

export const useAuth = () => {
  const [cookies] = useCookies(["token", "userClaims"]);
  const token = cookies?.token;
  const userClaims = cookies?.userClaims as JwtStudentClaim &
    JwtAcademicClaim &
    JwtLecturerClaim;
  const isAuthenticated = !!userClaims;

  return { token, userClaims, isAuthenticated };
};
