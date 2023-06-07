import { useState, useEffect, useRef } from "react";
import { GigDoc } from "@/types/gig";
import { db } from "@/firebase";
import { collection, onSnapshot, query, Query } from "firebase/firestore";
import firebase from "firebase/app";
import "firebase/firestore";

type Destructor = () => void;

interface Subscriber<T> {
  (resolve: React.Dispatch<React.SetStateAction<T>>): void | Destructor;
}

function useSubscription<T>(
  subscriber: Subscriber<T>,
  initialState: T | (() => T),
  dependencyList: []
) {
  const [data, setData] = useState(initialState);

  const _sub = useRef(subscriber).current;

  useEffect(() => _sub(setData), [...dependencyList, _sub]);

  return data;
}
export default useSubscription;
