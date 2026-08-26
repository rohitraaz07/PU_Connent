import { Eye, EyeOff } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../types";

const requiredStudent = ["fullName", "rollNumber", "universityId", "email", "department", "program", "semester", "year", "phone", "password", "confirmPassword"];
const requiredFaculty = ["fullName", "employeeId", "email", "department", "designation", "phone", "password", "confirmPassword"];

export function Register() {
  const [role, setRole] = useState<Role>("student");
  const [form, setForm] = useState<Record<string, string>>({ department: "UIET", program: "B.E. Computer Science & Engineering", semester: "5", year: "3" });
  const [ack, setAck] = useState(false);
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, continueAsGuest } = useAuth();
  const navigate = useNavigate();
  const strength = useMemo(() => Math.min(100, (form.password?.length ?? 0) * 12 + (/[A-Z]/.test(form.password ?? "") ? 15 : 0) + (/\d/.test(form.password ?? "") ? 15 : 0)), [form.password]);
  const fields = role === "student" ? requiredStudent : requiredFaculty;

  const change = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const invalid = (key: string) => submitted && !form[key];

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (fields.some((field) => !form[field]) || !ack || form.password !== form.confirmPassword || strength < 45) return;
    if (role === "student") {
      register({
        role,
        fullName: form.fullName,
        rollNumber: form.rollNumber,
        universityId: form.universityId,
        email: form.email,
        department: form.department,
        program: form.program,
        semester: form.semester,
        year: form.year,
        phone: form.phone,
        password: form.password,
      });
    } else {
      register({
        role,
        fullName: form.fullName,
        employeeId: form.employeeId,
        email: form.email,
        department: form.department,
        designation: form.designation,
        phone: form.phone,
        password: form.password,
      });
    }
    navigate("/dashboard");
  };

  return (
    <main className="auth-page register">
      <section className="auth-hero">
        <span className="brand-mark">PU</span>
        <h1>Register for PU Connect</h1>
        <p>Create a frontend-only Student or Faculty identity to access protected prototype routes and role-aware dashboards.</p>
      </section>
      <form className="auth-card wide" onSubmit={submit}>
        <span className="eyebrow">Register as</span>
        <div className="segmented">
          <button type="button" className={role === "student" ? "selected" : ""} onClick={() => setRole("student")}>
            Student
          </button>
          <button type="button" className={role === "faculty" ? "selected" : ""} onClick={() => setRole("faculty")}>
            Faculty
          </button>
        </div>
        <fieldset className="form-section">
          <legend>Personal Details</legend>
          <div className="form-grid">
            <Field label="Full Name" value={form.fullName} onChange={(v) => change("fullName", v)} error={invalid("fullName")} />
            <Field label={role === "student" ? "Email" : "University Email"} value={form.email} onChange={(v) => change("email", v)} error={invalid("email")} />
            <Field label="Phone Number" value={form.phone} onChange={(v) => change("phone", v)} error={invalid("phone")} />
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Academic / Department Details</legend>
          <div className="form-grid">
            {role === "student" ? (
              <>
              <Field label="University Roll Number" value={form.rollNumber} onChange={(v) => change("rollNumber", v)} error={invalid("rollNumber")} />
              <Field label="University ID" value={form.universityId} onChange={(v) => change("universityId", v)} error={invalid("universityId")} />
              <Field label="Program / Course" value={form.program} onChange={(v) => change("program", v)} error={invalid("program")} />
              <Field label="Semester" value={form.semester} onChange={(v) => change("semester", v)} error={invalid("semester")} />
              <Field label="Year" value={form.year} onChange={(v) => change("year", v)} error={invalid("year")} />
              </>
            ) : (
              <>
              <Field label="Employee ID" value={form.employeeId} onChange={(v) => change("employeeId", v)} error={invalid("employeeId")} />
              <Field label="Designation" value={form.designation} onChange={(v) => change("designation", v)} error={invalid("designation")} />
              </>
            )}
            <Field label="Department" value={form.department} onChange={(v) => change("department", v)} error={invalid("department")} />
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Account Security</legend>
          <div className="form-grid">
            <label>
              Password
              <div className="password-field">
                <input className={invalid("password") ? "invalid" : ""} type={show ? "text" : "password"} value={form.password ?? ""} onChange={(event) => change("password", event.target.value)} />
                <button type="button" className="icon-button" onClick={() => setShow((value) => !value)} aria-label="Show password">
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <span className="strength"><i style={{ width: `${strength}%` }} /></span>
            </label>
            <Field label="Confirm Password" type="password" value={form.confirmPassword} onChange={(v) => change("confirmPassword", v)} error={submitted && form.password !== form.confirmPassword} />
          </div>
        </fieldset>
        <label className="check-row">
          <input type="checkbox" checked={ack} onChange={(event) => setAck(event.target.checked)} /> I acknowledge this is a PU Connect frontend prototype.
        </label>
        {submitted && (!ack || form.password !== form.confirmPassword || strength < 45) && <div className="form-error">Complete required fields, strengthen password, confirm it, and accept the prototype acknowledgement.</div>}
        <button className="primary-button" type="submit">
          Create Account
        </button>
        <button
          className="secondary-button"
          type="button"
          onClick={() => {
            continueAsGuest();
            navigate("/dashboard");
          }}
        >
          Explore Prototype without Account
        </button>
      </form>
    </main>
  );
}

function Field({ label, value = "", onChange, error, type = "text" }: { label: string; value?: string; onChange: (value: string) => void; error?: boolean; type?: string }) {
  return (
    <label>
      {label}
      <input className={error ? "invalid" : ""} type={type} value={value} onChange={(event) => onChange(event.target.value)} />
      {error && <small className="field-error">Required</small>}
    </label>
  );
}
