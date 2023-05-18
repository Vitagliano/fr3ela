import { useRouter } from "next/navigation";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "@/firebase";
import { googleProvider } from "@/firebase/providers";
import {
  checkUserDocExists,
  createCredentialsUser,
  createEmptyUserDoc,
  signInCredentials,
  signInPopup,
} from "@/util/user";
import { initialActionsState, initialState, reducer } from "./state";
import { ActionsState } from "./types";

const AuthContext = createContext(initialState);
const AuthActionsContext = createContext(initialActionsState);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const actionsState = useMemo<ActionsState>(
    () => ({
      dispatch,
      async signUp(email: string, password: string) {
        dispatch({ type: "LOADING" });
        try {
          const user = await createCredentialsUser(auth, email, password);
          console.log("user: " + user.emailVerified);
          const isUserCreated = await createEmptyUserDoc(user);

          if (!isUserCreated)
            return dispatch({
              type: "REGISTER_ERROR",
              payload: "Failed to create user document.",
            });

          console.log("User document created successfully.");
          router.prefetch("/dashboard");
          router.push("/dashboard");
        } catch (error) {
          dispatch({
            type: "REGISTER_ERROR",
            payload: (error as Error).message,
          });
        }
      },
      async signIn(email: string, password: string) {
        dispatch({ type: "LOADING" });
        try {
          const user = await signInCredentials(auth, email, password);
          console.log("user: " + user.emailVerified);
          const userExists = await checkUserDocExists(user.uid);

          if (!userExists) {
            const isUserCreated = await createEmptyUserDoc(user);

            if (!isUserCreated)
              return dispatch({
                type: "REGISTER_ERROR",
                payload: "Failed to create user document.",
              });

            dispatch({ type: "REGISTER_SUCCESS", payload: user });
          } else dispatch({ type: "LOGIN_SUCCESS", payload: user });

          router.prefetch("/dashboard");
          router.push("/dashboard");
        } catch (error) {
          dispatch({
            type: "LOGIN_ERROR",
            payload: (error as Error).message,
          });
        }
      },

      async signInWithGoogle() {
        dispatch({ type: "LOADING" });
        try {
          const user = await signInPopup(auth, googleProvider);
          const userExists = await checkUserDocExists(user.uid);

          if (!userExists) {
            const isUserCreated = await createEmptyUserDoc(user);

            if (!isUserCreated)
              return dispatch({
                type: "REGISTER_ERROR",
                payload: "Failed to create user document.",
              });

            dispatch({ type: "REGISTER_SUCCESS", payload: user });
          } else
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: user,
            });

          router.prefetch("/dashboard");
          router.push("/dashboard");
        } catch (error) {
          dispatch({ type: "LOGIN_ERROR", payload: (error as Error).message });
        }
      },

      async signOut() {
        dispatch({ type: "LOADING" });
        try {
          await signOut(auth);
          router.push("/");
        } catch (error) {
          dispatch({
            type: "LOGOUT_ERROR",
            payload: (error as Error).message,
          });
        }
      },
    }),
    [dispatch]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) dispatch({ type: "LOGIN_SUCCESS", payload: user });
      else dispatch({ type: "LOGOUT_SUCCESS" });
    });

    return unsubscribe;
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
