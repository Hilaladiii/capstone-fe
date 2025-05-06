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
}

export interface Student extends User {
  nim: string;
  sks: number;
  year: number;
}

export interface Academic extends User {
  nip: string;
}

export interface Lecturer extends User {
  nip: string;
}

export type JwtPayload = {
  sub: string;
  roles: Roles[];
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
