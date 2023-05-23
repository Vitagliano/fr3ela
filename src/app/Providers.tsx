"use client";
import { AuthProvider } from "@/context/Auth";
import { PWC } from "@/types/components";
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect } from "react";

const ThemeEventSwitcher = ({ children }: PWC) => {
  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      console.log(e)
      if (e.ctrlKey && e.code === "KeyQ")
        setTheme(currentTheme === "dark" ? "light" : "dark");
    };

    document.addEventListener("keypress", listener);

    return () => document.removeEventListener("keypress", listener);
  }, [setTheme, currentTheme]);

  return <>{children}</>;
};

const Providers = ({ children }: PWC) => (
  <AuthProvider>
    <ThemeProvider enableSystem={true} attribute="class">
      <ThemeEventSwitcher>{children}</ThemeEventSwitcher>
    </ThemeProvider>
  </AuthProvider>
);

export default Providers;
