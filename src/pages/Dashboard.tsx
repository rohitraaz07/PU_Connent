import { Bike, BookOpen, CalendarCheck, CreditCard, ExternalLink, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Page, PageHeader } from "../components/common/Page";
import { StatCard } from "../components/common/UI";
import { useAuth } from "../context/AuthContext";
import { departments, todayTimeline } from "../data/attendanceData";
import { notices, opportunities } from "../data/mockData";
import { attendancePercent, subjectAverage } from "../utils/attendance";

export function Dashboard() {
  const { user } = useAuth();
  const subject = departments[0].programs[0].semesters[0].subjects[4];
  const student = subject.students[0];
  const attendance = user?.role === "student" ? attendancePercent(student) : Math.round(subjectAverage(subject));
  return (
    <Page>
      <PageHeader eyebrow="Dashboard" title={`Welcome, ${user?.fullName}`} description="Your role-aware PU Connect command center for campus services, academic status, and useful university information." />
      <section className="dashboard-metrics content-grid four">
        <StatCard label="Smart Card" value="Active" hint={user?.department} tone="success" />
        <StatCard label="Library" value="18 desks" hint="Available this hour" tone="info" />
        <StatCard label="E-Rickshaw" value="7 min" hint="Nearest campus shuttle" />
        <StatCard label="Opportunities" value={`${opportunities.length}`} hint="Open listings" tone="warning" />
      </section>
      <section className="dashboard-grid">
        <article className="data-card dashboard-attendance span-2">
          <div className="card-title">
            <CalendarCheck />
            <h2>Attendance Overview</h2>
          </div>
          {user?.role === "student" ? (
            <div className="attendance-widget">
              <strong>{attendance}%</strong>
              <p>{attendance >= 75 ? "Safe attendance standing" : "Subjects require attention"}</p>
              <span>Software Engineering and Database Systems need steady attendance to stay above the 75% threshold.</span>
            </div>
          ) : (
            <div className="attendance-widget">
              <strong>82.8%</strong>
              <p>{user?.department} department average today</p>
              <span>33 students below threshold across {todayTimeline.length} classes today.</span>
            </div>
          )}
          <Link className="inline-action" to="/attendance">
            Open Attendance <ExternalLink size={16} />
          </Link>
        </article>
        <ModuleCard icon={<CreditCard />} title="Smart Card" text="Digital card preview with QR placeholder, ID details, validity, and prototype disclaimer." to="/smart-card" />
        <ModuleCard icon={<Bike />} title="E-Rickshaw" text="Book campus shuttle rides with pickup, drop, live availability, and confirmation." to="/e-rickshaw" />
        <ModuleCard icon={<BookOpen />} title="Library Desks" text="Reserve a desk by reading hall, time slot, and available seat." to="/library-desks" />
        <ModuleCard icon={<Lightbulb />} title="Opportunities" text="Search internships, fellowships, workshops, challenges, and exchange programmes." to="/opportunities" />
        <article className="data-card span-2">
          <h2>Notices and campus information</h2>
          <div className="stack">
            {notices.map((notice) => (
              <p className="notice-row" key={notice}>{notice}</p>
            ))}
          </div>
        </article>
      </section>
    </Page>
  );
}

function ModuleCard({ icon, title, text, to }: { icon: React.ReactNode; title: string; text: string; to: string }) {
  return (
    <article className="data-card action-module">
      <div className="card-title">
        {icon}
        <h2>{title}</h2>
      </div>
      <p>{text}</p>
      <Link className="inline-action" to={to}>
        Open <ExternalLink size={16} />
      </Link>
    </article>
  );
}
