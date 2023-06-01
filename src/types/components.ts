import type { PropsWithChildren } from "react";

export type PWC<T = unknown> = PropsWithChildren<T>;
export type NextErrorProps = {
  reset: () => void;
  error: Error;
};
