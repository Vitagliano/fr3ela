import { initialState, reducer } from "@/context/Auth/state";
import type { Action, ActionsState, State } from "@/context/Auth/types";
import { auth } from "@/firebase";
import { googleProvider } from "@/firebase/providers";
import {
  checkUserDocExists,
  createCredentialsUser,
  createEmptyUserDoc,
  signInCredentials,
  signInPopup
} from "@/util/user";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { type Dispatch, useMemo, useReducer } from "react";

export function useAuthState(): [State, ActionsState, Dispatch<Action>] {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const actionsState = useMemo<ActionsState>(
    () => ({
      dispatch,
      async signUp({ email, password }) {
        dispatch({ type: "LOADING" });
        try {
          const user = await createCredentialsUser(auth, email, password);
          console.log("user: " + user.emailVerified);
          const isUserCreated = await createEmptyUserDoc(user);

          if (!isUserCreated)
            return dispatch({
              type: "REGISTER_ERROR",
              payload: Error("Failed to create user document.")
            });

          console.log("User document created successfully.");
          router.prefetch("/dashboard");
          router.push("/dashboard");
        } catch (error) {
          dispatch({
            type: "REGISTER_ERROR",
            payload: error as Error
          });
        }
      },
      async signIn({ email, password }) {
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
                payload: Error("Failed to create user document.")
              });

            dispatch({ type: "REGISTER_SUCCESS", payload: user });
          } else dispatch({ type: "LOGIN_SUCCESS", payload: user });

          router.prefetch("/dashboard");
          router.push("/dashboard");
        } catch (error) {
          dispatch({
            type: "LOGIN_ERROR",
            payload: error as Error
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
                payload: Error("Failed to create user document.")
              });

            dispatch({ type: "REGISTER_SUCCESS", payload: user });
          } else
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: user
            });

          router.prefetch("/dashboard");
          router.push("/dashboard");
        } catch (error) {
          dispatch({ type: "LOGIN_ERROR", payload: error as Error });
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
            payload: error as Error
          });
        }
      }
    }),
    [dispatch, router]
  );

  return [state, actionsState, dispatch];
}
