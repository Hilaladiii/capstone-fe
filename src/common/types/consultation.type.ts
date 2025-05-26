export interface ConsultationData {
  fullname: string;
  nim: string;
  agencyName: string;
  position: string;
  activityDescription: string;
}

export interface ConsultationResponse {
  statusCode: number;
  message: string;
  data: {
    consultationId: string;
    fullname: string;
    nim: string;
    agencyName: string;
    position: string;
    activityDescription: string;
    createdAt: string;
    note: string | null;
    agreementStatus: string;
    studentNim: string;
  };
}
