import { ReactNode } from "react";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  base: "px-4 py-2",
  md: "px-5 py-3 text-lg",
  lg: "px-6 py-3.5 text-lg",
  xl: "px-7 py-4 text-lg",
};

const variants = {
  primary:
    "text-white duration-150 " +
    "bg-indigo-600 rounded-lg " +
    "hover:bg-indigo-700 active:shadow-lg",
  secondary:
    "text-indigo-600 duration-150 bg-white " +
    "border border-indigo-600 rounded-lg " +
    "hover:bg-indigo-600 hover:text-white active:shadow-lg",
};

export const Button = ({
  children,
  variant = "primary",
  size = "base",
  className = "",
  ...props
}: ButtonProps) => {
  const sizeClass = sizes[size];
  const variantClass = variants[variant];

  return (
    <button className={`${sizeClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
