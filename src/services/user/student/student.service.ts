import { SignUp } from "../../../common/validation/user.validation";
import axiosInstance from "../../setup.service";
import { ChangePasswordData } from "../../../common/types/user.type";

export class StudentService {
  static signUp(data: SignUp) {
    return axiosInstance.post("/user/student/register", data);
  }

  static getProfile() {
    return axiosInstance.get("/user");
  }

  static changePassword(data: ChangePasswordData) {
    return axiosInstance.put("/user/change-password", data);
  }
}