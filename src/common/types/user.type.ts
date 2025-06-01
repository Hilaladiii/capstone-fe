export enum Roles {
  STUDENT = "STUDENT",
  LECTURER = "LECTURER",
  HEAD_LECTURER = "HEAD_LECTURER",
  ACADEMIC = "ACADEMIC",
  ADMIN = "ADMIN",
  SUPERVISOR = "SUPERVISOR",
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
  student?: {
    nim: string;
    sks?: number;
    year?: number;
    program?: string;
  };
}

export interface UpdateProfileData {
  fullname: string;
  email: string;
  nim?: string;
  sks?: string;
  year?: string;
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