import { query, collection, orderBy } from "firebase/firestore";
import { db } from ".";

export const gigQuery = query(collection(db, "gigs"));
export const userQuery = query(collection(db, "users"));
export const categoryQuery = query(
  collection(db, "categories"),
  orderBy("name")
);
