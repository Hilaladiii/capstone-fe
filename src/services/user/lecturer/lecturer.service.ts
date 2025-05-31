import { SignUpLecturer } from "../../../common/validation/lecturer.validation";
import axiosInstance from "../../setup.service";

export class LecturerService {
  static signUp(data: SignUpLecturer) {
    return axiosInstance.post("/user/lecturer/register", data);
  }
}
