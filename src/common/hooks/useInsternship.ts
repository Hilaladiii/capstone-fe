import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { InternshipService } from "../../services/internship/internship.service";
import { InternshipApplication, InternshipCompetitionApplication, InternshipExtensionApplication, InternshipCancellationApplication, InternshipStatus } from "../types/internshipp.type";

export function useInternship() {
  return useMutation({
    mutationFn: (data: InternshipApplication) => InternshipService.submitApplication(data),
    onSuccess: (response) => {
      toast.success(response.data.message || "Application submitted successfully!");
    },
  });
}

export function useInternshipCompetition() {
  return useMutation({
    mutationFn: (data: InternshipCompetitionApplication) => InternshipService.submitCompetitionApplication(data),
    onSuccess: (response) => {
      toast.success(response.data.message || "Competition application submitted successfully!");
    },
  });
}

export function useInternshipExtension() {
  return useMutation({
    mutationFn: (data: InternshipExtensionApplication) => InternshipService.submitExtensionApplication(data),
    onSuccess: (response) => {
      toast.success(response.data.message || "Extension application submitted successfully!");
    },
  });
}

export function useInternshipCancellation() {
  return useMutation({
    mutationFn: (data: InternshipCancellationApplication) => InternshipService.submitCancellationApplication(data),
    onSuccess: (response) => {
      toast.success(response.data.message || "Cancellation application submitted successfully!");
    },
  });
}

export function useInternshipStatus() {
  return useQuery<InternshipStatus, Error>({
    queryKey: ["internshipStatus"],
    queryFn: InternshipService.getApplicationStatus,
  });
}
