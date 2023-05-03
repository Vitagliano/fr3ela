import { useContext, useEffect, useMemo, useReducer } from "react";
import { ReactNode } from "react";
import { Dispatch, FC, Reducer, createContext } from "react";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "@/firebase";

interface FirebaseUser {
  uid: string;
  displayName: string | null;
  email: string | null;
}

interface State {
  user: FirebaseUser | null;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: "LOADING" }
  | { type: "LOGOUT_SUCCESS" }
  | { type: "LOGIN_SUCCESS"; payload: FirebaseUser }
  | { type: "LOGIN_ERROR"; payload: string };

interface ActionsState {
  dispatch: Dispatch<Action>;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
}

const initialState: State = {
  user: null,
  loading: true,
  error: null,
};

const initialActionsState: ActionsState = {
  dispatch: () => {},
  signIn: async (email: string, password: string) => {},
  signOut: async () => {},
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "LOGOUT_SUCCESS":
      return { user: null, loading: false, error: null };
    case "LOGIN_SUCCESS":
      return { user: action.payload, loading: false, error: null };
    case "LOGIN_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      throw Error("NOT_IMPLEMENTED");
  }
};

const AuthContext = createContext(initialState);
const AuthActionsContext = createContext(initialActionsState);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actionsState = useMemo<ActionsState>(
    () => ({
      dispatch,
      async signIn(email: string, password: string) {
        dispatch({ type: "LOADING" });
        try {
          await signInWithEmailAndPassword(auth, email, password).then(
            (userCredential) => console.log(userCredential, "userCredential")
          );
        } catch (error) {
          dispatch({ type: "LOGIN_ERROR", payload: (error as Error).message });
        }
      },
      async signOut() {
        dispatch({ type: "LOADING" });

        try {
          await signOut(auth);
        } catch (error) {
          console.error(error);
        }
      },
    }),
    [dispatch]
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) dispatch({ type: "LOGIN_SUCCESS", payload: user });
      else dispatch({ type: "LOGOUT_SUCCESS" });
    });
  }, []);

  return (
    <AuthContext.Provider value={state}>
      <AuthActionsContext.Provider value={actionsState}>
        {children}
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useAuthActions = () => useContext(AuthActionsContext);
