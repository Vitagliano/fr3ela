"use client";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { Button } from "./Button";

export const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div>
      {currentTheme === "dark" ? (
        <Button
          onClick={() => {
            setTheme("light");
          }}
          className="flex w-full items-center gap-3 font-semibold !text-gray-600 hover:!text-gray-900 py-3 lg:hover:!bg-gray-100 lg:p-3 !bg-transparent !rounded-none !rounded-b-md !shadow-none"
        >
          <SunIcon className="h-6 w-6 cursor-pointer text-slate-700" /> Change
          theme
        </Button>
      ) : (
        <Button
          onClick={() => {
            setTheme("dark");
          }}
          className="flex w-full items-center gap-3 font-semibold !text-gray-600 hover:!text-gray-900 py-3 lg:hover:!bg-gray-100 lg:p-3 !bg-transparent !rounded-none !rounded-b-md !shadow-none"
        >
          <MoonIcon className="h-6 w-6 cursor-pointer text-slate-700" />
          Change theme
        </Button>
      )}
    </div>
  );
};

export default ThemeSwitcher;
