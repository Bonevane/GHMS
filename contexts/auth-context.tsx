"use client";

import { createContext, useContext, useState } from "react";
import { LoginUser } from "@/app/types";
import { useRouter } from "next/navigation";
import supabase from "@/config/supabaseClient";
import { ReactNode } from "react";

interface AuthContextType {
  user: LoginUser | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginUser | null>(null);
  const router = useRouter(); // Use router for navigation

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from("employee")
        .select("name, email, password, role")
        .match({ email, password, role });

      if (error || !data || data.length === 0) {
        console.error("Login failed", error);
        return false;
      }

      setUser(data[0]); // Set the authenticated user
      router.push("/dashboard"); // Navigate to the dashboard after successful login
      return true;
    } catch (err) {
      console.error("Unexpected error:", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null); // Clear the user state
    router.push("/auth/login"); // Redirect to the login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const router = useRouter(); // Use router for navigation
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
