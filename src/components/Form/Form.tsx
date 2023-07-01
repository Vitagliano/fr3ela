"use client";
import clsx from "clsx";
import { ForwardedRef, HTMLAttributes, forwardRef, memo } from "react";
import { FieldValues, UseFormProps } from "react-hook-form";
import FormProvider from "./FormProvider";

type FormAttributes = HTMLAttributes<HTMLFormElement>;

type FormProps<F extends FieldValues = FieldValues> = (
  | {
      disableContext: true;
      onSubmit?: FormAttributes["onSubmit"];
    }
  | {
      disableContext?: false;
      onSubmit?: (data: F) => void;
    }
) &
  Omit<FormAttributes, "onSubmit"> &
  UseFormProps<F>;

function Form<F extends FieldValues = FieldValues>(
  props: FormProps<F>,
  ref: ForwardedRef<HTMLFormElement>
) {
  const {
    disableContext,
    mode,
    reValidateMode,
    defaultValues,
    values,
    resetOptions,
    resolver,
    context,
    shouldFocusError,
    shouldUnregister,
    shouldUseNativeValidation,
    progressive,
    criteriaMode,
    delayError,
    onSubmit,
    ...formProps
  } = props;

  const options = {
    mode,
    reValidateMode,
    defaultValues,
    values,
    resetOptions,
    resolver,
    context,
    shouldFocusError,
    shouldUnregister,
    shouldUseNativeValidation,
    progressive,
    criteriaMode,
    delayError
  };

  if (disableContext)
    return <form ref={ref} {...formProps} onSubmit={onSubmit} />;

  return (
    <FormProvider<F> {...options}>
      {({ handleSubmit }) => (
        <form
          ref={ref}
          {...formProps}
          onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
        />
      )}
    </FormProvider>
  );
}

const _Form = memo(forwardRef<HTMLFormElement, FormProps>(Form)) as typeof Form;
export default _Form;
export type { FormProps };
