import { FormStepsProvider, MultistepFormProvider } from "@/context/Form";
import clsx from "clsx";
import { HTMLAttributes, ReactNode, createContext } from "react";

export interface MultistepFormProps<T> extends HTMLAttributes<HTMLDivElement> {
  onCompleted(data: T): void;
  steps: ReactNode[];
  initData: T;
  initStep?: number;
}

function MultistepForm<T>(props: MultistepFormProps<T>) {
  const {
    children,
    initData,
    onCompleted,
    initStep = 0,
    steps,
    className,
    ...rest
  } = props;

  return (
    <div {...rest} className={clsx('w-full h-full overflow-hidden', className)}>
      <MultistepFormProvider<T>
        init={{
          data: initData,
          step: initStep,
          steps: steps.length
        }}
        onCompleted={onCompleted}
      >
        <FormStepsProvider steps={steps}>{children}</FormStepsProvider>
      </MultistepFormProvider>
    </div>
  );
}

export default MultistepForm;
