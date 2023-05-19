'use client';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
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
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, ...props }, ref) => {
    const [isPasswordHidden, setPasswordHidden] = useState<boolean>(
      type === "password"
    );

    if (type !== "password") {
      return (
        <input
          ref={ref}
          type={type}
          className={`px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${className}`}
          {...props}
        />
      );
    }

    return (
      <div className="relative">
        <input
          ref={ref}
          type={isPasswordHidden ? "password" : "text"}
          className={`px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${className}`}
          {...props}
        />

        {/*
          O problema está aqui nesse botão e na interação entre form e button
          por padrão, todo button dentro de um form tem type="submit"
          e isso faz com que o onSubmit seja chamado
          para resolver isso, basta adicionar type="button" no botão
          agora o onSubmit não é mais chamado quando o password visibility é alterado
          e as mensagens de erro não aparecem mais
          e o componente não é mais re-renderizado          
        */}
        <button
          type="button"
          className="text-gray-400 absolute right-4 inset-y-0 my-auto active:text-gray-600"
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

Input.displayName = "Input";

export default Input;
