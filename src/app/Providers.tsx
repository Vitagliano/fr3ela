"use client";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/Auth";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  </AuthProvider>
);

export default Providers;
