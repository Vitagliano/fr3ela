import clsx from "clsx";
import {
  FC,
  ForwardRefExoticComponent,
  HTMLAttributes,
  forwardRef
} from "react";

interface FormProps extends HTMLAttributes<HTMLFormElement> {}

const defaultStyles =
  "mt-8 lg:mt-0 card-darker grid grid-cols-6 gap-5 w-full lg:gap-6 text-gray-700 dark:text-inherit";

const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => (
    <form ref={ref} {...props} className={clsx(defaultStyles, className)} />
  )
);

Form.displayName = "Form";

export default Form;
