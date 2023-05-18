import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
export type UserFullName = {
  firstName: string;
  lastName: string;
};

export type UserRoles = {
  seller: boolean;
  buyer: boolean;
};

export type UserSkill = {
  name: string;
  subSkills: string[];
};

export type UserEducation = {
  degree: string;
  major: string;
  school: string;
  year: number;
};

export type UserCertification = {
  name: string;
  authority: string;
  year: number;
};

export type UserExperience = {
  title: string;
  company: string;
  location: string;
  startYear: number;
  endYear: number;
  description: string;
};

export interface User {
  name: UserFullName;
  username: string;
  description: string;
  location: string;
  languages: string[];
  timezone: string;
  roles: UserRoles;
  skills: UserSkill[];
  education: UserEducation[];
  certifications: UserCertification[];
  experience: UserExperience[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export const useGetUserDoc = (uid: string | undefined) => {
  const [userDoc, setUserDoc] = useState<User | null>(null);

  useEffect(() => {
    const getUserDoc = async (uid: string) => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDoc(docSnap.data() as User);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };
    if (uid) {
      getUserDoc(uid);
    }
  }, [uid]);

  return userDoc;
};
