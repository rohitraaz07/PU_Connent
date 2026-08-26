import { Page, PageHeader } from "../components/common/Page";
import { useAuth } from "../context/AuthContext";

export function Profile() {
  const { user } = useAuth();
  if (!user) return null;
  const entries = user.role === "student"
    ? [["Role", "Student"], ["Department", user.department], ["Program", user.program], ["Semester", user.semester], ["Roll Number", user.rollNumber], ["University ID", user.universityId], ["Email", user.email]]
    : [["Role", "Faculty"], ["Department", user.department], ["Designation", user.designation], ["Employee ID", user.employeeId], ["Email", user.email]];
  return (
    <Page>
      <PageHeader eyebrow="Profile / demo identity" title={user.fullName} description="Local mock profile data used for protected routes and role-aware PU Connect views." />
      <section className="data-card profile-card">
        {entries.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
      </section>
    </Page>
  );
}
