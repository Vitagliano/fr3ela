"use client";
import { useAuth, useAuthActions } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import { Button } from "../Button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type FormData = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const RegisterWithMail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { signUp } = useAuthActions();

  const onSubmit = (data: FormData) => signUp(data.email, data.password);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Email</label>
          <Input
            className="w-full"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email?.message && <p>{errors.email?.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Password</label>
          <Input
            className="w-full"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password?.message && <p>{errors.password?.message}</p>}
        </div>

        <Button type="submit">Sign up</Button>
      </form>
    </>
  );
};

export default RegisterWithMail;
