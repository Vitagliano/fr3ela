"use client";
import { useAuthActions } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import { Button } from "../Button";

export const LoginWithMail = () => {
  const { signIn } = useAuthActions();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signIn(data.email, data.password);
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
            onChange={(e: any) =>
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
            onChange={(e: any) =>
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
