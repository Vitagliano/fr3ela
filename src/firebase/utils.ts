import { UserDoc } from "@/types/user";
import { doc, getDoc } from "firebase/firestore";
import { db } from ".";

export async function getUserDoc(id: string) {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("No such document!");
      return null;
    }

    return docSnap.data() as UserDoc;
  } catch (error) {
    console.log("Error getting document:", error);
    return null;
  }
}
