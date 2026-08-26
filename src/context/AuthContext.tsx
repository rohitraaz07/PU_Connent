import { createContext, useContext, useMemo, useState } from "react";
import { toast } from "sonner";
import type { AppUser, FacultyUser, Role, StudentUser } from "../types";
import { readStorage, uid, writeStorage } from "../utils/storage";

const USERS_KEY = "pu-connect-users";
const SESSION_KEY = "pu-connect-session";

type RegisterPayload =
  | Omit<StudentUser, "id" | "role"> & { role: "student" }
  | Omit<FacultyUser, "id" | "role"> & { role: "faculty" };

interface AuthContextValue {
  user: AppUser | null;
  users: AppUser[];
  login: (identifier: string, password: string, role: Role, remember: boolean) => boolean;
  register: (payload: RegisterPayload) => void;
  continueAsGuest: () => void;
  logout: () => void;
  updateUser: (user: AppUser) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const demoUsers: AppUser[] = [
  {
    id: "demo-student",
    role: "student",
    fullName: "Aarav Mehta",
    rollNumber: "PU231001",
    universityId: "PU-ID-10014",
    email: "student@pu.ac.in",
    department: "UIET",
    program: "B.E. Computer Science & Engineering",
    semester: "5",
    year: "3",
    phone: "9876543210",
    password: "Password@123",
  },
  {
    id: "demo-faculty",
    role: "faculty",
    fullName: "Dr. Neelam Verma",
    employeeId: "FAC-UIET-204",
    email: "faculty@pu.ac.in",
    department: "UIET",
    designation: "Associate Professor",
    phone: "9876501234",
    password: "Password@123",
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const seededUsers = readStorage<AppUser[]>(USERS_KEY, demoUsers);
  const [users, setUsers] = useState<AppUser[]>(seededUsers);
  const [user, setUser] = useState<AppUser | null>(() => {
    const sessionId = readStorage<string | null>(SESSION_KEY, null);
    return seededUsers.find((candidate) => candidate.id === sessionId) ?? null;
  });

  const persistUsers = (nextUsers: AppUser[]) => {
    setUsers(nextUsers);
    writeStorage(USERS_KEY, nextUsers);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      users,
      login(identifier, password, role, remember) {
        const normalized = identifier.toLowerCase().trim();
        const found = users.find((candidate) => {
          const ids =
            candidate.role === "student"
              ? [candidate.email, candidate.universityId, candidate.rollNumber]
              : [candidate.email, candidate.employeeId];
          return candidate.role === role && ids.map((item) => item.toLowerCase()).includes(normalized) && candidate.password === password;
        });
        if (!found) return false;
        setUser(found);
        writeStorage(SESSION_KEY, found.id);
        if (remember) localStorage.setItem("pu-connect-remember", normalized);
        toast.success(`Welcome back, ${found.fullName}`);
        return true;
      },
      register(payload) {
        const nextUser = { ...payload, id: uid(payload.role) } as AppUser;
        const nextUsers = [...users, nextUser];
        persistUsers(nextUsers);
        setUser(nextUser);
        writeStorage(SESSION_KEY, nextUser.id);
        toast.success("Registration complete. Your PU Connect session is ready.");
      },
      continueAsGuest() {
        const guestUser: AppUser = {
          id: "guest-student",
          role: "student",
          fullName: "Guest Student",
          rollNumber: "PU-GUEST",
          universityId: "PU-DEMO-2026",
          email: "guest@puconnect.demo",
          department: "UIET",
          program: "B.E. Computer Science & Engineering",
          semester: "5",
          year: "3",
          phone: "0000000000",
          password: "",
        };
        const nextUsers = users.some((candidate) => candidate.id === guestUser.id) ? users.map((candidate) => (candidate.id === guestUser.id ? guestUser : candidate)) : [...users, guestUser];
        persistUsers(nextUsers);
        setUser(guestUser);
        writeStorage(SESSION_KEY, guestUser.id);
        toast.success("Guest demo session started.");
      },
      logout() {
        setUser(null);
        localStorage.removeItem(SESSION_KEY);
        toast("Signed out of PU Connect");
      },
      updateUser(nextUser) {
        const nextUsers = users.map((candidate) => (candidate.id === nextUser.id ? nextUser : candidate));
        persistUsers(nextUsers);
        setUser(nextUser);
      },
    }),
    [user, users],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
};
