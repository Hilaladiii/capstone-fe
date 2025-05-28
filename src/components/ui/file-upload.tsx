
import { InputHTMLAttributes } from "react";
import {
  UseFormSetValue,
  Path,
  UseFormRegister,
  FieldError,
  FieldValues,
} from "react-hook-form";

interface FileUploadProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  file?: File;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  error?: FieldError;
  label: string;
}

export const FileUpload = <T extends FieldValues>({
  name,
  file,
  register,
  setValue,
  error,
  label,
}: FileUploadProps<T>) => {
  return (
    <div>
      <div>
        <label htmlFor={name} className="text-18">
          {label}
        </label>
      </div>
      <label
        htmlFor={name}
        className="mt-2 flex h-[200px] cursor-pointer items-center justify-center rounded-xl border border-dashed border-primary500 bg-primary50"
      >
        <div className="flex flex-col items-center gap-5">
          <div className="text-neutral500">
            {file?.name ?? (
              <>
                Arahkan file ke dalam area, atau{" "}
                <span className="text-primary500 underline">Cari Dokumen</span>
              </>
            )}
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          id={name}
          {...register(name, {
            onChange: (e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                setValue(name, files[0]);
              }
            },
          })}
        />
      </label>
      {error && (
        <span className="mt-1 text-16 text-red-500">{error.message}</span>
      )}
    </div>
  );
};
