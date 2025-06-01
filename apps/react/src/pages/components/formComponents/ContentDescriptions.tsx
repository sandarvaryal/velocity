import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface FormInputProps {
  data: any;
}

export default function ContentDescriptions({ data }: FormInputProps) {
  const {
    register,
    // formState: { errors },
    setValue,
  } = useFormContext();

  const fieldName = `contentDescriptions`;

  const value = data?.contentDescriptions || "";

  //   const errorMessage = (errors?.[formFor] as FieldValues)?.[name]?.message;
  // const errorMessage:any = errors?.contentDescriptions?.message;

  useEffect(() => {
    if (value !== undefined) {
      setValue(fieldName, value);
    }
  }, [value, fieldName, setValue]);

  return (
    <div>
      <input
        {...register(fieldName)}
        type="text"
        className="flex flex-wrap items-center bg-gray-50 min-h-11 h-full    px-2 py-1 outline-none w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        placeholder="Enter Boxes Description"
      />
      {/* {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>} */}
    </div>
  );
}
