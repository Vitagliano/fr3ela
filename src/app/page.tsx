"use client";
import { Button } from "@/components/Button";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useAuth, useAuthActions } from "@/context/Auth";
import { createGigDoc } from "@/util/gig";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

function Home() {
  const { user } = useAuth();
  const { signOut } = useAuthActions();

  return (
    <main className="flex min-h-screen items-center flex-col justify-center gap-8 p-24">
      <div className="flex items-center justify-center gap-8 ">
        {user ? <Link href="/dashboard">Dashboard</Link> : null}
        <Button onClick={createGigDoc}>Create Gig</Button>
      </div>
      <ConnectButton />
      {user ? <h1>Olá {user?.displayName}</h1> : <h1>Olá visitante</h1>}
      {user ? <Button onClick={signOut}>Sign Out</Button> : null}
    </main>
  );
}

export default Home;
