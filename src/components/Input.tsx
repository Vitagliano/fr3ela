"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useState
} from "react";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  className?: string;
  sizing?: keyof typeof sizes;
  label?: string;
};

const sizes = {
  sm: "px-2 py-1 text-sm rounded-md",
  base: "px-3 py-2 rounded-lg"
};

const inputStyle =
  "text-gray-500 bg-transparent outline-none border focus:border-blue-600";

const labelStyle = "block text-sm font-medium";

const RegularInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", sizing = "base", label, ...props }, ref) => (
    <input
      ref={ref}
      className={clsx(
        inputStyle,
        sizes[sizing],
        label ? "mt-1" : "",
        className
      )}
      {...props}
    />
  )
);

RegularInput.displayName = "RegularInput";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", sizing = "base", label, ...props }, ref) => {
    const [isPasswordHidden, setPasswordHidden] = useState(true);

    return (
      <div className={clsx("relative", label ? "mt-1" : "")}>
        <input
          ref={ref}
          className={clsx(inputStyle, sizes[sizing], className)}
          {...props}
          type={isPasswordHidden ? "password" : "text"}
        />

        <button
          type="button"
          className="text-gray-400 absolute right-2 inset-y-0 h-min my-auto active:text-gray-600"
          onClick={() => setPasswordHidden(!isPasswordHidden)}
        >
          {isPasswordHidden ? (
            <EyeIcon className="h-6 w-6 cursor-pointer" />
          ) : (
            <EyeSlashIcon className="h-6 w-6 cursor-pointer" />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, ...props }, ref) => {
    const input =
      type !== "password" ? (
        // @ts-expect-error TODO FIX TYPE LATER
        <RegularInput ref={ref} type={type} {...props} />
      ) : (
        // @ts-expect-error TODO FIX TYPE LATER
        <PasswordInput ref={ref} {...props} />
      );

    const label = props.label ? (
      <label className={labelStyle} htmlFor={props.id}>
        {props.label}
      </label>
    ) : null;

    return (
      <>
        {label}
        {input}
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;
