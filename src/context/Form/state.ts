import { Action, Actions, MSFCtx, FormStepsCtx } from "./types";

export const inititalManagerState: FormStepsCtx = []

export const initialState: MSFCtx<any> = {
  data: {},
  steps: 0,
  step: 0,
  jump: () => {},
  next: () => {},
  prev: () => {},
  submit: () => {},
  __complete: () => {}
};

const jump = <T>(state: MSFCtx<T>, step: number): MSFCtx<T> => {
  if (step < 0 || step > state.steps - 1) {
    console.warn(
      `[MSForm#jump]: ${step} is out of bounds [0..${state.steps}].`
    );
    return state;
  }

  return {
    ...state,
    step
  };
};

const next = <T>(state: MSFCtx<T>, data: Partial<T>): MSFCtx<T> => {
  if (state.step === state.steps - 1) {
    console.warn("[MSForm#next]: You are already on the last step");
    return state;
  }

  return {
    ...state,
    data: {
      ...state.data,
      ...data
    },
    step: state.step + 1
  };
};

const prev = <T>(state: MSFCtx<T>) => {
  if (state.step === 0) {
    console.warn("[MSForm#prev]: You are already on the first step");
    return state;
  }

  return jump(state, state.step - 1);
};

const submit = <T>(state: MSFCtx<T>, data: Partial<T>): MSFCtx<T> => {
  state.__complete({ ...state.data, ...data });

  return {
    ...state,
    data: {
      ...state.data,
      ...data
    }
  };
};

const actions: Actions = { jump, next, prev, submit };

function reducer<T>(state: MSFCtx<T>, { type, payload }: Action<T>) {
  return actions[type](state, payload) as MSFCtx<T>;
}

export { reducer };
