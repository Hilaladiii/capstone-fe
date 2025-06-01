import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosErrorHandling } from "../../services/setup.service";
import { StudentService } from "../../services/user/student/student.service";
import { ChangePasswordData, UserProfile } from "../types/user.type";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await StudentService.getProfile();
      return response.data.data as UserProfile;
    },
    retry: 1,
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordData) => StudentService.changePassword(data),
    onSuccess: (response) => {
      toast.success(response.data.message || "Password berhasil diubah");
    },
    onError: (error) => {
      const message = axiosErrorHandling(error);
      toast.error(message);
    },
  });
}