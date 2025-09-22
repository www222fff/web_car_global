import { createContext, useContext, useMemo, useState } from "react";
import { api, UserDTO } from "@/lib/api";

interface AuthContextValue {
  user: UserDTO | null;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDTO | null>(null);

  const login = async (username: string, password: string) => {
    const u = await api.login(username, password);
    setUser(u);
  };

  const register = async (username: string, password: string) => {
    const u = await api.register(username, password);
    setUser(u);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAdmin: user?.role === "admin", login, register, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth 必须在 AuthProvider 内使用");
  return ctx;
}
