"use client";
import type { UserDoc } from "@/types/user";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { getUserDoc } from "@/firebase/utils";

export const useGetUserDoc = (uid: string | undefined) => {
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);

  useEffect(() => {
    if (!uid) return;

    getUserDoc(uid).then(userDoc => {
      if (!userDoc) return;
      
      setUserDoc(userDoc);
    });
  }, [uid]);

  return userDoc;
};
