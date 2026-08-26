import type { Department } from "../types";

const names = [
  "Aarav Mehta",
  "Naina Kapoor",
  "Kabir Singh",
  "Mehak Sharma",
  "Rohan Bedi",
  "Isha Sethi",
  "Arjun Gill",
  "Simran Kaur",
  "Dev Malhotra",
  "Tanya Arora",
  "Kunal Verma",
  "Priya Nanda",
];

const students = (seed: number) =>
  names.map((name, index) => {
    const total = 42 + ((index + seed) % 8);
    const percent = [91, 86, 79, 74, 69, 82, 88, 77, 63, 93, 72, 84][(index + seed) % 12];
    const present = Math.round((total * percent) / 100);
    return {
      rollNumber: `PU${23 + seed}${String(index + 1).padStart(3, "0")}`,
      universityId: `PU-ID-${seed}${String(index + 14).padStart(4, "0")}`,
      name,
      present,
      absent: total - present,
    };
  });

export const departments: Department[] = [
  {
    id: "uiet",
    name: "University Institute of Engineering and Technology",
    shortName: "UIET",
    programs: [
      {
        id: "be-cse",
        name: "B.E. Computer Science & Engineering",
        semesters: [
          {
            number: 5,
            subjects: [
              { code: "CSE301", name: "Data Structures", faculty: "Dr. Kavita Sood", classesConducted: 48, students: students(1) },
              { code: "CSE303", name: "Operating Systems", faculty: "Prof. Harpreet Bajwa", classesConducted: 44, students: students(2) },
              { code: "CSE305", name: "Computer Networks", faculty: "Dr. Ritu Mahajan", classesConducted: 46, students: students(3) },
              { code: "CSE307", name: "Database Systems", faculty: "Prof. Sameer Anand", classesConducted: 43, students: students(4) },
              { code: "CSE309", name: "Software Engineering", faculty: "Dr. Neelam Verma", classesConducted: 45, students: students(5) },
              { code: "CSE311", name: "Artificial Intelligence", faculty: "Dr. Meera Kohli", classesConducted: 41, students: students(6) },
            ],
          },
        ],
      },
      {
        id: "be-ece",
        name: "B.E. Electronics & Communication",
        semesters: [{ number: 3, subjects: [{ code: "ECE205", name: "Signals and Systems", faculty: "Dr. Amanpreet Kaur", classesConducted: 39, students: students(7) }] }],
      },
    ],
  },
  {
    id: "dcsa",
    name: "Department of Computer Science and Applications",
    shortName: "DCSA",
    programs: [{ id: "mca", name: "Master of Computer Applications", semesters: [{ number: 3, subjects: [{ code: "MCA503", name: "Cloud Computing", faculty: "Dr. Puneet Arora", classesConducted: 36, students: students(8) }] }] }],
  },
  {
    id: "ubs",
    name: "University Business School",
    shortName: "UBS",
    programs: [{ id: "mba", name: "MBA", semesters: [{ number: 2, subjects: [{ code: "MBA204", name: "Business Analytics", faculty: "Prof. Nidhi Walia", classesConducted: 34, students: students(9) }] }] }],
  },
  {
    id: "physics",
    name: "Department of Physics",
    shortName: "Physics",
    programs: [{ id: "msc-physics", name: "M.Sc. Physics", semesters: [{ number: 1, subjects: [{ code: "PHY101", name: "Classical Mechanics", faculty: "Dr. Vikram Singh", classesConducted: 32, students: students(10) }] }] }],
  },
  {
    id: "chemistry",
    name: "Department of Chemistry",
    shortName: "Chemistry",
    programs: [{ id: "msc-chem", name: "M.Sc. Chemistry", semesters: [{ number: 1, subjects: [{ code: "CHE101", name: "Organic Reaction Mechanisms", faculty: "Dr. Anjali Batra", classesConducted: 33, students: students(11) }] }] }],
  },
  {
    id: "maths",
    name: "Department of Mathematics",
    shortName: "Mathematics",
    programs: [{ id: "msc-math", name: "M.Sc. Mathematics", semesters: [{ number: 1, subjects: [{ code: "MAT101", name: "Real Analysis", faculty: "Prof. S. K. Sharma", classesConducted: 35, students: students(12) }] }] }],
  },
  {
    id: "laws",
    name: "Department of Laws",
    shortName: "Laws",
    programs: [{ id: "llb", name: "LL.B.", semesters: [{ number: 4, subjects: [{ code: "LAW401", name: "Constitutional Law", faculty: "Dr. Rachna Suri", classesConducted: 37, students: students(13) }] }] }],
  },
  {
    id: "uiams",
    name: "University Institute of Applied Management Sciences",
    shortName: "UIAMS",
    programs: [{ id: "mba-exec", name: "MBA Executive", semesters: [{ number: 2, subjects: [{ code: "MGT205", name: "Operations Strategy", faculty: "Prof. Rahul Khanna", classesConducted: 31, students: students(14) }] }] }],
  },
];

export const trendData = [
  { week: "Week 1", average: 78 },
  { week: "Week 2", average: 81 },
  { week: "Week 3", average: 83 },
  { week: "Week 4", average: 80 },
  { week: "Week 5", average: 84 },
  { week: "Week 6", average: 82 },
];

export const todayTimeline = [
  { time: "09:00", subject: "Data Structures", attendance: 89 },
  { time: "10:00", subject: "Operating Systems", attendance: 84 },
  { time: "11:00", subject: "Database Systems", attendance: 78 },
  { time: "12:00", subject: "Software Engineering", attendance: 72 },
];
