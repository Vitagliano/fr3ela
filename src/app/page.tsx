"use client";
import { Button } from "@/components/Button";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useAuth, useAuthActions } from "@/context/Auth";
import Link from "next/link";

import { ConnectButton } from "@rainbow-me/rainbowkit";

function Home() {
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
      {user ? <h1>Olá {user?.displayName}</h1> : <h1>Olá visitante</h1>}
      {user ? <Button onClick={signOut}>Sign Out</Button> : null}
      <ConnectButton />
    </main>
  );
}

export default Home;
