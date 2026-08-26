import { Copy, Download, RefreshCcw, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Page, PageHeader } from "../components/common/Page";
import { StatusBadge } from "../components/common/UI";
import { useAuth } from "../context/AuthContext";

export function SmartCardPage() {
  const { user } = useAuth();
  const [flipped, setFlipped] = useState(false);
  const id = user?.role === "student" ? user.universityId : user?.employeeId;
  return (
    <Page>
      <PageHeader eyebrow="Smart Card" title="Digital campus identity" description="Frontend-only smart card preview with verified profile details, QR placeholder, validity, and prototype disclaimer." />
      <section className="smart-layout">
        <article className={`smart-card ${flipped ? "flipped" : ""}`}>
          <div className="smart-card-top">
            <span className="brand-mark">PU</span>
            <StatusBadge label="Active" tone="success" />
          </div>
          {!flipped ? (
            <>
              <div className="avatar">{user?.fullName.slice(0, 2).toUpperCase()}</div>
              <h2>{user?.fullName}</h2>
              <p>{user?.role === "student" ? "Student" : "Faculty"} · {user?.department}</p>
              <dl>
                <dt>{user?.role === "student" ? "Program" : "Designation"}</dt>
                <dd>{user?.role === "student" ? user.program : user?.designation}</dd>
                <dt>University ID</dt>
                <dd>{id}</dd>
                <dt>Validity</dt>
                <dd>Academic Year 2026-27</dd>
              </dl>
            </>
          ) : (
            <div className="qr-block">
              <div className="qr-placeholder" />
              <strong>Card No. PU-2026-4418</strong>
              <p>Prototype credential for institutional presentation only.</p>
            </div>
          )}
        </article>
        <div className="data-card control-card">
          <button className="secondary-button" onClick={() => setFlipped((value) => !value)}><RefreshCcw size={18} /> Flip</button>
          <button className="secondary-button" onClick={() => { navigator.clipboard?.writeText(id ?? ""); toast.success("ID copied"); }}><Copy size={18} /> Copy ID</button>
          <button className="secondary-button" onClick={() => toast.success("Mock card download prepared.")}><Download size={18} /> Download mock card</button>
          <button className="secondary-button" onClick={() => toast.info("Share action simulated for this prototype.")}><Share2 size={18} /> Share</button>
          <p className="demo-note">This smart card is a frontend prototype and not an official university credential.</p>
        </div>
      </section>
    </Page>
  );
}
