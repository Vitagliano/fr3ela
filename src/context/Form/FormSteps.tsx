import { createContext, useContext } from "react";
import { inititalManagerState } from "./state";
import { FormStepsProviderProps } from "./types";

const FSCtx = createContext(inititalManagerState);

function FormStepsProvider({ steps, children }: FormStepsProviderProps) {
  return <FSCtx.Provider value={steps}>{children}</FSCtx.Provider>;
}

export function useFormSteps() {
  return useContext(FSCtx);
}

export { FormStepsProvider };
