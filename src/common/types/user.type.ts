export enum Roles {
  STUDENT = "STUDENT",
  ACADEMIC = "ACADEMIC",
  HEAD_STUDY_PROGRAM = "HEAD_STUDY_PROGRAM",
  HEAD_DEPARTEMENT = "HEAD_DEPARTEMENT",
  SUPERVISOR = "SUPERVISOR",
  LECTURER = "LECTURER",
  ADMIN = "ADMIN",
}

export interface User {
  email: string;
  username: string;
  fullname: string;
  password: string;
  role: string;
}

export interface Student extends User {
  nim: string;
  sks: number;
  year: number;
  program: string;
}

export interface Academic extends User {
  nip: string;
}

export interface Lecturer extends User {
  nip: string;
}

export interface UserProfile {
  fullname: string;
  email: string;
  nim?: string;
  role: string;
  profileImageUrl?: string;
  student?: {
    nim: string;
    sks?: number;
    year?: number;
    program?: string;
  };
}

export interface UpdateProfileData {
  sks?: number; 
  year?: number; 
  fullname?: string;
  email?: string;
  nim?: string;
  program?: string;
}

export interface ChangePasswordData {
  password: string;
  confirmPassword: string;
}

export type JwtPayload = {
  sub: string;
  roles: Roles[];
  exp: number;
};

export type JwtStudentClaim = JwtPayload & {
  nim: string;
};

export type JwtLecturerClaim = JwtPayload & {
  nip: string;
};

export type JwtAcademicClaim = JwtPayload & {
  nip: string;
};