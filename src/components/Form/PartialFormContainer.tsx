import { useFormSteps, useMultistepForm } from "@/context/Form";
import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes, useMemo } from "react";
import "./PartialFormStyles.css";

export type PartialFormContainerProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "children"
>;

function PartialFormContainer(props: PartialFormContainerProps) {
  const { className, ...rest } = props;
  const steps = useFormSteps();
  const { step } = useMultistepForm();

  const wrappedSteps = useMemo(
    () =>
      steps.map((el, i) => (
        <div
          key={i}
          id={`form-step-${i}`}
          className={clsx(
            "w-full transition-all duration-700 ease-in-out absolute -translate-y-1/2 top-1/2 card-darker",
            step === i && "active delay-200",
            step < i && "right",
            step > i && "left"
          )}
        >
          {el}
        </div>
      )),
    [steps, step]
  );

  return (
    <div {...rest} className={clsx("lg:relative mx-auto h-full", className)}>
      {wrappedSteps}
    </div>
  );
}

export default PartialFormContainer;
