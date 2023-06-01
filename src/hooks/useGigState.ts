import { initialState, reducer } from "@/context/Gig/state";
import type { Action, ActionsState, State } from "@/context/Gig/types";
import { auth, db } from "@/firebase";
import { useRouter } from "next/navigation";
import { type Dispatch, useMemo, useReducer } from "react";

import { addDoc, collection } from "firebase/firestore";

export function useGigState(): [State, ActionsState, Dispatch<Action>] {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const actionsState = useMemo<ActionsState>(
    () => ({
      dispatch,
      async createGig() {
        dispatch({ type: "LOADING" });
        try {
          const gig = await addDoc(collection(db, "gigs"), {
            user: auth.currentUser?.uid,
            title: "Test Gig",
            description: "Test Gig Description",
            category: "Test Gig Category",
            packages: [
                {
                  name: "Basic",
                  description: "Basic Package",
                  price: 10,
                  deliveryTime: 1
                },
                {
                  name: "Standard",
                  description: "Standard Package",
                  price: 20,
                  deliveryTime: 2
                },
                {
                  name: "Premium",
                  description: "Premium Package",
                  price: 30,
                  deliveryTime: 3
                }],
              extras: [
                {
                  name: "Extra 1",
                  description: "Extra 1 Description",
                  price: 5
                },
                {
                  name: "Extra 2",
                  description: "Extra 2 Description",
                  price: 10
                },
                {
                  name: "Extra 3",
                  description: "Extra 3 Description",
                  price: 15
                }],
              samples: [
                "https://www.youtube.com/watch?v=9bZkp7q19f0",
                "https://www.youtube.com/watch?v=9bZkp7q19f0",
                "https://www.youtube.com/watch?v=9bZkp7q19f0"
              ],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
                  });
                dispatch({ type: "CREATE_GIG_SUCCESS", payload: gig });
                router.push(`/gig/${gig.id}`);
        } catch (error) {
          dispatch({
            type: "CREATE_GIG_ERROR",
            payload: error as Error
          });
        }
      },

    //   async signIn({ email, password }) {
    //     dispatch({ type: "LOADING" });
    //     try {
    //       const user = await signInCredentials(auth, email, password);
    //       console.log("user: " + user.emailVerified);
    //       const userExists = await checkUserDocExists(user.uid);

    //       if (!userExists) {
    //         const isUserCreated = await createEmptyUserDoc(user);

    //         if (!isUserCreated)
    //           return dispatch({
    //             type: "REGISTER_ERROR",
    //             payload: Error("Failed to create user document.")
    //           });

    //         dispatch({ type: "REGISTER_SUCCESS", payload: user });
    //       } else dispatch({ type: "LOGIN_SUCCESS", payload: user });

    //       router.prefetch("/dashboard");
    //       router.push("/dashboard");
    //     } catch (error) {
    //       dispatch({
    //         type: "LOGIN_ERROR",
    //         payload: error as Error
    //       });
    //     }
    //   },

    //   async signInWithGoogle() {
    //     dispatch({ type: "LOADING" });
    //     try {
    //       const user = await signInPopup(auth, googleProvider);
    //       const userExists = await checkUserDocExists(user.uid);

    //       if (!userExists) {
    //         const isUserCreated = await createEmptyUserDoc(user);

    //         if (!isUserCreated)
    //           return dispatch({
    //             type: "REGISTER_ERROR",
    //             payload: Error("Failed to create user document.")
    //           });

    //         dispatch({ type: "REGISTER_SUCCESS", payload: user });
    //       } else
    //         dispatch({
    //           type: "LOGIN_SUCCESS",
    //           payload: user
    //         });

    //       router.prefetch("/dashboard");
    //       router.push("/dashboard");
    //     } catch (error) {
    //       dispatch({ type: "LOGIN_ERROR", payload: error as Error });
    //     }
    //   },

    //   async signOut() {
    //     dispatch({ type: "LOADING" });
    //     try {
    //       await signOut(auth);
    //       router.push("/");
    //     } catch (error) {
    //       dispatch({
    //         type: "LOGOUT_ERROR",
    //         payload: error as Error
    //       });
    //     }
    //   }
    // }),
    [dispatch, router]
  );

  return [state, actionsState, dispatch];
}
