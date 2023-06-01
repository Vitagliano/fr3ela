import { GigDoc } from "@/types/gig";
import type { Dispatch } from "react";

export interface State {
  gig: GigDoc | null;
  loading: boolean;
  error: Error | null;
}

export type Action =
  | { type: "LOADING" }
  | { type: "LOGOUT_ERROR"; payload: Error }
  | { type: "CREATE_GIG_SUCCESS"; payload: GigDoc }
  | { type: "CREATE_GIG_ERROR"; payload: Error };
// | { type: "EDIT_GIG_SUCCESS"; payload: GigDoc }
// | { type: "EDIT_GIG_ERROR"; payload: Error };

export interface ActionsState {
  dispatch: Dispatch<Action>;
  createGig(): Promise<void>;
  // editGig(): Promise<void>;
}
