"use client";
/* eslint-disable react/display-name */
import { PropsWithoutRef, ReactElement, createElement, memo } from "react";
import {
  FieldValues,
  UseControllerProps,
  UseControllerReturn,
  useController
} from "react-hook-form";
import Input, { InputProps } from "../Input";

type DerefInputProps = PropsWithoutRef<InputProps>;
type RenderFunctionProps<F extends FieldValues> = DerefInputProps &
  UseControllerReturn<F>;
type RenderFunction<F extends FieldValues = FieldValues> = (
  props: RenderFunctionProps<F>
) => ReactElement;

type FieldProps<F extends FieldValues> = InputProps &
  UseControllerProps<F> & {
    render?: RenderFunction<F>;
  };

function defaultRender<F extends FieldValues = FieldValues>({
  field,
  fieldState,
  formState,
  ...props
}: RenderFunctionProps<F>) {
  return <Input {...field} {...props} />;
}

function Field<F extends FieldValues>(props: FieldProps<F>) {
  const {
    name,
    defaultValue,
    render,
    rules,
    shouldUnregister,
    control,
    ...rest
  } = props;

  const controller = useController({
    name,
    defaultValue,
    control,
    rules,
    shouldUnregister
  });

  return createElement(render ?? defaultRender, {
    name,
    ...rest,
    ...controller
  });
}

const _Field = memo(Field) as typeof Field;
export default _Field;
export type { FieldProps };
