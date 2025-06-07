export interface GroupMember {
  name: string;
  nim: string;
  phoneNumber: string;
  email: string;
  totalSks: string;
}

export interface InternshipApplication {
  name: string;
  nim: string;
  phoneNumber: string;
  email: string;
  isGroup: boolean;
  groupMembers: GroupMember[];
  agencyName: string;
  agencyAddress: string;
  totalSks: string;
  startDate: string;
  finishDate: string;
  internshipObject: string;
  recipientOfLetter: string;
  studyResultCardFile: File | null;
}

export interface InternshipCompetitionApplication {
  name: string;
  nim: string;
  phoneNumber: string;
  email: string;
  isGroup: boolean;
  groupMembers: GroupMember[];
  totalSks: string;
  competitionName: string;
  competitionSupervisor: string;
  competitionCategory: string;
  competitionOrganizer: string;
  competitionInformation: string;
  competitionLevel: "Local" | "Regional" | "National" | "International" | "";
  competitionWinner: string;
  competitionProduct: string;
  competitionStartDate: string;
  competitionFinishDate: string;
  studyResultCardFile: File | null;
  proposalCompetitionSertificationFile: File | null;
}

export interface InternshipExtensionApplication {
  name: string;
  nim: string;
  phoneNumber: string;
  email: string;
  isGroup: boolean;
  groupMembers?: GroupMember[];
  totalSks: string;
  agencyName: string;
  agencyAddress: string;
  startDatePeriod: string;
  finishDatePeriod: string;
  startExtensionDatePeriod: string;
  finishExtensionDatePeriod: string;
  reasonExtension: string;
  internshipApplicationFile: File | null;
  intershipExtensionFile: File | null;
}

export interface InternshipCancellationApplication {
  name: string;
  nim: string;
  phoneNumber: string;
  email: string;
  isGroup: boolean;
  groupMembers?: GroupMember[];
  agencyName: string;
  agencyAddress: string;
  cancellationReason: string;
  supportingDocumentFile: File | null;
}

export type InternshipStatus = "DOCUMENT_VERIFICATION" | "DOCUMENT_REVISION" | "HEAD_LECTURER_SIGNATURE_PROCESS" | "COMPLETED" | string;

export interface InternshipData {
  status: InternshipStatus;
}

export interface InternshipResponse {
  statusCode: number;
  message: string;
  data: InternshipData[];
}

export enum InternshipType {
  COMPANY = "COMPANY",
  COMPETITION = "COMPETITION", 
  EXTENSION = "EXTENSION",
  CANCELLATION = "CANCELLATION"
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

export interface Student {
  nim: string;
  sks: number;
  year: number;
  user: {
    email: string;
    fullname: string;
  };
}

export interface InternshipExtensionData {
  documentId: string;
  totalSks: string;
  agencyName: string;
  agencyAddress: string;
  startDatePeriod: string;
  finishDatePeriod: string;
  startExtensionDatePeriod: string;
  finishExtensionDatePeriod: string;
  reasonExtension: string;
}

export interface InternshipCompetitionData {
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

export interface InternshipCompanyData {
  documentId: string;
  totalSks: string;
  agencyName: string;
  agencyAddress: string;
  startDate: string;
  finishDate: string;
  internshipObject: string;
  recipientOfLetter: string;
}

export interface InternshipCancellationData {
  documentId: string;
  agencyName: string;
  agencyAddress: string;
  cancellationReason: string;
}

export interface BaseInternshipResponse {
  documentId: string;
  name: string;
  nim: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  status: InternshipStatus;
  rejectionReason: string | null;
  isGroup: boolean;
  studentNim: string;
  documentFiles: DocumentFile[];
  student: Student;
}

export interface InternshipExtensionResponse extends BaseInternshipResponse {
  internshipExtension: InternshipExtensionData;
}

export interface InternshipCompetitionResponse extends BaseInternshipResponse {
  internshipApplicationCompetition: InternshipCompetitionData;
}

export interface InternshipCompanyResponse extends BaseInternshipResponse {
  internshipApplicationCompany: InternshipCompanyData;
}

export interface InternshipCancellationResponse extends BaseInternshipResponse {
  internshipCancellation: InternshipCancellationData;
}

export interface GetInternshipResponse<T> {
  statusCode: number;
  message: string;
  data: T[];
}

export interface UpdateCompetitionStatusData {
  status: InternshipStatus;
  rejectionReason?: string;
  internshipVerificationCompetitionLetterFile?: File | null;
  internshipDeterminationCompetitionLetterFile?: File | null;
  studyResultCardFile?: File | null;
  proposalCompetitionSertificationFile?: File | null;
}