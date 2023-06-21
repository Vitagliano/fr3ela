import { ChangeEvent } from "react";

export type TextHandler = (e: ChangeEvent<HTMLInputElement>) => void;
export type SelectHandler = (e: ChangeEvent<HTMLSelectElement>) => void;