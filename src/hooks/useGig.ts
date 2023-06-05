import { useState, useEffect } from "react";
import { GigDoc } from "@/types/gig";
import { db, storage } from "@/firebase";
import { useAuth } from "@/context/Auth";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  getDoc
} from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useGig = () => {
  const { user } = useAuth();

  const [gigs, setGigs] = useState<GigDoc[]>([]);

  useEffect(() => {
    const q = query(collection(db, "gigs"));
    const unsubscribe = onSnapshot(q, snapshot => {
      const gigData = snapshot.docs.map(doc => ({
        ...doc.data()
      })) as GigDoc[];

      setGigs(gigData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getGigById = async (id: string): Promise<GigDoc | null> => {
    const docRef = doc(db, "gigs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //                            userId? ou deveria existir um id em GigDoc?
      return { ...docSnap.data() /* id: docRef.id */ } as GigDoc;
    }

    return null;
  };

  const createGig = async (
    gig: Omit<GigDoc, "userId" | "createdAt" | "updatedAt">,
    images?: File[]
  ) => {
    if (!user) {
      console.log("User not authenticated");

      throw Error("Unhandled");
    }

    if (images) {
      console.log("Uploading images");
      console.time("uploadImages");
      const imageUrls = await Promise.all(
        images.map(async image => {
          const imageRef = ref(
            storage,
            `gig-images/${gig.title}-${image.name}`
          );
          console.log("imageRef", imageRef);
          await uploadBytes(imageRef, new Blob([image]));
          return await getDownloadURL(imageRef);
        })
      );
      console.timeEnd("uploadImages");
      console.log("imageUrls", imageUrls);
      gig.images = imageUrls;
    }

    const createdAt = new Date().toISOString();

    console.log("Creating gig", gig);
    const newGig: GigDoc = {
      ...gig,
      createdAt,
      userId: user.uid,
      /**
       * aqui faz sentido ser createdAt inicialmente
       * caso esse valor seja usado em algum lugar
       * e evitar algo tipo
       *
       * const lastUpdate = gig.updatedAt || gig.createdAt;
       */
      updatedAt: createdAt
    };

    const docRef = await addDoc(collection(db, "gigs"), newGig);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  };

  const editGig = async (
    id: string,
    updatedGig: Partial<Omit<GigDoc, "updatedAt">>
  ) => {
    if (!user) {
      console.log("User not authenticated");

      throw Error("Unhandled");
    }

    const gig = await getGigById(id);

    if (!gig) {
      console.log("Gig not found");

      throw Error("Unhandled");
    }

    if (gig.userId !== user.uid) {
      console.log("User not authorized to edit this gig");

      throw Error("Unhandled");
    }

    const updatedAt = new Date().toISOString();

    const gigRef = doc(db, "gigs", id);

    // retornar uma promise tem o mesmo "efeito" de retornar um awaited result
    // e pode ser levemente mais eficiente
    return updateDoc(gigRef, {
      ...updatedGig,
      updatedAt
    });
  };

  const deleteGig = async (id: string) => {
    if (!user) {
      console.log("User not authenticated");

      throw Error("Unhandled");
    }

    const gig = await getGigById(id);
    if (!gig) {
      console.log("Gig not found");

      throw Error("Unhandled");
    }

    if (gig.userId !== user.uid) {
      console.log("User not authorized to delete this gig");

      throw Error("Unhandled");
    }

    // retornar uma promise tem o mesmo "efeito" de retornar um awaited result
    // e pode ser levemente mais eficiente
    return deleteDoc(doc(db, "gigs", id));
  };

  return { gigs, createGig, editGig, deleteGig };
};

export default useGig;
