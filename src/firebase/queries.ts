import { query, collection } from "firebase/firestore";
import { db } from ".";

export const gigQuery = query(collection(db, "gigs"));
