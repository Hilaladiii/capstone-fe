export type InternshipStatus = string;

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
