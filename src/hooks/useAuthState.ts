"use client";
import { initialState, reducer } from "@/context/Auth/state";
import type { Action, ActionsState, State } from "@/context/Auth/types";
import { auth } from "@/firebase";
import { googleProvider } from "@/firebase/providers";
import {
  checkUserDocExists,
  createCredentialsUser,
  createEmptyUserDoc,
  signInCredentials,
  signInPopup,
  signInWithWallet
} from "@/util/user";
import { User, UserCredential, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useMemo, useReducer, type Dispatch } from "react";

import { userQuery } from "@/firebase/queries";
import { getNetwork } from "@wagmi/core";
import { getDoc, getDocs, query, where } from "firebase/firestore";
import { useAccount, useWebSocketPublicClient } from "wagmi";

export function useAuthState(): [State, ActionsState, Dispatch<Action>] {
  const { chain } = getNetwork();
  const webSocketProvider = useWebSocketPublicClient({
    chainId: chain?.id || 80001
  });

  useAccount({
    async onConnect({ address, connector, isReconnected }) {
      try {
        if (!isReconnected) {
          const { user }: UserCredential = await signInWithWallet(
            webSocketProvider
          );

          const userExists = await checkUserDocExists(address as string);

          if (!userExists) {
            const isUserCreated = await createEmptyUserDoc(user);

            if (!isUserCreated)
              return dispatch({
                type: "REGISTER_ERROR",
                payload: Error("Failed to create user document.")
              });

            dispatch({ type: "REGISTER_SUCCESS", payload: user });
          }

          router.prefetch("/dashboard");
          router.push("/dashboard");
        } else {
          const docRef = query(userQuery, where("wallet", "==", address));
          const docSnap = await getDocs(docRef);
          const user = docSnap.docs[0]?.data() as User | undefined;

          if (!user)
            return dispatch({
              type: "LOGIN_ERROR",
              payload: Error("Failed to login.")
            });

          dispatch({ type: "LOGIN_SUCCESS", payload: user });
        }

        /*
        If the user is reconnected from session do not redirect 
        router.prefetch("/dashboard");
        router.push("/dashboard");
        */
      } catch (error) {
        console.error(error);
      }
    },

    onDisconnect() {
      signOut(auth);
    }
  });

  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const actionsState = useMemo<ActionsState>(
    () => ({
      dispatch,
      async signUp({ email, password }) {
        dispatch({ type: "LOADING" });
        try {
          const user = await createCredentialsUser(auth, email, password);
          const isUserCreated = await createEmptyUserDoc(user);

          if (!isUserCreated)
            return dispatch({
              type: "REGISTER_ERROR",
              payload: Error("Failed to create user document.")
            });

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
