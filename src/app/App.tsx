import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppShell } from "../components/layout/AppShell";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ERickshaw } from "../pages/ERickshaw";
import { LibraryDesks } from "../pages/LibraryDesks";
import { SmartCardPage } from "../pages/SmartCardPage";
import { Opportunities } from "../pages/Opportunities";
import { Attendance } from "../pages/Attendance";
import { Profile } from "../pages/Profile";
import SOS from "../pages/Sos";
export function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={
            <div className="app-shell">
              <Navbar />
              <main className="page-container">
                <Home />
              </main>
              <Footer />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/sos"
          element={
            <div className="app-shell">
              <Navbar />
              <main className="page-container">
                <SOS />
              </main>
              <Footer />
            </div>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/e-rickshaw" element={<ERickshaw />} />
          <Route path="/library-desks" element={<LibraryDesks />} />
          <Route path="/smart-card" element={<SmartCardPage />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
