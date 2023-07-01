"use client";
import { createElement, memo } from "react";
import {
  FieldValues,
  FormProvider as Provider,
  UseFormProps,
  UseFormReturn,
  useForm
} from "react-hook-form";

interface FormProviderProps<F extends FieldValues = FieldValues>
  extends UseFormProps<F> {
  children: (props: UseFormReturn<F>) => JSX.Element;
}

function FormProvider<F extends FieldValues = FieldValues>(
  props: FormProviderProps<F>
) {
  const { children, ...useFormProps } = props;

  const methods = useForm<F>(useFormProps);

  return <Provider {...methods}>{createElement(children, methods)}</Provider>;
}

const _FormProvider = memo(FormProvider) as typeof FormProvider;
export default _FormProvider;
