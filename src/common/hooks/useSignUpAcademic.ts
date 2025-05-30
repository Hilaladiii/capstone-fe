import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosErrorHandling } from "../../services/setup.service";
import { AcademicService } from "../../services/user/academic/academic.service";
import { SignUpAcademic } from "../validation/academic.validation";
import { useNavigate } from "react-router-dom";

export function useSignUpAcademic() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: SignUpAcademic) => AcademicService.signUp(data),
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
