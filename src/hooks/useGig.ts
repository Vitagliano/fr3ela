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
  getDoc,
  getDocs,
  where
} from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import useSubscription from "./useSubscription";

import { gigQuery } from "@/firebase/queries";

const generateSlug = (title: string): string => {
  const slug = title
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)+/g, ""); // Remove leading/trailing hyphens  return slug;

  return slug;
};

const useGig = () => {
  const { user } = useAuth();

  const gigs = useSubscription<Array<GigDoc>>(
    resolve =>
      onSnapshot(gigQuery, snapshot =>
        resolve(snapshot.docs.map(doc => doc.data() as GigDoc))
      ),
    [],
    []
  );

  const getGigById = async (id: string): Promise<GigDoc | null> => {
    const docRef = doc(db, "gigs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data() } as GigDoc;
    }

    return null;
  };

  // const getGigBySlug = async (slug: string): Promise<GigDoc | null> => {
  //   const gigSnapshot = query(gigQuery, where("slug", "==", slug));

  //   if (!gigSnapshot) {
  //     return null;
  //   }

  //   const querySnapshot = await getDocs(gigSnapshot);
  //   const gigs: GigDoc[] = [];

  //   querySnapshot.forEach(doc => {
  //     const gig = doc.data() as GigDoc;
  //     gigs.push({
  //       ...gig
  //     });
  //   });

  //   return gigs.length > 0 ? gigs[0] : null;
  // };

  const createGig = async (
    gig: Omit<GigDoc, "userId" | "slug" | "createdAt" | "updatedAt">,
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

    const slug = generateSlug(gig.title);

    console.log("Creating gig", gig);
    const newGig: GigDoc = {
      ...gig,
      slug,
      createdAt,
      userId: user.uid,
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

    return deleteDoc(doc(db, "gigs", id));
  };

  return { gigs, getGigById, createGig, editGig, deleteGig };
};

export default useGig;
