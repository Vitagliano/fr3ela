import { Credentials } from "@/types/credentials";
import type { User } from "firebase/auth";
import type { Dispatch } from "react";

export interface State {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export type Action =
  | { type: "LOADING" }
  | { type: "LOGOUT_SUCCESS" }
  | { type: "LOGOUT_ERROR"; payload: Error }
  | { type: "REGISTER_SUCCESS"; payload: User }
  | { type: "REGISTER_ERROR"; payload: Error }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR"; payload: Error };

export interface ActionsState {
  dispatch: Dispatch<Action>;
  signUp(credentials: Credentials): Promise<void>;
  signIn(credentials: Credentials): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
}
