import type { UserDoc } from "@/types/user";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export const useGetUserDoc = (uid: string | undefined) => {
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);

  useEffect(() => {
    if (!uid) return;

    getUserDoc(uid);

    async function getUserDoc(id: string) {
      try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.log("No such document!");
          return;
        }

        setUserDoc(docSnap.data() as UserDoc);
      } catch (error) {
        console.log("Error getting document:", error);
      }
    }
  }, [uid]);

  return userDoc;
};
