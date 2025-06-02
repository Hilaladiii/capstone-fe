import { SignUp } from "../../../common/validation/user.validation";
import axiosInstance from "../../setup.service";
import { ChangePasswordData, UpdateProfileData } from "../../../common/types/user.type";

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

  static async updateProfile(data: UpdateProfileData, image?: File) {
    const profileData: { sks?: number; year?: number } = {};

    if (data.sks !== undefined && data.sks !== null && typeof data.sks === 'number' && data.sks > 0) {
      profileData.sks = data.sks;
    }
    if (data.year !== undefined && data.year !== null && typeof data.year === 'number' && data.year > 0) {
      profileData.year = data.year;
    }

    if (Object.keys(profileData).length === 0 && !image) {
      throw new Error("Tidak ada data yang valid untuk diupdate");
    }

    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("data", JSON.stringify(profileData));

      return axiosInstance.patch("/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      return axiosInstance.patch("/user", profileData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
}