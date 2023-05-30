import type { Reducer } from "react";
import type { Action, ActionsState, State } from "./types";

export const initialState: State = {
  gig: null,
  loading: true,
  error: null
};

export const initialActionsState: ActionsState = {
  dispatch: () => {},
  createGig: async () => {},
  // editGig: async () => {}
};

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "CREATE_GIG_SUCCESS":
      return { user: action.payload, loading: false, error: null };
    case "CREATE_GIG_ERROR":
      console.error("CREATE_GIG_ERROR: " + action.payload.stack);
      return { ...state, loading: false, error: action.payload };
    default:
      throw Error("NOT_IMPLEMENTED");
  }
};
