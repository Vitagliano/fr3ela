import type { UserDoc } from "@/types/user";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export const useGetUserDoc = (uid: string | undefined) => {
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);

  useEffect(() => {
    const getUserDoc = async (uid: string) => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDoc(docSnap.data() as UserDoc);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };
    if (uid) {
      getUserDoc(uid);
    }
  }, [uid]);

  return userDoc;
};
