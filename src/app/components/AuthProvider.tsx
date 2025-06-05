"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

type DecodedToken = {
  sub: string; // email
  role: string;
  exp: number;
  userId: number;
};

type AuthUser = { email: string; role: string; id: number };

type AuthContextType = {
  user: AuthUser | null;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        logout();
        return;
      }

      setUser({ email: decoded.sub, role: decoded.role, id: decoded.userId });
      const timeout = setTimeout(logout, (decoded.exp - now) * 1000);
      return () => clearTimeout(timeout);
    } catch (err) {
      console.error("Invalid token", err);
      logout();
    }
    setLoading(false);
  }, []);

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, logout, isAuthenticated: !!user, loading }}
    >
      {children}{" "}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
