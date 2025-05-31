import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosErrorHandling } from "../../services/setup.service";
import { LecturerService } from "../../services/user/lecturer/lecturer.service";
import { SignUpLecturer } from "../validation/lecturer.validation";
import { useNavigate } from "react-router-dom";

export function useSignUpLecturer() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: SignUpLecturer) => LecturerService.signUp(data),
    onSuccess: (response) => {
      toast.success(response.data.message);
      navigate("/auth/sign-in");
    },
    onError: (error) => {
      const message = axiosErrorHandling(error);
      toast.error(message);
    },
  });
}
