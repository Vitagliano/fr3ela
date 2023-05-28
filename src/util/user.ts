import { db, moralisAuth } from "@/firebase";
import { UserDoc } from "@/types/user";
import {
  Auth,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { signInWithMoralis } from "@moralisweb3/client-firebase-evm-auth";
import { GetWebSocketPublicClientResult } from "@wagmi/core";
import { WebSocketPublicClient } from "wagmi";

export const userDoc = (user: User): UserDoc => ({
  wallet: user?.displayName,
  name: {
    firstName: "",
    lastName: ""
  },
  username: "",
  description: "",
  location: "",
  languages: [],
  timezone: "",
  roles: {
    seller: false,
    buyer: false
  },
  skills: [],
  education: [],
  certifications: [],
  experience: [],
  createdAt: user.metadata.creationTime || "",
  updatedAt: ""
});

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

export function createEmptyUserDoc(user: User) {
  const userData = userDoc(user);
  return createUserDoc(user.uid, userData);
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

export async function createCredentialsUser(
  auth: Auth,
  email: string,
  password: string
) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  return user;
}

export async function signInCredentials(
  auth: Auth,
  email: string,
  password: string
) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  return user;
}

export async function signInPopup(auth: Auth, provider: GoogleAuthProvider) {
  const { user } = await signInWithPopup(auth, provider);

  return user;
}

// export async function signInWithWallet() {
//   const { chain } = getNetwork();

//   const webSocketProvider = useWebSocketPublicClient({
//     chainId: chain?.id || 80001
//   });

//   const { credentials: user } = await signInWithMoralis(moralisAuth, {
//     provider: webSocketProvider as any
//   });

//   return user;
// }

export async function signInWithWallet(
  webSocketProvider: GetWebSocketPublicClientResult<WebSocketPublicClient>
) {
  const { credentials: user } = await signInWithMoralis(moralisAuth, {
    provider: webSocketProvider as any
  });

  return user;
}
