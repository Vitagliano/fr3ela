"use client";
import {
  ErrorMessage,
  FieldValuesFromFieldErrors
} from "@hookform/error-message";
import {
  FieldName,
  FieldValues,
  Message,
  MultipleFieldErrors,
  useFormContext
} from "react-hook-form";

type FormError = {
  message: Message;
  messages?: MultipleFieldErrors;
};

interface ErrorMessageProps<F extends FieldValues = FieldValues> {
  name: FieldName<FieldValuesFromFieldErrors<F>>;
  render?: (props: FormError) => JSX.Element;
}

function defaultRender({ message }: FormError) {
  return <span>{message}</span>;
}

function ErrorText<F extends FieldValues = FieldValues>({
  name,
  render
}: ErrorMessageProps<F>) {
  const { formState } = useFormContext<F>();

  return (
    <ErrorMessage
      name={name}
      errors={formState.errors}
      render={render ?? defaultRender}
    />
  );
}

export default ErrorText;
export type { ErrorMessageProps, FormError };
