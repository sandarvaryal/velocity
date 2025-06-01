import { useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterFormInput({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = (errors?.[name] as FieldValues)?.message;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center gap-2 relative w-full">
      <label className="w-[30%]" htmlFor={name}>
        {label}
      </label>
      <div className="relative w-[70%]">
        <input
          {...register(name)}
          className="border w-full px-4 py-1 border-gray-400 pr-10"
          id={name}
          type={name === "password" && !showPassword ? "password" : "text"}
        />
        {name === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}
