import { Inter } from "next/font/google";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const inter = Inter({ subsets: ["latin"] });

export default function SignUp() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Sign Up Page <ThemeSwitcher />
    </main>
  );
}
