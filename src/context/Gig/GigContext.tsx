"use client";

import { FC, ReactNode, createContext, useContext, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { useGigState } from "@/hooks/useGigState";
import { initialActionsState, initialState } from "./state";

const GigContext = createContext(initialState);
GigContext.displayName = "GigContext";
const GigActionsContext = createContext(initialActionsState);
GigActionsContext.displayName = "GigActionsContext";

export const GigProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, actionsState, dispatch] = useGigState();

  return (
    <GigContext.Provider value={state}>
      <GigActionsContext.Provider value={actionsState}>
        {children}
      </GigActionsContext.Provider>
    </GigContext.Provider>
  );
};

export const useGig = () => useContext(GigContext);
export const useGigActions = () => useContext(GigActionsContext);
