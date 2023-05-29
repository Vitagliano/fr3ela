"use client";

import { NextErrorProps } from "@/types/components";

export default function Error({ error, reset }: NextErrorProps) {
  console.log(error);

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
