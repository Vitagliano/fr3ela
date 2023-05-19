"use client";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/Auth";
import { PWC } from "@/types/components";

ThemeProvider.displayName = "ThemeProvider";

const Providers = ({ children }: PWC) => {
  return (
    <AuthProvider>
      <ThemeProvider enableSystem={true} attribute="class">
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Providers;
