export type Role = "student" | "faculty";

export interface BaseUser {
  id: string;
  role: Role;
  fullName: string;
  email: string;
  department: string;
  phone: string;
  password: string;
}

export interface StudentUser extends BaseUser {
  role: "student";
  rollNumber: string;
  universityId: string;
  program: string;
  semester: string;
  year: string;
}

export interface FacultyUser extends BaseUser {
  role: "faculty";
  employeeId: string;
  designation: string;
}

export type AppUser = StudentUser | FacultyUser;

export interface StudentAttendance {
  rollNumber: string;
  universityId: string;
  name: string;
  present: number;
  absent: number;
}

export interface Subject {
  code: string;
  name: string;
  faculty: string;
  classesConducted: number;
  students: StudentAttendance[];
}

export interface Semester {
  number: number;
  subjects: Subject[];
}

export interface Program {
  id: string;
  name: string;
  semesters: Semester[];
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  programs: Program[];
}

export interface AttendanceSession {
  id: string;
  department: string;
  program: string;
  semester: number;
  subjectCode: string;
  subjectName: string;
  date: string;
  period: string;
  faculty: string;
  records: Record<string, "present" | "absent" | "late">;
}
