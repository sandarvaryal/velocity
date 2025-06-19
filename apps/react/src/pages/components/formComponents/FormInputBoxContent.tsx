// step={fieldType === "number" ? "any" : undefined}
// //eta bata

// import { useEffect } from "react";
// import { useFormContext, FieldValues } from "react-hook-form";
// import fieldConfigs from "../../../config/fieldConfig";

// interface FormInputDetailProps {
//   boxIndex: number;
//   index: number;
//   name: string;
//   value: any;
// }

// export default function FormInputBoxContent({
//   boxIndex,
//   index,
//   name,
//   value,
// }: FormInputDetailProps) {
//   const {
//     register,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useFormContext();

//   const fieldName = `boxes[${boxIndex}].BoxesContent[${index}].${name}`;
//   const fieldType =
//     fieldConfigs[`boxes.BoxesContent.${name}`]?.type ??
//     (["quantity", "unitRate", "total"].includes(name) ? "number" : "text");

//   const boxErrors = errors?.boxes as FieldValues | undefined;
//   const errorMessage =
//     boxErrors?.[boxIndex]?.BoxesContent?.[index]?.[name]?.message ?? "";

//   const quantity =
//     watch(`boxes[${boxIndex}].BoxesContent[${index}].quantity`) || 0;
//   const rate = watch(`boxes[${boxIndex}].BoxesContent[${index}].unitRate`) || 0;
//   const computedTotal = rate * quantity;

//   const watchedValue = watch(fieldName);

//   useEffect(() => {
//     if (name === "total") {
//       if (computedTotal !== watchedValue) {
//         setValue(fieldName, computedTotal);
//       }
//     } else if (watchedValue === undefined || watchedValue === "") {
//       setValue(fieldName, value);
//     }
//   }, [fieldName, name, value, setValue, computedTotal, watchedValue]);

//   const renderInputField = () => {
//     if (name === "total") {
//       return (
//         <>
//           <span className="px-1 py-2 bg-neutral-50 border border-gray-300">
//             {computedTotal}
//           </span>
//           <input type="hidden" {...register(fieldName)} readOnly />
//         </>
//       );
//     }

//     return (
//       <input
//         {...register(fieldName)}
//         className={`border px-1 py-2 w-full ${errorMessage ? "border-red-500" : " border border-gray-300"}`}
//         type={fieldType}
//         step={fieldType === "number" ? "any" : undefined}
//       />
//     );
//   };

//   return <>{renderInputField()}</>;
// }

//eta bata

import { useEffect } from "react";
import { useFormContext, FieldValues } from "react-hook-form";
import fieldConfigs from "../../../config/fieldConfig";
import { Input } from "@/components/ui/input";

interface FormInputDetailProps {
  boxIndex: number;
  index: number;
  name: string;
  value: any;
}

export default function FormInputBoxContent({
  boxIndex,
  index,
  name,
  value,
}: FormInputDetailProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const fieldName = `boxes[${boxIndex}].BoxesContent[${index}].${name}`;
  const fieldType =
    fieldConfigs[`boxes.BoxesContent.${name}`]?.type ??
    (["quantity", "unitRate", "total"].includes(name) ? "number" : "text");

  const boxErrors = errors?.boxes as FieldValues | undefined;
  const errorMessage =
    boxErrors?.[boxIndex]?.BoxesContent?.[index]?.[name]?.message ?? "";

  const quantity =
    watch(`boxes[${boxIndex}].BoxesContent[${index}].quantity`) || 0;
  const rate = watch(`boxes[${boxIndex}].BoxesContent[${index}].unitRate`) || 0;
  const computedTotal = rate * quantity;

  const watchedValue = watch(fieldName);

  useEffect(() => {
    if (name === "total") {
      if (computedTotal !== watchedValue) {
        setValue(fieldName, computedTotal);
      }
    } else if (watchedValue === undefined || watchedValue === "") {
      setValue(fieldName, value);
    }
  }, [fieldName, name, value, setValue, computedTotal, watchedValue]);

  const renderInputField = () => {
    if (name === "total") {
      return (
        <>
          <span className="px-1 text-center py-2 rounded-2xl bg-sidebar border-2">
            {computedTotal}
          </span>
          <input type="hidden" {...register(fieldName)} readOnly />
        </>
      );
    }

    return (
      // <input
      //   {...register(fieldName)}
      //   className={`border px-1 text-center py-2 w-full ${errorMessage ? "border-red-500" : " border border-gray-300"}`}
      //   type={fieldType}
      //   step={fieldType === "number" ? "any" : undefined}
      // />
      <Input
        // value={value}
        defaultValue={value}
        {...register(fieldName)}
        className={`px-1 text-center py-2 w-full border-2 ${errorMessage ? "border-destructive" : ""}`}
        type={fieldType}
        step={fieldType === "number" ? "any" : undefined}
      />
    );
  };

  return <>{renderInputField()}</>;
}
