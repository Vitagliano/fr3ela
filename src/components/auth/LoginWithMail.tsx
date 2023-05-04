"use client";
import { useAuth, useAuthActions } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import { Button } from "../Button";
import { useRouter } from "next/navigation";

export const LoginWithMail = () => {
  const router = useRouter();
  const { signIn } = useAuthActions();

  const [data, setData] = useState({
    email: "" as string,
    password: "" as string,
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signIn(data.email, data.password).then(() => {
        router.push("/");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Email</label>
          <Input
            className="w-full"
            type="email"
            required
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Password</label>
          <Input
            className="w-full"
            type="password"
            required
            onChange={(e) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
          />
        </div>

        <Button type="submit">Sign in</Button>
      </form>
    </>
  );
};

export default LoginWithMail;
