import type { StudentAttendance, Subject } from "../types";

export const attendancePercent = (student: StudentAttendance) => {
  const total = student.present + student.absent;
  return total ? Math.round((student.present / total) * 1000) / 10 : 0;
};

export const subjectAverage = (subject: Subject) => {
  const total = subject.students.reduce((sum, student) => sum + attendancePercent(student), 0);
  return Math.round((total / subject.students.length) * 10) / 10;
};

export const statusFor = (value: number) => {
  if (value >= 85) return { label: "Excellent", tone: "success" as const };
  if (value >= 80) return { label: "Good", tone: "info" as const };
  if (value >= 75) return { label: "Safe", tone: "success" as const };
  if (value >= 70) return { label: "At Risk", tone: "warning" as const };
  return { label: "Critical", tone: "danger" as const };
};

export const classesNeededFor75 = (present: number, absent: number) => {
  let needed = 0;
  while (((present + needed) / (present + absent + needed)) * 100 < 75 && needed < 200) {
    needed += 1;
  }
  return needed;
};
