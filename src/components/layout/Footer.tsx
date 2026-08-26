import { Link } from "react-router-dom";
import { toast } from "sonner";

const moduleLinks = [
  ["E-Rickshaw Booking", "/e-rickshaw"],
  ["Library 24x7 Desks", "/library-desks"],
  ["Sample Notices", "/dashboard"],
  ["Academic Results", null],
  ["Attendance", "/attendance"],
  ["Student Opportunities", "/opportunities"],
  ["Grievance Tracker", null],
  ["Campus Directory", null],
  ["Campus Services", "/dashboard"],
];

const trustItems = ["Suggest a Feature", "Privacy Notice & Data Rights", "Consent Preferences"];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section>
          <div className="footer-brand">
            <span className="brand-mark">PU</span>
            <div>
              <strong>PU Connect</strong>
              <span>Prototype platform</span>
            </div>
          </div>
          <p>Frontend-only digital campus prototype connecting student services, attendance, identity, opportunities, and campus mobility into one coherent PU experience.</p>
          <button className="footer-chip" type="button">Vision campaign preview</button>
          <div className="footer-campaign-line">Ankit · President Candidate, ABVP · Ballot No. 2</div>
        </section>
        <section>
          <h2>Prototype Modules</h2>
          <div className="footer-list">
            {moduleLinks.map(([label, to]) =>
              to ? (
                <Link key={label} to={to}>
                  {label}
                </Link>
              ) : (
                <span key={label}>{label}</span>
              ),
            )}
          </div>
        </section>
        <section>
          <h2>Participation & Trust</h2>
          <div className="footer-list">
            {trustItems.map((item) => (
              <button key={item} type="button" onClick={() => toast.info(`${item} is represented as a frontend-only prototype action.`)}>
                {item}
              </button>
            ))}
          </div>
        </section>
      </div>
      <div className="footer-bottom">
        <span>Prototype disclaimer: no real university records, applications, bookings, or attendance are submitted.</span>
        <span>Built for the students of PU · 2026</span>
      </div>
    </footer>
  );
}
