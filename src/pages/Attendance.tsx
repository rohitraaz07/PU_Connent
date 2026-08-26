import { Download, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Page, PageHeader } from "../components/common/Page";
import { Modal, StatCard, StatusBadge } from "../components/common/UI";
import { useAuth } from "../context/AuthContext";
import { departments, todayTimeline, trendData } from "../data/attendanceData";
import type { AttendanceSession, StudentAttendance } from "../types";
import { attendancePercent, classesNeededFor75, statusFor, subjectAverage } from "../utils/attendance";
import { readStorage, uid, writeStorage } from "../utils/storage";

export function Attendance() {
  const { user } = useAuth();
  if (user?.role === "faculty") return <FacultyAttendance />;
  return <StudentAttendanceView />;
}

function FacultyAttendance() {
  const { user } = useAuth();
  const [deptId, setDeptId] = useState("uiet");
  const department = departments.find((item) => item.id === deptId) ?? departments[0];
  const [programId, setProgramId] = useState(department.programs[0].id);
  const program = department.programs.find((item) => item.id === programId) ?? department.programs[0];
  const [semesterNo, setSemesterNo] = useState(program.semesters[0].number);
  const semester = program.semesters.find((item) => item.number === semesterNo) ?? program.semesters[0];
  const [subjectCode, setSubjectCode] = useState(semester.subjects[0].code);
  const subject = semester.subjects.find((item) => item.code === subjectCode) ?? semester.subjects[0];
  const [query, setQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState(75);
  const [selected, setSelected] = useState<StudentAttendance | null>(null);
  const [markOpen, setMarkOpen] = useState(false);
  const allStudents = subject.students;
  const filtered = allStudents.filter((student) => `${student.name} ${student.rollNumber} ${student.universityId}`.toLowerCase().includes(query.toLowerCase()));
  const subjectRows = semester.subjects.map((item) => ({ name: item.name, average: subjectAverage(item) }));
  const below = allStudents.filter((student) => attendancePercent(student) < 75).length;
  const above = allStudents.length - below;
  const distribution = [
    { name: "Healthy", value: semester.subjects.flatMap((item) => item.students).filter((student) => attendancePercent(student) >= 75).length },
    { name: "At Risk", value: semester.subjects.flatMap((item) => item.students).filter((student) => attendancePercent(student) >= 70 && attendancePercent(student) < 75).length },
    { name: "Critical", value: semester.subjects.flatMap((item) => item.students).filter((student) => attendancePercent(student) < 70).length },
  ];

  const exportCsv = (name: string, rows: string[][]) => {
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("CSV export generated");
  };

  return (
    <Page>
      <PageHeader eyebrow="Department-Wise Attendance" title="Faculty attendance console" description="Select department, program, semester, and subject to analyze attendance, mark sessions, and identify risk." action={<button className="primary-button" onClick={() => setMarkOpen(true)}>Mark Attendance</button>} />
      <section className="selector-grid">
        <label>Department<select value={deptId} onChange={(e) => { const next = departments.find((item) => item.id === e.target.value)!; setDeptId(next.id); setProgramId(next.programs[0].id); setSemesterNo(next.programs[0].semesters[0].number); setSubjectCode(next.programs[0].semesters[0].subjects[0].code); }}>{departments.map((item) => <option value={item.id} key={item.id}>{item.shortName}</option>)}</select></label>
        <label>Program / Course<select value={programId} onChange={(e) => { const next = department.programs.find((item) => item.id === e.target.value)!; setProgramId(next.id); setSemesterNo(next.semesters[0].number); setSubjectCode(next.semesters[0].subjects[0].code); }}>{department.programs.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
        <label>Semester<select value={semesterNo} onChange={(e) => { const next = Number(e.target.value); setSemesterNo(next); setSubjectCode((program.semesters.find((item) => item.number === next) ?? program.semesters[0]).subjects[0].code); }}>{program.semesters.map((item) => <option value={item.number} key={item.number}>Semester {item.number}</option>)}</select></label>
        <label>Subject<select value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)}>{semester.subjects.map((item) => <option value={item.code} key={item.code}>{item.name}</option>)}</select></label>
      </section>
      <div className="breadcrumb-strip">{department.shortName} / {program.name} / Semester {semester.number} / {subject.name}</div>
      <section className="content-grid six">
        <StatCard label="Department Average" value="82.8%" />
        <StatCard label="Total Students" value="184" />
        <StatCard label="Above 75%" value={String(above)} tone="success" />
        <StatCard label="Below 75%" value={String(below)} tone="warning" />
        <StatCard label="Today's Classes" value="12" tone="info" />
        <StatCard label="Subjects" value={String(semester.subjects.length)} />
      </section>
      <section className="analytics-grid">
        <ChartCard title="Subject Attendance Comparison"><ResponsiveContainer><BarChart data={subjectRows}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" hide /><YAxis domain={[50, 100]} /><Tooltip /><Bar dataKey="average" fill="#C21876" /><Line type="monotone" dataKey={() => 75} stroke="#F2B73D" /></BarChart></ResponsiveContainer><small>75% threshold marked for intervention.</small></ChartCard>
        <ChartCard title="Department Attendance Trend"><ResponsiveContainer><LineChart data={trendData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="week" /><YAxis domain={[60, 100]} /><Tooltip /><Line type="monotone" dataKey="average" stroke="#C21876" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartCard>
        <ChartCard title="Attendance Health Distribution"><ResponsiveContainer><PieChart><Pie data={distribution} dataKey="value" outerRadius={88}>{["#25865C", "#C47B1C", "#B83A31"].map((color) => <Cell key={color} fill={color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></ChartCard>
      </section>
      <section className="content-grid three">
        {semester.subjects.map((item) => {
          const avg = subjectAverage(item);
          const belowSubject = item.students.filter((student) => attendancePercent(student) < 75).length;
          return <article className="data-card" key={item.code}><span className="eyebrow">{item.code}</span><h2>{item.name}</h2><p>{item.faculty}</p><dl className="compact-dl"><dt>Classes Conducted</dt><dd>{item.classesConducted}</dd><dt>Average Attendance</dt><dd>{avg}%</dd><dt>Above 75%</dt><dd>{item.students.length - belowSubject}</dd><dt>Below 75%</dt><dd>{belowSubject}</dd></dl><button className="secondary-button" onClick={() => setSubjectCode(item.code)}>View Students</button></article>;
        })}
      </section>
      <section className="data-card">
        <div className="table-toolbar">
          <h2>Student Attendance Table</h2>
          <div className="search-box"><Search size={18} /><input placeholder="Search by Student Name, Roll Number, University ID" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
        </div>
        <div className="responsive-table">
          <table>
            <thead><tr><th>Roll Number</th><th>Student Name</th><th>Present</th><th>Absent</th><th>Total Classes</th><th>Attendance %</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{filtered.map((student) => { const percent = attendancePercent(student); const status = statusFor(percent); return <tr key={student.rollNumber}><td>{student.rollNumber}</td><td>{student.name}</td><td>{student.present}</td><td>{student.absent}</td><td>{student.present + student.absent}</td><td>{percent}%</td><td><StatusBadge label={status.label} tone={status.tone} /></td><td><button className="link-button" onClick={() => setSelected(student)}>Details</button></td></tr>; })}</tbody>
          </table>
        </div>
      </section>
      <section className="analytics-grid">
        <article className="data-card"><h2>Attendance Risk Analysis</h2><div className="segmented">{[75, 70, 60].map((value) => <button key={value} className={riskFilter === value ? "selected" : ""} onClick={() => setRiskFilter(value)}>Below {value}%</button>)}</div>{semester.subjects.flatMap((item) => item.students.map((student) => ({ item, student, percent: attendancePercent(student) }))).filter((row) => row.percent < riskFilter).slice(0, 8).map((row) => <p key={`${row.item.code}-${row.student.rollNumber}`}><strong>{row.student.name}</strong> · {row.item.name} · {row.percent}% · Missed {row.student.absent} · Attend {classesNeededFor75(row.student.present, row.student.absent)} classes</p>)}</article>
        <article className="data-card"><h2>Today's Department Attendance</h2>{todayTimeline.map((item) => <p key={item.time}>{item.time} {item.subject} - {item.attendance}%</p>)}</article>
        <article className="data-card"><h2>Attendance Export</h2>{["Department Attendance CSV", "Subject Attendance CSV", "At-Risk Students CSV", "Monthly Attendance CSV"].map((label) => <button className="secondary-button" key={label} onClick={() => exportCsv(`${label.toLowerCase().replaceAll(" ", "-")}.csv`, [["Roll Number", "Student", "Attendance"], ...allStudents.map((s) => [s.rollNumber, s.name, String(attendancePercent(s))])])}><Download size={16} /> {label}</button>)}</article>
      </section>
      <AttendanceHeatmap subjects={semester.subjects.map((item) => item.name)} />
      <section className="data-card"><h2>Attendance History</h2>{readStorage<AttendanceSession[]>("pu-connect-attendance-sessions", []).map((session) => <p key={session.id}>{session.date} · {session.subjectName} · {session.faculty} · Present {Object.values(session.records).filter((value) => value === "present").length} · Absent {Object.values(session.records).filter((value) => value === "absent").length} · Saved</p>)}</section>
      {selected && <StudentDetails student={selected} subjectName={subject.name} onClose={() => setSelected(null)} />}
      {markOpen && <MarkAttendance department={department.shortName} program={program.name} semester={semester.number} subject={subject} faculty={user?.fullName ?? "Faculty"} onClose={() => setMarkOpen(false)} />}
    </Page>
  );
}

function StudentAttendanceView() {
  const { user } = useAuth();
  const subject = departments[0].programs[0].semesters[0].subjects[4];
  const student = subject.students[0];
  const [future, setFuture] = useState(8);
  const [plans, setPlans] = useState(8);
  const projected = Math.round(((student.present + plans) / (student.present + student.absent + future)) * 1000) / 10;
  const subjects = departments[0].programs[0].semesters[0].subjects.map((item) => ({ subject: item.name, attendance: attendancePercent(item.students[0]), present: item.students[0].present, absent: item.students[0].absent }));
  const overall = Math.round(subjects.reduce((sum, item) => sum + item.attendance, 0) / subjects.length);
  return (
    <Page>
      <PageHeader eyebrow="Attendance" title="My attendance" description="Student view is scoped automatically to your registered department, program, and semester." />
      <div className="breadcrumb-strip">{user?.department} / {user?.role === "student" ? user.program : ""} / Semester {user?.role === "student" ? user.semester : ""}</div>
      <section className="content-grid four"><StatCard label="Overall Attendance" value={`${overall}%`} tone={overall >= 75 ? "success" : "warning"} /><StatCard label="Classes Attended" value={String(subjects.reduce((s, i) => s + i.present, 0))} /><StatCard label="Classes Missed" value={String(subjects.reduce((s, i) => s + i.absent, 0))} tone="warning" /><StatCard label="Below Threshold" value={String(subjects.filter((item) => item.attendance < 75).length)} tone="danger" /></section>
      <section className="analytics-grid">
        <ChartCard title="Subject-wise Attendance"><ResponsiveContainer><BarChart data={subjects}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="subject" hide /><YAxis domain={[50, 100]} /><Tooltip /><Bar dataKey="attendance" fill="#C21876" /></BarChart></ResponsiveContainer></ChartCard>
        <ChartCard title="Attendance Trend"><ResponsiveContainer><LineChart data={trendData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="week" /><YAxis domain={[60, 100]} /><Tooltip /><Line dataKey="average" stroke="#C21876" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartCard>
        <article className="data-card"><h2>Attendance Recovery Planner</h2><label>Subject<select><option>Software Engineering</option><option>Database Systems</option></select></label><label>Upcoming Classes<input type="number" value={future} onChange={(e) => setFuture(Number(e.target.value))} /></label><label>Classes You Plan To Attend<input type="number" value={plans} onChange={(e) => setPlans(Number(e.target.value))} /></label><p>Current Attendance: {attendancePercent(student)}%</p><p>Projected Attendance: {projected}%</p><StatusBadge label={projected >= 75 ? "Safe" : "At Risk"} tone={projected >= 75 ? "success" : "warning"} /><p>Classes required to reach 75%: {classesNeededFor75(student.present, student.absent)}</p></article>
      </section>
      <section className="content-grid three">{subjects.map((item) => <article className="data-card" key={item.subject}><h2>{item.subject}</h2><strong>{item.attendance}%</strong><p>Attended {item.present}, missed {item.absent}</p><StatusBadge label={statusFor(item.attendance).label} tone={statusFor(item.attendance).tone} /></article>)}</section>
      <AttendanceHeatmap subjects={subjects.map((item) => item.subject)} />
    </Page>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <article className="data-card chart-card"><h2>{title}</h2><div className="chart-box">{children}</div></article>;
}

function StudentDetails({ student, subjectName, onClose }: { student: StudentAttendance; subjectName: string; onClose: () => void }) {
  const percent = attendancePercent(student);
  return <Modal title={student.name} onClose={onClose}><dl className="profile-card"><div><span>Roll Number</span><strong>{student.rollNumber}</strong></div><div><span>University ID</span><strong>{student.universityId}</strong></div><div><span>Department</span><strong>UIET</strong></div><div><span>Course</span><strong>B.E. Computer Science & Engineering</strong></div><div><span>Semester</span><strong>5</strong></div><div><span>Overall Attendance</span><strong>{percent}%</strong></div><div><span>Risk Status</span><strong>{statusFor(percent).label}</strong></div><div><span>Classes Missed</span><strong>{student.absent}</strong></div></dl><p>{subjectName}: {percent}%. Database Systems: 74%. Computer Networks: 79%. Operating Systems: 86%. Data Structures: 91%.</p><p>Recovery guidance: attend the next {classesNeededFor75(student.present, student.absent)} classes to move toward the 75% threshold.</p></Modal>;
}

function MarkAttendance({ department, program, semester, subject, faculty, onClose }: { department: string; program: string; semester: number; subject: { code: string; name: string; students: StudentAttendance[] }; faculty: string; onClose: () => void }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [period, setPeriod] = useState("Lecture 1");
  const [records, setRecords] = useState<Record<string, "present" | "absent" | "late">>(() => Object.fromEntries(subject.students.map((s) => [s.rollNumber, "present"])));
  const save = () => {
    const sessions = readStorage<AttendanceSession[]>("pu-connect-attendance-sessions", []);
    writeStorage("pu-connect-attendance-sessions", [...sessions, { id: uid("att"), department, program, semester, subjectCode: subject.code, subjectName: subject.name, date, period, faculty, records }]);
    toast.success("Attendance saved locally");
    onClose();
  };
  return <Modal title="Mark Attendance" onClose={onClose}><div className="selector-grid"><label>Department<input value={department} readOnly /></label><label>Program<input value={program} readOnly /></label><label>Semester<input value={`Semester ${semester}`} readOnly /></label><label>Subject<input value={subject.name} readOnly /></label><label>Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label><label>Lecture / Period<select value={period} onChange={(e) => setPeriod(e.target.value)}><option>Lecture 1</option><option>Lecture 2</option><option>Lab</option></select></label></div><div className="form-row"><button className="secondary-button" onClick={() => setRecords(Object.fromEntries(subject.students.map((s) => [s.rollNumber, "present"])))}>Mark All Present</button><button className="secondary-button" onClick={() => setRecords({})}>Clear All</button></div><div className="mark-list">{subject.students.map((student) => <div key={student.rollNumber}><strong>{student.name}</strong><div className="segmented">{(["present", "absent", "late"] as const).map((value) => <button key={value} className={records[student.rollNumber] === value ? "selected" : ""} onClick={() => setRecords((current) => ({ ...current, [student.rollNumber]: value }))}>{value}</button>)}</div></div>)}</div><button className="primary-button" onClick={save}>Save Attendance</button></Modal>;
}

function AttendanceHeatmap({ subjects }: { subjects: string[] }) {
  return <section className="data-card"><h2>Weekly Attendance Heatmap</h2><div className="heatmap">{subjects.map((subject, row) => <div className="heat-row" key={subject}><span>{subject}</span>{Array.from({ length: 6 }, (_, index) => { const value = 68 + ((row * 7 + index * 5) % 28); return <i title={`${subject} · Week ${index + 1} · Average Attendance ${value}%`} style={{ background: value >= 80 ? "#21875C" : value >= 75 ? "#C21876" : value >= 70 ? "#C48518" : "#BA3247" }} key={index}>W{index + 1}</i>; })}</div>)}</div></section>;
}
