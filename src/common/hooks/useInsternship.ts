import { useMutation, useQuery } from "@tanstack/react-query";
import { InternshipService } from "../../services/internship/internship.service";
import {
  CancellationRequest,
  UpdateCompanyRequest,
  UpdateCancellationRequest,
  CancellationResponse,
  UpdateResponse,
  InternshipStatus,
  CompanyApplicationRequest,
  CompetitionApplicationRequest,
  ExtensionRequest,
  ApplicationResponse,
} from "../types/internshipp.type";

export function useInternshipStatus() {
  return useQuery<InternshipStatus, Error>({
    queryKey: ["internshipStatus"],
    queryFn: InternshipService.getApplicationStatus,
  });
}

export function useRequestCancellation() {
  return useMutation<CancellationResponse, Error, CancellationRequest>({
    mutationFn: (data: CancellationRequest) => InternshipService.requestCancellation(data),
  });
}

export function useUpdateInternshipCompany(internshipId: string) {
  return useMutation<UpdateResponse, Error, UpdateCompanyRequest>({
    mutationFn: (data: UpdateCompanyRequest) => InternshipService.updateInternshipCompany(internshipId, data),
  });
}

export function useUpdateInternshipCancellation(cancellationId: string) {
  return useMutation<UpdateResponse, Error, UpdateCancellationRequest>({
    mutationFn: (data: UpdateCancellationRequest) => InternshipService.updateInternshipCancellation(cancellationId, data),
  });
}

export function useRequestCompanyApplication() {
  return useMutation<ApplicationResponse, Error, CompanyApplicationRequest>({
    mutationFn: (data: CompanyApplicationRequest) => InternshipService.requestCompanyApplication(data),
  });
}

export function useRequestCompetitionApplication() {
  return useMutation<ApplicationResponse, Error, CompetitionApplicationRequest>({
    mutationFn: (data: CompetitionApplicationRequest) => InternshipService.requestCompetitionApplication(data),
  });
}

export function useRequestExtension() {
  return useMutation<ApplicationResponse, Error, ExtensionRequest>({
    mutationFn: (data: ExtensionRequest) => InternshipService.requestExtension(data),
  });
}
