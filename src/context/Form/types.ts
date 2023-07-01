import { Dict, Func } from "@/types/base";
import { PWC } from "@/types/components";
import { ReactNode } from "react";

/* MultistepFormProvider */
export type Action<T = unknown> =
  | { type: "jump"; payload: number }
  | { type: "prev"; payload?: never }
  | { type: "next"; payload: Partial<T> }
  | { type: "submit"; payload: Partial<T> };

export type State<T = unknown> = {
  data: T;
  step: number;
  steps: number;
};

export type MSFProviderProps<T> = PWC<{
  onCompleted(data: T): void;
  init: State<T>;
}>;

export type MSFCtx<T = unknown> = State<T> & {
  __complete(data: T): void;

  prev(): void;
  next(data: T): void;
  jump(step: number, data?: T): void;
  submit(data: T): void;
};

export type Actions = Dict<Action["type"], Func<MSFCtx>>;

/* MultistepFormManager */

export type FormStepsCtx = ReactNode[];

export type FormStepsProviderProps = PWC<{ steps: FormStepsCtx }>;
