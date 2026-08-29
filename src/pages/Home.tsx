// // import { ArrowRight, BadgeCheck, Bell, CreditCard, GraduationCap } from "lucide-react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { Page } from "../components/common/Page";
// // import { useAuth } from "../context/AuthContext";
// // import { notices } from "../data/mockData";

// // export function Home() {
// //   const navigate = useNavigate();
// //   const { user, continueAsGuest } = useAuth();

// //   const explore = () => {
// //     if (!user) continueAsGuest();
// //     navigate("/dashboard");
// //   };

// //   return (
// //     <Page>
// //       <section className="hero campaign-hero landing-hero">
// //         <div className="hero-copy">
// //           <span className="eyebrow">Panjab University · PU Connect Prototype</span>
// //           <div className="candidate-identity compact">
// //             <strong>ANKIT</strong>
// //             <span>President Candidate, ABVP</span>
// //             <em>Ballot No. 2</em>
// //           </div>
// //           <h1>One connected student experience for PU.</h1>
// //           <p>PU Connect brings campus shuttle booking, library desks, smart card access, opportunities, notices, grievance previews, and academic services into one polished student platform prototype.</p>
// //           <div className="hero-actions">
// //             <button className="primary-button" onClick={explore}>
// //               Explore the Prototype <ArrowRight size={18} />
// //             </button>
// //             <Link className="secondary-button" to="/login">
// //               Sign In
// //             </Link>
// //           </div>
// //         </div>
// //         <div className="landing-visual-stack">
// //           <figure className="campaign-visual poster-visual">
// //             <img src="/campaign/ankit-poster.jpg" alt="Ankit, President Candidate ABVP, Ballot No. 2 campaign visual" />
// //           </figure>
// //           <Link className="landing-register-link" to="/register">
// //             Register for PU Connect
// //           </Link>
// //         </div>
// //       </section>

// //       <section className="commitment-section">
// //         <span className="eyebrow">Prototype Commitment</span>
// //         <p>This app is currently a prototype. Once we are elected to the Council, we will work to officially launch it and make it accessible to the students.</p>
// //         <p>We don’t just make promises, we believe in delivering results. We believe in action, accountability, and turning ideas into meaningful solutions.</p>
// //       </section>

// //       <section className="hero-panel module-preview-panel">
// //         <div className="campus-card">
// //           <CreditCard />
// //           <strong>Smart Card</strong>
// //           <span>Verified digital identity and campus access status.</span>
// //         </div>
// //         <div className="campus-card">
// //           <Bell />
// //           <strong>Examination deadline</strong>
// //           <span>Semester form correction window preview.</span>
// //         </div>
// //         <div className="campus-card">
// //           <BadgeCheck />
// //           <strong>Grievance lifecycle</strong>
// //           <span>Request moves from intake to department review.</span>
// //         </div>
// //         <div className="campus-card">
// //           <GraduationCap />
// //           <strong>Campus information</strong>
// //           <span>Prototype messaging for students and faculty.</span>
// //         </div>
// //       </section>

// //       <section className="content-grid three">
// //         {notices.map((notice) => (
// //           <article className="data-card" key={notice}>
// //             <span className="eyebrow">Preview</span>
// //             <p>{notice}</p>
// //           </article>
// //         ))}
// //       </section>
// //     </Page>
// //   );
// // }

// import {
//   ArrowRight,
//   BadgeCheck,
//   Bell,
//   CreditCard,
//   GraduationCap,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Page } from "../components/common/Page";
// import { useAuth } from "../context/AuthContext";
// import { notices } from "../data/mockData";

// export function Home() {
//   const navigate = useNavigate();
//   const { user, continueAsGuest } = useAuth();

//   const [visitorCount, setVisitorCount] = useState<number | null>(null);

//   useEffect(() => {
//     const getVisitorCount = async () => {
//       try {
//         const response = await fetch("/api/visitors");

//         if (!response.ok) {
//           throw new Error("Failed to get visitor count");
//         }

//         const data = await response.json();

//         setVisitorCount(data.visitors);
//       } catch (error) {
//         console.error("Visitor counter error:", error);
//       }
//     };

//     getVisitorCount();
//   }, []);

//   const explore = () => {
//     if (!user) continueAsGuest();
//     navigate("/dashboard");
//   };

//   return (
//     <Page>
//       <section className="hero campaign-hero landing-hero">
//         <div className="hero-copy">
//           <span className="eyebrow">
//             Panjab University · PU Connect Prototype
//           </span>

//           <div className="candidate-identity compact">
//             <strong>ANKIT</strong>
//             <span>President Candidate, ABVP</span>
//             <em>Ballot No. 2</em>
//           </div>

//           <h1>One connected student experience for PU.</h1>

//           <p>
//             PU Connect brings campus shuttle booking, library desks, smart card
//             access, opportunities, notices, grievance previews, and academic
//             services into one polished student platform prototype.
//           </p>

//           <div className="hero-actions">
//             <button className="primary-button" onClick={explore}>
//               Explore the Prototype <ArrowRight size={18} />
//             </button>

//             <Link className="secondary-button" to="/login">
//               Sign In
//             </Link>
//           </div>
//         </div>

//         <div className="landing-visual-stack">
//           <figure className="campaign-visual poster-visual">
//             <img
//               src="/campaign/ankit-poster.jpg"
//               alt="Ankit, President Candidate ABVP, Ballot No. 2 campaign visual"
//             />
//           </figure>

//           <Link className="landing-register-link" to="/register">
//             Register for PU Connect
//           </Link>
//         </div>
//       </section>
//       <section className="visitor-counter">
//         <div className="visitor-counter-icon">👥</div>

//         <div className="visitor-counter-content">
//           <span className="visitor-counter-label">PU CONNECT COMMUNITY</span>

//           <strong>
//             {visitorCount !== null
//               ? (visitorCount + 2700).toLocaleString()
//               : "..."}
//           </strong>

//           <span className="visitor-counter-text">
//             people have visited PU Connect
//           </span>
//         </div>

//         <div className="visitor-live">
//           <span className="visitor-live-dot"></span>
//           Live
//         </div>
//       </section>

//       <section className="commitment-section">
//         <span className="eyebrow">Prototype Commitment</span>

//         <p>
//           This app is currently a prototype. Once we are elected to the Council,
//           we will work to officially launch it and make it accessible to the
//           students.
//         </p>

//         <p>
//           We don’t just make promises, we believe in delivering results. We
//           believe in action, accountability, and turning ideas into meaningful
//           solutions.
//         </p>
//       </section>

//       <section className="hero-panel module-preview-panel">
//         <div className="campus-card">
//           <CreditCard />
//           <strong>Smart Card</strong>
//           <span>Verified digital identity and campus access status.</span>
//         </div>

//         <div className="campus-card">
//           <Bell />
//           <strong>Examination deadline</strong>
//           <span>Semester form correction window preview.</span>
//         </div>

//         <div className="campus-card">
//           <BadgeCheck />
//           <strong>Grievance lifecycle</strong>
//           <span>Request moves from intake to department review.</span>
//         </div>

//         <div className="campus-card">
//           <GraduationCap />
//           <strong>Campus information</strong>
//           <span>Prototype messaging for students and faculty.</span>
//         </div>
//       </section>

//       <section className="content-grid three">
//         {notices.map((notice) => (
//           <article className="data-card" key={notice}>
//             <span className="eyebrow">Preview</span>
//             <p>{notice}</p>
//           </article>
//         ))}
//       </section>
//     </Page>
//   );
// }

import {
  ArrowRight,
  BadgeCheck,
  Bell,
  CreditCard,
  GraduationCap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Page } from "../components/common/Page";
import { useAuth } from "../context/AuthContext";
import { notices } from "../data/mockData";

export function Home() {
  const navigate = useNavigate();
  const { user, continueAsGuest } = useAuth();

  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    const getVisitorCount = async () => {
      try {
        const response = await fetch("/api/visitors");

        if (!response.ok) {
          throw new Error("Failed to get visitor count");
        }

        const data = await response.json();

        setVisitorCount(data.visitors);
      } catch (error) {
        console.error("Visitor counter error:", error);
      }
    };

    getVisitorCount();
  }, []);

  const explore = () => {
    if (!user) continueAsGuest();
    navigate("/dashboard");
  };

  return (
    <Page>
      <section className="hero campaign-hero landing-hero">
        <div className="hero-copy">
          <span className="eyebrow">
            Panjab University · PU Connect Prototype
          </span>

          <div className="candidate-identity compact">
            <strong>ANKIT</strong>
            <span>President Candidate, ABVP</span>
            <em>Ballot No. 2</em>
          </div>

          <h1>One connected student experience for PU.</h1>

          <p>
            PU Connect brings campus shuttle booking, library desks, smart card
            access, opportunities, notices, grievance previews, and academic
            services into one polished student platform prototype.
          </p>

          <div className="hero-actions">

            {/* SOS BUTTON */}
            <Link className="home-sos-button" to="/sos">
              🚨 SOS
            </Link>

            {/* EXPLORE BUTTON */}
            <button className="primary-button" onClick={explore}>
              Explore the Prototype <ArrowRight size={18} />
            </button>

            {/* SIGN IN */}
            <Link className="secondary-button" to="/login">
              Sign In
            </Link>

          </div>
        </div>

        <div className="landing-visual-stack">
          <figure className="campaign-visual poster-visual">
            <img
              src="/campaign/ankit-poster.jpg"
              alt="Ankit, President Candidate ABVP, Ballot No. 2 campaign visual"
            />
          </figure>

          <Link className="landing-register-link" to="/register">
            Register for PU Connect
          </Link>
        </div>
      </section>

      <section className="visitor-counter">
        <div className="visitor-counter-icon">👥</div>

        <div className="visitor-counter-content">
          <span className="visitor-counter-label">
            PU CONNECT COMMUNITY
          </span>

          <strong>
            {visitorCount !== null
              ? (visitorCount + 2700).toLocaleString()
              : "..."}
          </strong>

          <span className="visitor-counter-text">
            people have visited PU Connect
          </span>
        </div>

        <div className="visitor-live">
          <span className="visitor-live-dot"></span>
          Live
        </div>
      </section>

      <section className="commitment-section">
        <span className="eyebrow">Prototype Commitment</span>

        <p>
          This app is currently a prototype. Once we are elected to the Council,
          we will work to officially launch it and make it accessible to the
          students.
        </p>

        <p>
          We don’t just make promises, we believe in delivering results. We
          believe in action, accountability, and turning ideas into meaningful
          solutions.
        </p>
      </section>

      <section className="hero-panel module-preview-panel">
        <div className="campus-card">
          <CreditCard />
          <strong>Smart Card</strong>
          <span>Verified digital identity and campus access status.</span>
        </div>

        <div className="campus-card">
          <Bell />
          <strong>Examination deadline</strong>
          <span>Semester form correction window preview.</span>
        </div>

        <div className="campus-card">
          <BadgeCheck />
          <strong>Grievance lifecycle</strong>
          <span>Request moves from intake to department review.</span>
        </div>

        <div className="campus-card">
          <GraduationCap />
          <strong>Campus information</strong>
          <span>Prototype messaging for students and faculty.</span>
        </div>
      </section>

      <section className="content-grid three">
        {notices.map((notice) => (
          <article className="data-card" key={notice}>
            <span className="eyebrow">Preview</span>
            <p>{notice}</p>
          </article>
        ))}
      </section>
    </Page>
  );
}