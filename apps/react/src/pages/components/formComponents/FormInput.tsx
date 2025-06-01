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

// import { useEffect } from "react";
// import { useFormContext, FieldValues } from "react-hook-form";
// import fieldConfigs from "../../../config/fieldConfig";

// interface FormInputBoxProps {
//   index: number;
//   name: string;
//   value: any;
//   formFor?: "BookShipment" | "EditShipment";
// }

// export default function FormInputBox({
//   index,
//   name,
//   value,
//   formFor,
// }: FormInputBoxProps) {
//   const {
//     register,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useFormContext();

//   const awbNumber = watch("awbNumber") || "";
//   const lengthCm = watch(`boxes[${index}].lengthCm`) || 0;
//   const widthCm = watch(`boxes[${index}].widthCm`) || 0;
//   const heightCm = watch(`boxes[${index}].heightCm`) || 0;
//   const actualWeightKg = watch(`boxes[${index}].actualWeightKg`) || 0;
//   const division = watch(`division`) || 0;

//   const computedBoxAwbNumber = awbNumber ? `${awbNumber}-${index + 1}` : "";
//   // const computedBoxAwbNumber = `BOX-${index + 1}`;

//   const computedVolumetricWeight =
//     Math.ceil(((lengthCm * widthCm * heightCm) / division) * 2) / 2;

//   const computedChargeableWeight = Math.max(
//     Math.ceil(actualWeightKg * 2) / 2,
//     computedVolumetricWeight
//   );

//   const fieldName = `boxes[${index}].${name}`;
//   const fieldType =
//     fieldConfigs[`boxes.${name}`]?.type ??
//     (["actualWeightKg", "volumetricWeightKg", "chargeableWeightKg"].includes(
//       name
//     )
//       ? "number"
//       : "text");

//   const boxErrors = errors?.boxes as FieldValues | undefined;
//   const errorMessage = boxErrors?.[index]?.[name]?.message ?? "";

//   useEffect(() => {
//     if (name !== undefined && value !== watch(fieldName)) {
//       setValue(fieldName, value);
//     }
//   }, [name, fieldName, value, watch, setValue]);

//   useEffect(() => {
//     // if (name === "boxAwbNumber" && computedBoxAwbNumber !== watch(fieldName)) {
//     //   setValue(fieldName, computedBoxAwbNumber);
//     // } else
//     if (
//       name === "volumetricWeightKg" &&
//       computedVolumetricWeight !== watch(fieldName)
//     ) {
//       setValue(fieldName, computedVolumetricWeight);
//     } else if (
//       name === "chargeableWeightKg" &&
//       computedChargeableWeight !== watch(fieldName)
//     ) {
//       setValue(fieldName, computedChargeableWeight);
//     }
//   }, [
//     lengthCm,
//     widthCm,
//     heightCm,
//     actualWeightKg,
//     name,
//     fieldName,
//     computedBoxAwbNumber,
//     computedChargeableWeight,
//     computedVolumetricWeight,
//     watch,
//     setValue,
//   ]);

//   const formForBoxAwbNumber =
//     formFor === "BookShipment" ? `BOX-${index + 1}` : "";

//   const computedValues: any = {
//     // boxAwbNumber: computedBoxAwbNumber,
//     // boxAwbNumber: formForBoxAwbNumber,
//     volumetricWeightKg: computedVolumetricWeight,
//     chargeableWeightKg: computedChargeableWeight,
//     ...(formFor === "BookShipment"
//       ? { boxAwbNumber: formForBoxAwbNumber }
//       : {}),
//   };

//   const renderInputField = () => {
//     if (name in computedValues) {
//       return (
//         <>
//           <span className="bg-neutral-50 border border-gray-300  px-2 py-1 outline-none">
//             {computedValues[name]}
//           </span>
//           <input type="hidden" {...register(fieldName)} readOnly />
//         </>
//       );
//     }

//     return (
//       <input
//         {...register(fieldName)}
//         className={`border px-2 py-1 text-center ${errorMessage ? "border-red-500" : "border border-gray-400"}`}
//         type={fieldType}
//         // step={fieldType === "number" ? "any" : undefined}
//       />
//     );
//   };

//   return <>{renderInputField()}</>;
// }

//eta bata

import { useEffect } from "react";
import { useFormContext, FieldValues } from "react-hook-form";

import fieldConfigs from "../../../config/fieldConfig";

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
    <div className="flex sm:items-center flex-col sm:flex-row">
      <label htmlFor={name} className="font-medium w-[40%] text-gray-700">
        {label}
      </label>
      <input
        {...register(fieldName)}
        id={name}
        type={fieldType}
        className="border w-full border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
    </div>
  );
}
