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
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const gigData: GigDoc[] = [];
      querySnapshot.forEach(doc => {
        gigData.push({ ...doc.data(), userId: doc.data().userId } as GigDoc);
      });
      setGigs(gigData);
    });

    return () => {
      unsubscribe();
    };
  }, [db]);

  const getGigById = async (id: string): Promise<GigDoc | null> => {
    const docRef = doc(db, "gigs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docRef.id } as GigDoc;
    }
    return null;
  };

  const createGig = async (
    gig: Omit<GigDoc, "userId" | "createdAt" | "updatedAt">,
    images?: File[]
  ) => {
    if (!user) {
      console.log("User not authenticated");
    }

    if (images) {
      console.log("Uploading images");
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
      console.log("imageUrls", imageUrls);
      gig.images = imageUrls;
    }

    const createdAt = new Date().toISOString();

    console.log("Creating gig", gig);
    const newGig: GigDoc = {
      ...gig,
      userId: user?.uid,
      createdAt: createdAt,
      updatedAt: ""
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
    }

    const gig = await getGigById(id);
    if (!gig) {
      console.log("Gig not found");
    }

    if (gig?.userId !== user?.uid) {
      console.log("User not authorized to edit this gig");
    }

    const updatedAt = new Date().toISOString();

    const gigRef = doc(db, "gigs", id);
    const docRef = await updateDoc(gigRef, {
      ...updatedGig,
      updatedAt
    });

    return docRef;
  };

  const deleteGig = async (id: string) => {
    if (!user) {
      console.log("User not authenticated");
    }

    const gig = await getGigById(id);
    if (!gig) {
      console.log("Gig not found");
    }

    if (gig?.userId !== user?.uid) {
      console.log("User not authorized to delete this gig");
    }

    await deleteDoc(doc(db, "gigs", id));
  };

  return { gigs, createGig, editGig, deleteGig };
};

export default useGig;
