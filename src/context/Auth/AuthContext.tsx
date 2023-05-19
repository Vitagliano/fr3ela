import { FC, ReactNode, createContext, useContext, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/firebase";
import { useAuthState } from "@/hooks/useAuthState";
import { initialActionsState, initialState } from "./state";

const AuthContext = createContext(initialState);
const AuthActionsContext = createContext(initialActionsState);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, actionsState, dispatch] = useAuthState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) dispatch({ type: "LOGIN_SUCCESS", payload: user });
      else dispatch({ type: "LOGOUT_SUCCESS" });
    });

    return unsubscribe;
  }, [dispatch]);

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
