import {
  EventHandler,
  FormEvent,
  FormEventHandler,
  HTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  ReactFragment,
  forwardRef,
  useMemo
} from "react";
import { Button } from "../Button";
import clsx from "clsx";
import Form from "./Form";

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  step: number;
  count: number;
  next(): void;
  prev(): void;
  children: ReactFragment;
}

const MultistepForm = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const { children, step, next, prev, count, onSubmit, ...rest } = props;

  const isLast = step === count - 1;

  const forms = useMemo(() => {
    const childArray = Array.from(children);

    console.log(childArray);

    return childArray.map((child, i) => (
      <div
        key={i}
        className={clsx(
          "form",
          i === step ? "block" : "hidden",
          i === 0 ? "col-span-6" : "col-span-6"
        )}
      >
        {child}
      </div>
    ));
  }, [children, step]);

  const onNext: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    if (isLast && onSubmit) onSubmit(e);
    else next();
  };

  const onPrev: MouseEventHandler = e => {
    e.preventDefault();

    if (step > 0) prev();
  };

  return (
    <Form ref={ref} {...rest} onSubmit={onNext}>
      {forms}

      <div id="controls" className="grid gap-4 grid-cols-2 col-span-6">
        <div className={clsx("col-start-1", step > 0 ? "block" : "hidden")}>
          <Button size="stretch" onClick={onPrev}>
            Previous
          </Button>
        </div>
        <div className="col-start-2">
          <Button size="stretch">{isLast ? "Finish" : "Next"}</Button>
        </div>
      </div>
      <div id="caption" className="text-sm"></div>
    </Form>
  );
});

MultistepForm.displayName = "MultistepForm";

export default MultistepForm;
