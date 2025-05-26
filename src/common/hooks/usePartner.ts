import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PartnerService } from "../../services/partner/partner.service";
import { PartnerResponse, CreatePartnerRequest, UpdatePartnerRequest } from "../types/partner.type";

export function usePartners(currPage: number, dataPerPage: number, orderBy: string, name: string, city: string) {
  return useQuery<PartnerResponse>({
    queryKey: ["partners", currPage, dataPerPage, orderBy, name, city],
    queryFn: async () => {
      const response = await PartnerService.getAllPartners(currPage, dataPerPage, orderBy, name, city);
      return response.data;
    },
  });
}

export function useCreatePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPartner: CreatePartnerRequest) => PartnerService.createPartner(newPartner),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
}

export function useUpdatePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ partnerId, updatedData }: { partnerId: string; updatedData: UpdatePartnerRequest }) =>
      PartnerService.updatePartner(partnerId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
}

export function useDeletePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (partnerId: string) => PartnerService.deletePartner(partnerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
}
