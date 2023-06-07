"use client";
import "firebase/firestore";
import { useEffect, useRef, useState } from "react";

type Destructor = () => void;

interface Subscriber<T> {
  (resolve: React.Dispatch<React.SetStateAction<T>>): void | Destructor;
}

function useSubscription<T>(
  subscriber: Subscriber<T>,
  initialState: T | (() => T),
  dependencyList: React.DependencyList = []
) {
  const [data, setData] = useState(initialState);

  const _sub = useRef(subscriber).current;

  useEffect(() => _sub(setData), [...dependencyList, _sub]);

  return data;
}
export default useSubscription;
