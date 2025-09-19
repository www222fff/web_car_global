import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  User,
  authenticate,
  bootstrapDemo,
  getCurrentUser,
  registerUser as storageRegister,
  setCurrentUser,
} from "@/lib/storage";

interface AuthContextValue {
  user: User | null;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    bootstrapDemo();
    const u = getCurrentUser();
    if (u) setUser(u);
  }, []);

  const login = async (username: string, password: string) => {
    const u = authenticate(username, password);
    if (!u) throw new Error("用户名或密码不正确");
    setCurrentUser(u.id);
    setUser(u);
  };

  const register = async (username: string, password: string) => {
    const u = storageRegister(username, password);
    setCurrentUser(u.id);
    setUser(u);
  };

  const logout = () => {
    setCurrentUser(null);
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
