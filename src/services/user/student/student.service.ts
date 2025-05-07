import { SignUp } from "../../../common/validation/user.validation";
import axiosInstance from "../../setup.service";

export class StudentService {
  static signUp(data: SignUp) {
    return axiosInstance.post("/user/student/register", data);
  }
}
