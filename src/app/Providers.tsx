"use client";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/Auth";
import { PWC } from "@/types/components";

const Providers = ({ children }: PWC) => (
  <AuthProvider>
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  </AuthProvider>
);

export default Providers;
