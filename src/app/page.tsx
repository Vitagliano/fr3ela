"use client";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Link from "next/link";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { useAuth, useAuthActions } from "@/context/Auth";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { user } = useAuth();
  const { signOut } = useAuthActions();

  return (
    <main className="flex min-h-screen items-center flex-col justify-center gap-8 p-24">
      <div className="flex items-center justify-center gap-8 ">
        <ThemeSwitcher />

        <Link href="/signin">Sign In</Link>
        <Link href="/signup">Sign Up</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      {user ? <h1>Olá {user?.uid}</h1> : <h1>Olá visitante</h1>}
      {user ? <Button onClick={() => signOut()}>Sign Out</Button> : null}
    </main>
  );
}
