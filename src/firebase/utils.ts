import { UserDoc } from "@/types/user";
import {
  QueryCompositeFilterConstraint,
  QueryFieldFilterConstraint,
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  where
} from "firebase/firestore";
import { db } from ".";
import { categoryQuery } from "./queries";
import { CategoryDoc } from "@/types/category";

export async function getUserDoc(id: string) {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.warn("No such `user` document! id: ", id);
      return null;
    }

    return docSnap.data() as UserDoc;
  } catch (error) {
    console.error("Error getting `user` document:", error);
    return null;
  }
}

export type CategoriesQueryFilter = {
  name?: string;
  show?: "all" | "main" | "sub";
};

export async function getCategories(filter: CategoriesQueryFilter) {
  const name = filter.name?.trim().toLowerCase();
  const show = filter.show;
  const categories: CategoryDoc[] = [];

  try {
    const queryRef = query(categoryQuery);

    const querySnapshot = await getDocs(queryRef);
    const docs = querySnapshot.docs.map(doc => doc.data() as CategoryDoc);

    if (!name) return docs;

    for (const doc of docs) {
      const cat = doc;

      const nameMatch = cat.name.toLowerCase().includes(name);

      cat.subCategories =
        show !== "main"
          ? cat.subCategories.filter(sub =>
              sub.name.toLowerCase().includes(name)
            )
          : [];

      if ((show !== "sub" && nameMatch) || cat.subCategories.length > 0) {
        categories.push(cat);
      }
    }
  } catch (error) {
    console.error("Error getting `category` document:", error);
  }

  return categories;
}
