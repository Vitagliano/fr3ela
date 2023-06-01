import { db } from "@/firebase";
import { Auth, User } from "firebase/auth";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";

import { GigDoc } from "@/types/gig";

export const gigDoc = (user: User): GigDoc => ({
  user: user?.uid,
  title: "",
  description: "",
  category: "",
  packages: [],
  extras: [],
  samples: [],
  createdAt: user.metadata.creationTime || "",
  updatedAt: ""
});

export async function createGigDoc(gigData: GigDoc): Promise<boolean> {
  try {
    await addDoc(collection(db, "gig"), gigData);
    return true;
  } catch (error) {
    return false;
  }
}
