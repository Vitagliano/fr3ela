"use client";
import { AuthProvider } from "@/context/Auth";
import { PWC } from "@/types/components";
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect } from "react";
import { Web3Provider } from "@/util/web3";

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
    <Web3Provider>
      <ThemeProvider enableSystem={true} attribute="class">
        <ThemeEventSwitcher>{children}</ThemeEventSwitcher>
      </ThemeProvider>
    </Web3Provider>
  </AuthProvider>
);

export default Providers;
