"use client";
import { useAuthActions } from "@/context/Auth";
import { useMemo } from "react";
import { Button } from "../Button";
import Input from "../Input";

import type { Credentials } from "@/types/credentials";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email"
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
});

const resolver = zodResolver(schema);

export const LoginWithMail = () => {
  const { signIn } = useAuthActions();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Credentials>({ resolver });
  const onSubmit = useMemo(() => handleSubmit(signIn), [handleSubmit, signIn]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-medium">Email</label>
        <Input
          className="w-full"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email?.message ? <p>{errors.email?.message}</p> : null}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Password</label>
        <Input
          className="w-full"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password?.message ? <p>{errors.password?.message}</p> : null}
      </div>

      <Button type="submit">Sign in</Button>
    </form>
  );
};

export default LoginWithMail;
