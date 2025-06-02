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