import { SignUpAcademic } from "../../../common/validation/academic.validation";
import axiosInstance from "../../setup.service";

export class AcademicService {
  static signUp(data: SignUpAcademic) {
    return axiosInstance.post("/user/academic/register", data);
  }
}