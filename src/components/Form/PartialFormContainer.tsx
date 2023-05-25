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
  const { step, steps: count } = useMultistepForm();

  const wrappedSteps = useMemo(
    () =>
      steps.map((el, i) => (
        <div
          key={i}
          className={clsx(
            "form card-darker",
            step === i && "active",
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
    <div {...rest} className={clsx("relative contents", className)}>
      {wrappedSteps}
    </div>
  );
}

export default PartialFormContainer;
