import { useContext, useEffect, useMemo, useReducer } from "react";
import { ReactNode } from "react";
import { Dispatch, FC, Reducer, createContext } from "react";
import { useRouter } from "next/navigation";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { auth, db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  UserCertification,
  UserEducation,
  UserExperience,
  UserFullName,
  UserRoles,
  UserSkill,
} from "@/types";

export interface UserDoc {
  name: UserFullName;
  username: string;
  description: string;
  location: string;
  languages: string[];
  timezone: string;
  roles: UserRoles;
  skills: UserSkill[];
  education: UserEducation[];
  certifications: UserCertification[];
  experience: UserExperience[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface State {
  user: User | null;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: "LOADING" }
  | { type: "LOGOUT_SUCCESS" }
  | { type: "REGISTER_SUCCESS"; payload: User }
  | { type: "REGISTER_ERROR"; payload: string }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR"; payload: string };

interface ActionsState {
  dispatch: Dispatch<Action>;
  signUp(email: string, password: string): Promise<void>;
  signIn(email: string, password: string): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
}

const initialState: State = {
  user: null,
  loading: true,
  error: null,
};

const initialActionsState: ActionsState = {
  dispatch: () => {},
  signUp: async (email: string, password: string) => {},
  signIn: async (email: string, password: string) => {},
  signInWithGoogle: async () => {},
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
    case "REGISTER_SUCCESS":
      return { user: action.payload, loading: false, error: null };
    case "REGISTER_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      throw Error("NOT_IMPLEMENTED");
  }
};

const AuthContext = createContext(initialState);
const AuthActionsContext = createContext(initialActionsState);

// Providers
const googleProvider = new GoogleAuthProvider();

export function userDoc(user: User): UserDoc {
  return {
    name: {
      firstName: "",
      lastName: "",
    },
    username: "",
    description: "",
    location: "",
    languages: [],
    timezone: "",
    roles: {
      seller: false,
      buyer: false,
    },
    skills: [],
    education: [],
    certifications: [],
    experience: [],
    createdAt: user.metadata.creationTime || "",
    updatedAt: "",
  };
}

export async function createUserDoc(
  userId: User["uid"],
  userData: UserDoc
): Promise<boolean> {
  try {
    await setDoc(doc(db, "users", userId), userData);
    return true;
  } catch (error) {
    return false;
  }
}

export async function checkUserDocExists(
  userId: User["uid"]
): Promise<boolean> {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

export async function verifyUserEmail(user: User): Promise<void> {
  await sendEmailVerification(user);
}

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const actionsState = useMemo<ActionsState>(
    () => ({
      dispatch,
      async signUp(email: string, password: string) {
        dispatch({ type: "LOADING" });
        try {
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log("user: " + user.emailVerified);
          const userData: UserDoc = userDoc(user);
          createUserDoc(user.uid, userData)
            .then((isUserCreated) => {
              if (isUserCreated) {
                console.log("User document created successfully.");
                router.prefetch("/dashboard");
                router.push("/dashboard");
              } else {
                console.log("Failed to create user document.");
              }
            })
            .catch((error) => console.error(error));
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
          await signInWithEmailAndPassword(auth, email, password).then(
            async (userCredential) => {
              const user = userCredential.user;
              console.log("user: " + user.emailVerified);
              const userExists = await checkUserDocExists(user.uid);
              if (userExists) {
                dispatch({ type: "LOGIN_SUCCESS", payload: user });
                router.prefetch("/dashboard");
                router.push("/dashboard");
              } else {
                const userData: UserDoc = userDoc(user);
                createUserDoc(user.uid, userData)
                  .then((isUserCreated) => {
                    if (isUserCreated) {
                      dispatch({ type: "REGISTER_SUCCESS", payload: user });
                      console.log("User document created successfully.");
                      router.prefetch("/dashboard");
                      router.push("/dashboard");
                    } else {
                      dispatch({
                        type: "REGISTER_ERROR",
                        payload: "Failed to create user document.",
                      });
                      console.log("Failed to create user document.");
                    }
                  })
                  .catch((error) => console.error(error));
              }
            }
          );
        } catch (error) {
          dispatch({ type: "LOGIN_ERROR", payload: (error as Error).message });
        }
      },

      async signInWithGoogle() {
        dispatch({ type: "LOADING" });
        try {
          await signInWithPopup(auth, googleProvider).then(
            async (userCredential) => {
              const user = userCredential.user;
              const userExists = await checkUserDocExists(user.uid);
              if (userExists) {
                dispatch({ type: "LOGIN_SUCCESS", payload: user });
                router.prefetch("/dashboard");
                router.push("/dashboard");
              } else {
                const userData: UserDoc = userDoc(user);
                createUserDoc(user.uid, userData)
                  .then((isUserCreated) => {
                    if (isUserCreated) {
                      dispatch({ type: "REGISTER_SUCCESS", payload: user });
                      console.log("User document created successfully.");
                      router.prefetch("/dashboard");
                      router.push("/dashboard");
                    } else {
                      dispatch({
                        type: "REGISTER_ERROR",
                        payload: "Failed to create user document.",
                      });
                      console.log("Failed to create user document.");
                    }
                  })
                  .catch((error) => console.error(error));
              }
            }
          );
        } catch (error) {
          console.error(error);
        }
      },

      async signOut() {
        dispatch({ type: "LOADING" });
        try {
          await signOut(auth);
          router.push("/");
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
