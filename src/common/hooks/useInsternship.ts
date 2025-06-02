// Update untuk useInternship.ts - tambahkan function untuk competition
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosErrorHandling } from "../../services/setup.service";
import { InternshipService } from "../../services/internship/internship.service";
import { InternshipApplication, InternshipCompetitionApplication } from "../types/internshipp.type";

export function useInternship() {
  return useMutation({
    mutationFn: (data: InternshipApplication) => InternshipService.submitApplication(data),
    onSuccess: (response) => {
      toast.success(response.data.message || "Application submitted successfully!");
    },
    onError: (error) => {
      const message = axiosErrorHandling(error);
      toast.error(message);
    },
  });
}

export function useInternshipCompetition() {
  return useMutation({
    mutationFn: (data: InternshipCompetitionApplication) => InternshipService.submitCompetitionApplication(data),
    onSuccess: (response) => {
      toast.success(response.data.message || "Competition application submitted successfully!");
    },
    onError: (error) => {
      const message = axiosErrorHandling(error);
      toast.error(message);
    },
  });
}