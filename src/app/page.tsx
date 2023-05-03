"use client";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Link from "next/link";
import { Button } from "@/components/Button";
import Input from "@/components/Input";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center flex-col justify-center gap-8 p-24">
      <div className="flex items-center justify-center gap-8 ">
        <ThemeSwitcher />

        <Link href="/signin">Sign In</Link>
        <Link href="/signup">Sign Up</Link>
      </div>

      <Input
        type="text"
        placeholder="Input"
        onChange={(e) => {
          console.log({ e });
        }}
      />
      <Input type="password" required placeholder="Senha" />
      <Input type="email" required placeholder="Email" />
      <Button
        type="submit"
        onClick={() => {
          console.log("clicou");
        }}
      >
        Button
      </Button>
    </main>
  );
}
