import { SignUp } from "../../../common/validation/user.validation";
import axiosInstance from "../../setup.service";

export class StudentService {
  static async signUp(data: SignUp) {
    const response = await axiosInstance.post("/user/student/register", data);
    return response;
  }
}
