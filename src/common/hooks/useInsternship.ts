import { useMutation, useQuery } from "@tanstack/react-query";
import { InternshipService } from "../../services/internship/internship.service";
import {
  CancellationRequest,
  UpdateCompanyRequest,
  UpdateCancellationRequest,
  CancellationResponse,
  UpdateResponse,
  InternshipStatus,
} from "../../common/types/internship.type";

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
