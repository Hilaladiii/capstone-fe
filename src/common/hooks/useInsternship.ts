import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosErrorHandling } from "../../services/setup.service";
import { InternshipService } from "../../services/internship/internship.service";
import { 
  InternshipApplication, 
  InternshipCompetitionApplication, 
  InternshipExtensionApplication, 
  InternshipCancellationApplication, 
  InternshipStatus,
  InternshipType,
  InternshipExtensionResponse,
  InternshipCompetitionResponse,
  InternshipCompanyResponse,
  InternshipCancellationResponse,
  GetInternshipResponse,
  UpdateCompetitionStatusData
} from "../types/internship.type";

type InternshipResponseMap = {
  [InternshipType.EXTENSION]: InternshipExtensionResponse;
  [InternshipType.COMPETITION]: InternshipCompetitionResponse;
  [InternshipType.COMPANY]: InternshipCompanyResponse;
  [InternshipType.CANCELLATION]: InternshipCancellationResponse;
};

type UseInternshipDataReturn<T> = Omit<UseQueryResult<GetInternshipResponse<T>, Error>, 'data'> & {
  data: T[] | undefined;
};

export function useInternshipData(type: InternshipType.EXTENSION): UseInternshipDataReturn<InternshipExtensionResponse>;
export function useInternshipData(type: InternshipType.COMPETITION): UseInternshipDataReturn<InternshipCompetitionResponse>;
export function useInternshipData(type: InternshipType.COMPANY): UseInternshipDataReturn<InternshipCompanyResponse>;
export function useInternshipData(type: InternshipType.CANCELLATION): UseInternshipDataReturn<InternshipCancellationResponse>;
export function useInternshipData<T extends InternshipType>(
  type: T
): UseInternshipDataReturn<InternshipResponseMap[T]> {
  const queryResult = useQuery<GetInternshipResponse<InternshipResponseMap[T]>, Error>({
    queryKey: ["internship", type],
    queryFn: () => InternshipService.getInternships(type),
  });
  
  return {
    ...queryResult,
    data: queryResult.data?.data,
  };
}

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

export function useInternshipExtension() {
  return useMutation({
    mutationFn: (data: InternshipExtensionApplication) => InternshipService.submitExtensionApplication(data),
    onSuccess: (response) => {
      toast.success(response.data.message || "Extension application submitted successfully!");
    },
    onError: (error) => {
      const message = axiosErrorHandling(error);
      toast.error(message);
    },
  });
}

export function useInternshipCancellation() {
  return useMutation({
    mutationFn: (data: InternshipCancellationApplication) => InternshipService.submitCancellationApplication(data),
    onSuccess: (response) => {
      toast.success(response.data.message || "Cancellation application submitted successfully!");
    },
    onError: (error) => {
      const message = axiosErrorHandling(error);
      toast.error(message);
    },
  });
}

export function useInternshipStatus() {
  return useQuery<InternshipStatus, Error>({
    queryKey: ["internshipStatus"],
    queryFn: InternshipService.getApplicationStatus,
  });
}

export function useUpdateCompetitionStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ documentId, data }: { documentId: string; data: UpdateCompetitionStatusData }) => 
      InternshipService.updateCompetitionStatus(documentId, data),
    onSuccess: (response) => {
      toast.success(response.data.message || "Status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["internship", InternshipType.COMPETITION] });
    },
    onError: (error) => {
      const message = axiosErrorHandling(error);
      toast.error(message);
    },
  });
}