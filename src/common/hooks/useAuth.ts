import {
  JwtAcademicClaim,
  JwtLecturerClaim,
  JwtStudentClaim,
} from "../types/user.type";
import Cookies from "universal-cookie";

export const useAuth = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const userClaims = cookies.get("userClaims") as JwtStudentClaim &
    JwtAcademicClaim &
    JwtLecturerClaim;
  const isAuthenticated = !!userClaims;

  return { token, userClaims, isAuthenticated };
};
