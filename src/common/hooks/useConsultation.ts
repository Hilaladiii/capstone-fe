import { useMutation } from "@tanstack/react-query";
import { ConsultationService } from "../../services/consultation/consultation.service";
import { ConsultationData, ConsultationResponse } from "../../common/types/consultation.type";

export const useConsultation = () => {
  return useMutation<ConsultationResponse, Error, ConsultationData>({
    mutationFn: (data: ConsultationData) => ConsultationService.createConsultation(data),
  });
};
