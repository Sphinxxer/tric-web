"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getDemoUser,
  loginDemoUser,
  logoutDemoUser,
  signupDemoParent,
} from "@/lib/auth/demoAuth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getDemoUser());
    setLoading(false);

    function syncSession(event) {
      if (event.key === "tric_demo_session") {
        setUser(getDemoUser());
      }
    }

    window.addEventListener("storage", syncSession);
    return () => window.removeEventListener("storage", syncSession);
  }, []);

  const login = useCallback((role, username, password) => {
    const result = loginDemoUser(role, username, password);
    if (result.ok) {
      setUser(result.user);
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    logoutDemoUser();
    setUser(null);
  }, []);

  const signupParent = useCallback((input) => {
    const result = signupDemoParent(input);
    if (result.ok) {
      setUser(result.user);
    }
    return result;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isParent: user?.role === "parent",
      isAdmin: user?.role === "admin",
      login,
      signupParent,
      logout,
    }),
    [loading, login, logout, signupParent, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
