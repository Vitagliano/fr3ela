'use client';
import { FieldValues } from "react-hook-form";
import { ErrorMessage, Field, Form, FormProps, FormProvider } from ".";

function createForm<F extends FieldValues = FieldValues>(
  options?: FormProps<F>
) {
  return {
    // @ts-ignore
    Form: (props: FormProps<F>) => <Form<F> {...options} {...props} />,
    FormProvider: FormProvider<F>,
    Field: Field<F>,
    ErrorMessage: ErrorMessage<F>
  };
}

export default createForm;
