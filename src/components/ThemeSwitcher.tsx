"use client";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div>
      {currentTheme === "dark" ? (
        <SunIcon
          className="h-6 w-6 cursor-pointer text-yellow-400"
          onClick={() => {
            setTheme("light");
          }}
        />
      ) : (
        <MoonIcon
          className="h-6 w-6 cursor-pointer text-slate-700"
          onClick={() => {
            setTheme("dark");
          }}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
