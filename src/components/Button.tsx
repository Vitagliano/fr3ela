import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

const defaultStyles = "transition rounded";

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  base: "px-4 py-2",
  md: "px-5 py-3 text-lg",
  lg: "px-6 py-3.5 text-lg",
  xl: "px-7 py-4 text-lg",
  stretch: "w-full py-3 px-5"
};

const variants = {
  primary:
    "text-white duration-150 " +
    "bg-blue-600 rounded-lg " +
    "hover:bg-blue-700 active:shadow-lg",
  secondary:
    "text-blue-600 duration-150 bg-white " +
    "border border-blue-600 rounded-lg " +
    "hover:bg-blue-600 hover:text-white active:shadow-lg",
  "hover-outline":
    "border border-blue-600 bg-blue-600 " +
    "hover:bg-transparent hover:text-blue-600 " +
    "focus:outline-none focus:ring active:text-blue-500"
};

export const Button = ({
  children,
  variant = "primary",
  size = "base",
  className,
  ...props
}: ButtonProps) => {
  const sizeClass = sizes[size];
  const variantClass = variants[variant];

  return (
    <button
      {...props}
      className={clsx(defaultStyles, sizeClass, variantClass, className)}
    >
      {children}
    </button>
  );
};
