'use client';
import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "./state";
import { MSFCtx, MSFProviderProps, State } from "./types";

const MSFormContext = createContext(initialState);
const MSFormCtxProvider = MSFormContext.Provider;
function MSFProvider<T>(props: MSFProviderProps<T>) {
  const { children, onCompleted, init } = props;

  const data = useMSF(init, onCompleted);

  return <MSFormCtxProvider value={data}>{children}</MSFormCtxProvider>;
}

function useMSF<T>(init: State<T>, onCompleted: (data: T) => void) {
  const [data, dispatch] = useReducer(
    reducer<T>,
    init,
    (initializer): MSFCtx<T> => ({
      __complete: onCompleted,
      //
      ...initializer,
      //
      prev: () => dispatch({ type: "prev" }),
      next: payload => dispatch({ type: "next", payload }),
      jump: payload => dispatch({ type: "jump", payload }),
      submit: payload => dispatch({ type: "submit", payload })
    })
  );

  return data;
}

function useMultistepForm<T>() {
  return useContext(MSFormContext) as MSFCtx<T>;
}

export { MSFProvider as MultistepFormProvider, useMultistepForm };
