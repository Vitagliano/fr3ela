"use client";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider enableSystem={true} attribute="class">
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Providers;
