import { InputHTMLAttributes } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<T>;
  name: Path<T>;
  errors?: FieldError;
  label: string;
  className?: string;
}

export const Input = <T extends FieldValues>({
  register,
  errors,
  name,
  label,
  className,
  ...props
}: InputProps<T>) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold text-base">
        {label}
      </label>
      <input
        id={name}
        type="text"
        {...props}
        {...register(name)}
        className={`border-2 border-borderDefault py-2.5 p-4 w-full max-w-[25rem] rounded-lg placeholder:text-tertiary focus:outline-none focus:ring-1 focus:ring-primary ${className}`}
      />
      {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>
  );
};
