// Update untuk internshipp.type.ts - tambahkan interface competition
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
  competitionLevel: 'Local' | 'Regional' | 'National' | 'International' | '';
  competitionWinner: string;
  competitionProduct: string;
  competitionStartDate: string;
  competitionFinishDate: string;
  studyResultCardFile: File | null;
  proposalCompetitionSertificationFile: File | null;
}