import axiosInstance from "../setup.service";
import {
  InternshipResponse,
  InternshipStatus,
  CancellationRequest,
  CancellationResponse,
  UpdateCompanyRequest,
  UpdateCancellationRequest,
  UpdateResponse,
} from "../../common/types/internship.type";

export class InternshipService {
  // Get internship status
  static async getApplicationStatus(): Promise<InternshipStatus> {
    const response = await axiosInstance.get<InternshipResponse>("/internship/status");
    return response.data.data[0].status; // Extract the status directly
  }

  // Request internship cancellation
  static async requestCancellation(data: CancellationRequest): Promise<CancellationResponse> {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("nim", data.nim);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("isGroup", data.isGroup.toString());
    formData.append("agencyName", data.agencyName);
    formData.append("agencyAddress", data.agencyAddress);
    formData.append("cancellationReason", data.cancellationReason);
    formData.append("supportingDocumentFile", data.supportingDocumentFile);

    const response = await axiosInstance.post<CancellationResponse>("/internship/cancellation", formData);
    return response.data; // Extract the data directly
  }

  // Update internship company
  static async updateInternshipCompany(
    internshipId: string,
    data: UpdateCompanyRequest
  ): Promise<UpdateResponse> {
    const formData = new FormData();
    formData.append("status", data.status);
    formData.append("coverLetterFile", data.coverLetterFile);
    formData.append("studyResultCardFile", data.studyResultCardFile);
    formData.append("letterApprovalSupervisorFile", data.letterApprovalSupervisorFile);

    const response = await axiosInstance.patch<UpdateResponse>(
      `/internship/${internshipId}/company`,
      formData
    );
    return response.data; // Extract the data directly
  }

  // Update internship cancellation
  static async updateInternshipCancellation(
    cancellationId: string,
    data: UpdateCancellationRequest
  ): Promise<UpdateResponse> {
    const formData = new FormData();
    formData.append("status", data.status);
    formData.append("supportingDocument", data.supportingDocument);

    const response = await axiosInstance.patch<UpdateResponse>(
      `/internship/${cancellationId}/cancellation`,
      formData
    );
    return response.data; // Extract the data directly
  }
}
