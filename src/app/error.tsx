"use client";

import { NextErrorProps } from "@/types/components";

export default function Error({ error, reset }: NextErrorProps) {
  console.log(error);

  return (
    <div>
      <h1>ERROR</h1>
      <h2>{error.message}</h2>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
