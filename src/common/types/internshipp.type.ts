export type InternshipStatus = string;

export enum InternshipType {
  COMPETITION = "COMPETITION",
  COMPANY = "COMPANY",
  EXTENSION = "EXTENSION",
  CANCELLATION = "CANCELLATION",
}

export interface InternshipData {
  status: InternshipStatus;
}

export interface InternshipResponse {
  statusCode: number;
  message: string;
  data: InternshipData[];
}

export interface CancellationRequest {
  name: string;
  nim: string;
  email: string;
  phoneNumber: string;
  isGroup: boolean;
  agencyName: string;
  agencyAddress: string;
  cancellationReason: string;
  supportingDocumentFile: File;
}

export interface CancellationResponse {
  statusCode: number;
  message: string;
  data: {
    documentId: string;
    name: string;
    nim: string;
    phoneNumber: string;
    email: string;
    createdAt: string;
    status: string;
    rejectionReason: string | null;
    isGroup: boolean;
    studentNim: string;
  };
}

export interface UpdateCompanyRequest {
  status: string;
  coverLetterFile: File;
  studyResultCardFile: File;
  letterApprovalSupervisorFile: File;
}

export interface UpdateCancellationRequest {
  status: string;
  supportingDocument: File;
}

export interface UpdateResponse {
  statusCode: number;
  message: string;
}

export interface CompanyApplicationRequest {
  name: string;
  nim: string;
  phoneNumber: string;
  email: string;
  isGroup: boolean;
  agencyName: string;
  agencyAddress: string;
  totalSks: string;
  startDate: string;
  finishDate: string;
  internshipObject: string;
  recipientOfLetter: string;
  studyResultCardFile: File;
}

export interface CompetitionApplicationRequest {
  name: string;
  nim: string;
  phoneNumber: string;
  email: string;
  isGroup: boolean;
  totalSks: string;
  competitionName: string;
  competitionSupervisor: string;
  competitionCategory: string;
  competitionOrganizer: string;
  competitionInformation: string;
  competitionLevel: string;
  competitionWinner: string;
  competitionProduct: string;
  competitionStartDate: string;
  competitionFinishDate: string;
  studyResultCardFile: File;
  proposalCompetitionSertificationFile: File;
}

export interface ExtensionRequest {
  name: string;
  nim: string;
  email: string;
  phoneNumber: string;
  isGroup: boolean;
  totalSks: string;
  agencyName: string;
  agencyAddress: string;
  startDatePeriod: string;
  finishDatePeriod: string;
  startExtensionDatePeriod: string;
  finishExtensionDatePeriod: string;
  reasonExtension: string;
  internshipApplicationFile: File;
  intershipExtensionFile: File;
}

export interface ApplicationResponse {
  statusCode: number;
  message: string;
  data: {
    documentId: string;
    name: string;
    nim: string;
    phoneNumber: string;
    email: string;
    createdAt: string;
    status: string;
    rejectionReason: string | null;
    isGroup: boolean;
    studentNim: string;
  };
}

export interface DocumentFile {
  fileId: string;
  documentId: string;
  type: string;
  fileUrl: string;
  originalName: string;
  signed: boolean;
  createdAt: string;
}

export interface InternshipApplicationCompetition {
  documentId: string;
  totalSks: string;
  competitionName: string;
  competitionSupervisor: string;
  competitionCategory: string;
  competitionOrganizer: string;
  competitionInformation: string;
  competitionLevel: string;
  competitionWinner: string;
  competitionProduct: string;
  competitionStartDate: string;
  competitionFinishDate: string;
}

export interface InternshipCompetitionResponse {
  documentId: string;
  name: string;
  nim: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  status: string;
  rejectionReason: string | null;
  isGroup: boolean;
  studentNim: string;
  documentFiles: DocumentFile[];
  internshipApplicationCompetition: InternshipApplicationCompetition;
}
