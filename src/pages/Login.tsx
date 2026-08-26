import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../types";

export function Login() {
  const [identifier, setIdentifier] = useState(localStorage.getItem("pu-connect-remember") ?? "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [remember, setRemember] = useState(true);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { login, continueAsGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (!identifier || !password) {
      setError("Enter your university identifier and password to continue.");
      return;
    }
    if (login(identifier, password, role, remember)) navigate(destination);
    else setError("We could not verify those credentials. Check the role and identifier.");
  };

  return (
    <main className="auth-page">
      <section className="auth-hero">
        <span className="brand-mark">PU</span>
        <h1>PU Connect</h1>
        <p>Interactive Student Platform Prototype for Panjab University services, smart card, bookings, opportunities, and attendance.</p>
      </section>
      <form className="auth-card" onSubmit={submit}>
        <span className="eyebrow">Secure prototype access</span>
        <h2>Sign in</h2>
        <label>
          Email / University ID / Employee ID
          <input value={identifier} onChange={(event) => setIdentifier(event.target.value)} placeholder="student@pu.ac.in" />
        </label>
        <label>
          Password
          <div className="password-field">
            <input type={show ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password@123" />
            <button type="button" className="icon-button" aria-label="Show password" onClick={() => setShow((value) => !value)}>
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>
        <div className="segmented">
          {(["student", "faculty"] as Role[]).map((item) => (
            <button type="button" className={role === item ? "selected" : ""} onClick={() => setRole(item)} key={item}>
              {item === "student" ? "Student" : "Faculty"}
            </button>
          ))}
        </div>
        <div className="form-row">
          <label className="check-row">
            <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
            Remember Me
          </label>
          <button type="button" className="link-button" onClick={() => toast.info("Password reset is mocked for this frontend prototype.")}>
            Forgot Password
          </button>
        </div>
        {error && <div className="form-error">{error}</div>}
        <button className="primary-button" type="submit">
          Login
        </button>
        <button
          className="secondary-button"
          type="button"
          onClick={() => {
            continueAsGuest();
            navigate("/dashboard");
          }}
        >
          Continue as Guest
        </button>
        <p className="auth-note">
          New to PU Connect? <Link to="/register">Create Account</Link>
        </p>
        <p className="demo-note">Demo: student@pu.ac.in / faculty@pu.ac.in with Password@123</p>
      </form>
    </main>
  );
}
