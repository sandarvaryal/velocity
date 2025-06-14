// import { useEffect } from "react";
// import { useFormContext, FieldValues } from "react-hook-form";

// import fieldConfigs from "../../../config/fieldConfig";

// interface FormInputProps {
//   name: string;
//   label: string;
//   formFor: string;
//   data: any;
//   type?: string;
// }

// export default function FormInput({
//   name,
//   label,
//   formFor,
//   data,
// }: FormInputProps) {
//   const {
//     register,
//     formState: { errors },
//     setValue,
//   } = useFormContext();

//   const fieldName = `${formFor}.${name}`;
//   const fieldType = fieldConfigs[fieldName]?.type || "text";

//   const value = data?.[formFor]?.[name] || "";

//   const errorMessage = (errors?.[formFor] as FieldValues)?.[name]?.message;

//   useEffect(() => {
//     if (value !== undefined) {
//       setValue(fieldName, value);
//     }
//   }, [value, fieldName, setValue]);

//   return (
//     <div className="flex sm:items-center flex-col sm:flex-row">
//       <label htmlFor={name} className="font-medium w-[40%] text-gray-700">
//         {label}
//       </label>
//       <input
//         {...register(fieldName)}
//         id={name}
//         type={fieldType}
//         className="border w-full border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//       />
//       {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
//     </div>
//   );
// }

//eta bata

import { useEffect } from "react";
import { useFormContext, FieldValues } from "react-hook-form";

import fieldConfigs from "../../../config/fieldConfig";
import { Input } from "@/components/ui/input";

interface FormInputProps {
  name: string;
  label: string;
  formFor: string;
  data: any;
  type?: string;
}

export default function FormInput({
  name,
  label,
  formFor,
  data,
}: FormInputProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const fieldName = `${formFor}.${name}`;
  const fieldType = fieldConfigs[fieldName]?.type || "text";

  const value = data?.[formFor]?.[name] || "";

  const errorMessage = (errors?.[formFor] as FieldValues)?.[name]?.message;

  useEffect(() => {
    if (value !== undefined) {
      setValue(fieldName, value);
    }
  }, [value, fieldName, setValue]);

  return (
    <div className="flex sm:items-center flex-col sm:flex-col gap-2">
      <label htmlFor={name} className="font-medium w-[40%] self-start">
        {label}
      </label>
      {/* <input
        {...register(fieldName)}
        id={name}
        type={fieldType}
        className="border w-full border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      /> */}
      <Input
        {...register(fieldName)}
        id={name}
        // value={value}
        defaultValue={value}
        type={fieldType}
        className={`w-full transition-all ${errorMessage ? "border-destructive" : ""}`}
      />
      {/* {errorMessage && (
        <p className="text-destructive text-xs">{errorMessage}</p>
      )} */}
      {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
    </div>
  );
}
