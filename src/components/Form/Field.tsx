/* eslint-disable react/display-name */
import { PropsWithoutRef, ReactElement, createElement, memo } from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";
import Input, { InputProps } from "../Input";

type ControlRenderProps<F extends FieldValues> = Parameters<
  ControllerProps<F>["render"]
>[0];
type DerefInputProps = PropsWithoutRef<InputProps>;
type RenderFunction = (props: DerefInputProps) => ReactElement;

type FieldProps<F extends FieldValues> = Omit<ControllerProps<F>, "render"> &
  Omit<InputProps, keyof ControllerProps> & {
    render?: RenderFunction;
  };

function Field<F extends FieldValues>(props: FieldProps<F>) {
  const {
    name,
    control,
    defaultValue,
    render,
    rules,
    shouldUnregister,
    ...rest
  } = props;

  const mountRender =
    (fn: (p: DerefInputProps) => ReactElement) =>
    (ctrlProps: ControlRenderProps<F>) =>
      createElement(fn, { ...ctrlProps, ...rest, name });

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={mountRender(render ?? (Input as RenderFunction))}
    />
  );
}

export default memo(Field) as typeof Field;
export type { FieldProps };
