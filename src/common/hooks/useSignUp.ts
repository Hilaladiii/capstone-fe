import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosErrorHandling } from "../../services/setup.service";
import { StudentService } from "../../services/user/student/student.service";
import { SignUp } from "../validation/user.validation";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: SignUp) => StudentService.signUp(data),
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