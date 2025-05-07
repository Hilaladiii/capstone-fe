import { SignIn } from "../../common/validation/auth.validation";
import axiosInstance from "../setup.service";

export class AuthService {
  static signIn(data: SignIn) {
    return axiosInstance.post("/auth/login", data);
  }
}
