import axiosInstance from "../setup.service";
import { ConsultationData, ConsultationResponse } from "../../common/types/consultation.type";

export class ConsultationService {
  static async createConsultation(data: ConsultationData): Promise<ConsultationResponse> {
    const response = await axiosInstance.post("/consultation", data);
    return response.data;
  }
}
