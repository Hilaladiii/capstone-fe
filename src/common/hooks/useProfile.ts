import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosErrorHandling } from "../../services/setup.service";
import { StudentService } from "../../services/user/student/student.service";
import { ChangePasswordData, UserProfile, UpdateProfileData } from "../types/user.type";

export function useProfile() {
  return useQuery<UserProfile>({ 
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

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, image }: { data: UpdateProfileData; image?: File }) =>
      StudentService.updateProfile(data, image),
    onSuccess: async (response) => {
      toast.success(response.data.message || "Profile berhasil diperbarui");

      await queryClient.invalidateQueries({ queryKey: ["profile"] });

      await queryClient.refetchQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      const message = axiosErrorHandling(error);
      console.error("Error updating profile:", message);
      toast.error(message);
    },
  });
}