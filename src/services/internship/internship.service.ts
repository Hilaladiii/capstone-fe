import axiosInstance from "../setup.service";
import {
  InternshipResponse,
  InternshipStatus,
  CancellationRequest,
  CancellationResponse,
  UpdateCompanyRequest,
  UpdateCancellationRequest,
  UpdateResponse,
  CompanyApplicationRequest,
  CompetitionApplicationRequest,
  ExtensionRequest,
  ApplicationResponse,
} from "../../common/types/internshipp.type";

export class InternshipService {
  static async getApplicationStatus(): Promise<InternshipStatus> {
    const response = await axiosInstance.get<InternshipResponse>("/internship/status");
    return response.data.data[0].status;
  }

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
    return response.data;
  }

  static async updateInternshipCompany(internshipId: string, data: UpdateCompanyRequest): Promise<UpdateResponse> {
    const formData = new FormData();
    formData.append("status", data.status);
    formData.append("coverLetterFile", data.coverLetterFile);
    formData.append("studyResultCardFile", data.studyResultCardFile);
    formData.append("letterApprovalSupervisorFile", data.letterApprovalSupervisorFile);

    const response = await axiosInstance.patch<UpdateResponse>(`/internship/${internshipId}/company`, formData);
    return response.data;
  }

  static async updateInternshipCancellation(cancellationId: string, data: UpdateCancellationRequest): Promise<UpdateResponse> {
    const formData = new FormData();
    formData.append("status", data.status);
    formData.append("supportingDocument", data.supportingDocument);

    const response = await axiosInstance.patch<UpdateResponse>(`/internship/${cancellationId}/cancellation`, formData);
    return response.data;
  }

  static async requestCompanyApplication(data: CompanyApplicationRequest): Promise<ApplicationResponse> {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("nim", data.nim);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("email", data.email);
    formData.append("isGroup", data.isGroup.toString());
    formData.append("agencyName", data.agencyName);
    formData.append("agencyAddress", data.agencyAddress);
    formData.append("totalSks", data.totalSks);
    formData.append("startDate", data.startDate);
    formData.append("finishDate", data.finishDate);
    formData.append("internshipObject", data.internshipObject);
    formData.append("recipientOfLetter", data.recipientOfLetter);
    formData.append("studyResultCardFile", data.studyResultCardFile);

    const response = await axiosInstance.post<ApplicationResponse>("/internship/application/company", formData);
    return response.data;
  }

  static async requestCompetitionApplication(data: CompetitionApplicationRequest): Promise<ApplicationResponse> {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("nim", data.nim);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("email", data.email);
    formData.append("isGroup", data.isGroup.toString());
    formData.append("totalSks", data.totalSks);
    formData.append("competitionName", data.competitionName);
    formData.append("competitionSupervisor", data.competitionSupervisor);
    formData.append("competitionCategory", data.competitionCategory);
    formData.append("competitionOrganizer", data.competitionOrganizer);
    formData.append("competitionInformation", data.competitionInformation);
    formData.append("competitionLevel", data.competitionLevel);
    formData.append("competitionWinner", data.competitionWinner);
    formData.append("competitionProduct", data.competitionProduct);
    formData.append("competitionStartDate", data.competitionStartDate);
    formData.append("competitionFinishDate", data.competitionFinishDate);
    formData.append("studyResultCardFile", data.studyResultCardFile);
    formData.append("proposalCompetitionSertificationFile", data.proposalCompetitionSertificationFile);

    const response = await axiosInstance.post<ApplicationResponse>("/internship/application/competition", formData);
    return response.data;
  }

  static async requestExtension(data: ExtensionRequest): Promise<ApplicationResponse> {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("nim", data.nim);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("isGroup", data.isGroup.toString());
    formData.append("totalSks", data.totalSks);
    formData.append("agencyName", data.agencyName);
    formData.append("agencyAddress", data.agencyAddress);
    formData.append("startDatePeriod", data.startDatePeriod);
    formData.append("finishDatePeriod", data.finishDatePeriod);
    formData.append("startExtensionDatePeriod", data.startExtensionDatePeriod);
    formData.append("finishExtensionDatePeriod", data.finishExtensionDatePeriod);
    formData.append("reasonExtension", data.reasonExtension);
    formData.append("internshipApplicationFile", data.internshipApplicationFile);
    formData.append("intershipExtensionFile", data.intershipExtensionFile);

    const response = await axiosInstance.post<ApplicationResponse>("/internship/extension", formData);
    return response.data;
  }
}
