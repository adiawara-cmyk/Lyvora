"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { authApi } from "./api";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "PATIENT" | "DOCTOR" | "ADMIN" | "ORG";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("lyvora_token");
    const savedRefresh = localStorage.getItem("lyvora_refresh");
    if (savedToken) {
      setToken(savedToken);
      authApi
        .me(savedToken)
        .then((u) => setUser(u))
        .catch(() => {
          if (savedRefresh) {
            authApi
              .refresh(savedRefresh)
              .then((res) => {
                localStorage.setItem("lyvora_token", res.accessToken);
                localStorage.setItem("lyvora_refresh", res.refreshToken);
                setToken(res.accessToken);
                return authApi.me(res.accessToken);
              })
              .then((u) => setUser(u))
              .catch(() => logout());
          } else {
            logout();
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    localStorage.setItem("lyvora_token", res.accessToken);
    localStorage.setItem("lyvora_refresh", res.refreshToken);
    setToken(res.accessToken);
    setUser(res.user);
  }, []);

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      role: string;
    }) => {
      const res = await authApi.register(data);
      localStorage.setItem("lyvora_token", res.accessToken);
      localStorage.setItem("lyvora_refresh", res.refreshToken);
      setToken(res.accessToken);
      setUser(res.user);
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("lyvora_token");
    localStorage.removeItem("lyvora_refresh");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
