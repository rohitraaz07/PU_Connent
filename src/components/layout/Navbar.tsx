// import { LogOut, Menu, UserCircle, X } from "lucide-react";
// import { useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const links = [
//   ["Home", "/home"],
//   ["E-Rickshaw", "/e-rickshaw"],
//   ["Library Desks", "/library-desks"],
//   ["Dashboard", "/dashboard"],
//   ["Smart Card", "/smart-card"],
//   ["Attendance", "/attendance"],
//   ["Opportunities", "/opportunities"],
// ];

// export function Navbar() {
//   const [open, setOpen] = useState(false);
//   const { user, logout, continueAsGuest } = useAuth();
//   const navigate = useNavigate();
//   const content = (
//     <>
//       {links.map(([label, to]) => (
//         <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
//           {label}
//         </NavLink>
//       ))}
//     </>
//   );

//   return (
//     <header className="navbar">
//       <button className="icon-button mobile-only" aria-label="Open navigation" onClick={() => setOpen(true)}>
//         <Menu size={20} />
//       </button>
//       <button className="brand" onClick={() => navigate(user ? "/dashboard" : "/home")}>
//         <span className="brand-mark">PU</span>
//         <span>PU Connect</span>
//       </button>
//       <nav className="desktop-nav" aria-label="Primary navigation">
//         {content}
//       </nav>
//       {user ? (
//         <>
//           <button className="profile-chip" onClick={() => navigate("/profile")}>
//             <UserCircle size={20} />
//             <span>{user.fullName}</span>
//           </button>
//           <button className="ghost-button signout-button" onClick={logout}>
//             <LogOut size={16} /> Sign out
//           </button>
//         </>
//       ) : (
//         <div className="public-nav-actions">
//           <Link className="ghost-button signout-button" to="/login">Sign In</Link>
//           <button className="primary-button nav-guest-button" onClick={() => { continueAsGuest(); navigate("/dashboard"); }}>Explore Prototype</button>
//         </div>
//       )}
//       {open && (
//         <div className="mobile-panel" role="dialog" aria-modal="true">
//           <div className="mobile-panel-head">
//             <strong>PU Connect</strong>
//             <button className="icon-button" aria-label="Close navigation" onClick={() => setOpen(false)}>
//               <X size={20} />
//             </button>
//           </div>
//           {content}
//         </div>
//       )}
//     </header>
//   );
// }

// import { LogOut, Menu, UserCircle, X } from "lucide-react";
// import { useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const links = [
//   ["Home", "/home"],
//   ["E-Rickshaw", "/e-rickshaw"],
//   ["Library Desks", "/library-desks"],
//   ["Dashboard", "/dashboard"],
//   ["Smart Card", "/smart-card"],
//   ["Attendance", "/attendance"],
//   ["Opportunities", "/opportunities"],

// ];

// export function Navbar() {
//   const [open, setOpen] = useState(false);
//   const { user, logout, continueAsGuest } = useAuth();
//   const navigate = useNavigate();

//   const content = (
//     <>
//       {links.map(([label, to]) => (
//         <NavLink
//           key={to}
//           to={to}
//           onClick={() => setOpen(false)}
//           className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
//         >
//           {label}
//         </NavLink>
//       ))}
//     </>
//   );

//   return (
//     <header className="navbar">
//       <button
//         className="icon-button mobile-only"
//         aria-label="Open navigation"
//         onClick={() => setOpen(true)}
//       >
//         <Menu size={20} />
//       </button>

//       <button
//         className="brand"
//         onClick={() => navigate(user ? "/dashboard" : "/home")}
//       >
//         <span className="brand-mark">PU</span>
//         <span>PU Connect</span>
//       </button>

//       <nav className="desktop-nav" aria-label="Primary navigation">
//         {content}
//       </nav>

//       {user ? (
//         <>
//           <button className="profile-chip" onClick={() => navigate("/profile")}>
//             <UserCircle size={20} />
//             <span>{user.fullName}</span>
//           </button>

//           <button className="ghost-button signout-button" onClick={logout}>
//             <LogOut size={16} /> Sign out
//           </button>
//         </>
//       ) : (
//         <div className="public-nav-actions">
//           <Link className="ghost-button signout-button" to="/login">
//             Sign In
//           </Link>

//           <button
//             className="primary-button nav-guest-button"
//             onClick={() => {
//               continueAsGuest();
//               navigate("/dashboard");
//             }}
//           >
//             Explore Prototype
//           </button>

//           <button
//             className="primary-button nav-guest-button sos-nav-button"
//             onClick={() => navigate("/sos")}
//           >
//             🚨 SOS
//           </button>
//         </div>
//       )}

//       {open && (
//         <div
//           className="mobile-panel"
//           role="dialog"
//           aria-modal="true"
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             width: "100vw",
//             height: "100vh",
//             background: "#ffffff",
//             backgroundColor: "#ffffff",
//             zIndex: 999999,
//             opacity: 1,
//           }}
//         >
//           <div className="mobile-panel-head">
//             <strong>PU Connect</strong>

//             <button
//               className="icon-button"
//               aria-label="Close navigation"
//               onClick={() => setOpen(false)}
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {content}
//         </div>
//       )}
//     </header>
//   );
// }

import { LogOut, Menu, UserCircle, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  ["Home", "/home"],
  ["E-Rickshaw", "/e-rickshaw"],
  ["Library Desks", "/library-desks"],
  ["Dashboard", "/dashboard"],
  ["Smart Card", "/smart-card"],
  ["Attendance", "/attendance"],
  ["Opportunities", "/opportunities"],
  ["Sos", "/sos"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout, continueAsGuest } = useAuth();
  const navigate = useNavigate();

  const content = (
    <>
      {links.map(([label, to]) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => setOpen(false)}
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          {label}
        </NavLink>
      ))}
    </>
  );

  return (
    <header className="navbar">
      <button
        className="icon-button mobile-only"
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
      >
        <Menu size={20} />
      </button>

      <button
        className="brand"
        onClick={() => navigate(user ? "/dashboard" : "/home")}
      >
        <span className="brand-mark">PU</span>
        <span>PU Connect</span>
      </button>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {content}
      </nav>

      {user ? (
        <>
          <button className="profile-chip" onClick={() => navigate("/profile")}>
            <UserCircle size={20} />
            <span>{user.fullName}</span>
          </button>

          <button className="ghost-button signout-button" onClick={logout}>
            <LogOut size={16} /> Sign out
          </button>
        </>
      ) : (
        <>
          <div className="public-nav-actions">
            <Link className="ghost-button signout-button" to="/login">
              Sign In
            </Link>

            <button
              className="primary-button nav-guest-button"
              onClick={() => {
                continueAsGuest();
                navigate("/dashboard");
              }}
            >
              Explore Prototype
            </button>
          </div>
        </>
      )}

      {open && (
        <div
          className="mobile-panel"
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            background: "#ffffff",
            backgroundColor: "#ffffff",
            zIndex: 999999,
            opacity: 1,
          }}
        >
          <div className="mobile-panel-head">
            <strong>PU Connect</strong>

            <button
              className="icon-button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {content}
        </div>
      )}
    </header>
  );
}
