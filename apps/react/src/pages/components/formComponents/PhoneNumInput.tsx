// import { useFormContext, FieldValues } from "react-hook-form";
// import { countries } from "../../../util/countries";
// import { useEffect } from "react";

// import fieldConfigs from "../../../config/fieldConfig";

// interface PhoneInputProps {
//   name: string;
//   data: any;
//   formFor: string;
// }

// const PhoneInput = ({ name, data, formFor }: PhoneInputProps) => {
//   const {
//     register,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useFormContext();
//   const fieldName = `${formFor}.${name}`;
//   const fieldType = fieldConfigs[fieldName]?.type || "text";

//   const value = data?.[formFor]?.phoneNumber;

//   const selectedCountryString = watch(`${formFor}.country`) || "";
//   const selectedCountry = selectedCountryString.slice(
//     selectedCountryString.indexOf("[") + 1,
//     selectedCountryString.indexOf("]")
//   );
//   const selectedCountryData = countries.find(
//     (country) => country.code === selectedCountry
//   );

//   const phoneLabel = selectedCountryData
//     ? `Phone Number (${selectedCountryData.dial_code})`
//     : "Phone Number";

//   const errorMessage = (errors?.[formFor] as FieldValues)?.[name]?.message;

//   useEffect(() => {
//     if (value !== undefined) {
//       setValue(fieldName, value);
//     }
//   }, [value, fieldName, setValue]);

//   return (
//     // <div>
//     //   <label htmlFor={name}>{phoneLabel}</label>

//     //   <input
//     //     className="border"
//     //     id={name}
//     //     {...register(fieldName)}
//     //     type={fieldType}
//     //   />
//     //   {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
//     // </div>

//     <div className="flex flex-col sm:flex-row sm:items-center">
//       <label htmlFor={name} className="w-[40%]">
//         {phoneLabel}
//       </label>

//       <input
//         className="border border-gray-300 rounded w-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//         id={name}
//         {...register(fieldName)}
//         type={fieldType}
//       />
//       {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
//     </div>
//   );
// };

// export default PhoneInput;

//eta bata

import { useFormContext, FieldValues } from "react-hook-form";
import { countries } from "../../../util/countries";
import { useEffect } from "react";

import fieldConfigs from "../../../config/fieldConfig";
import { Input } from "@/components/ui/input";

interface PhoneInputProps {
  name: string;
  data: any;
  formFor: string;
}

const PhoneInput = ({ name, data, formFor }: PhoneInputProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const fieldName = `${formFor}.${name}`;
  const fieldType = fieldConfigs[fieldName]?.type || "text";

  const value = data?.[formFor]?.phoneNumber;

  const selectedCountryString = watch(`${formFor}.country`) || "";
  const selectedCountry = selectedCountryString.slice(
    selectedCountryString.indexOf("[") + 1,
    selectedCountryString.indexOf("]")
  );
  const selectedCountryData = countries.find(
    (country) => country.code === selectedCountry
  );

  const phoneLabel = selectedCountryData
    ? `Phone Number (${selectedCountryData.dial_code})`
    : "Phone Number";

  const errorMessage = (errors?.[formFor] as FieldValues)?.[name]?.message;

  useEffect(() => {
    if (value !== undefined) {
      setValue(fieldName, value);
    }
  }, [value, fieldName, setValue]);

  return (
    // <div>
    //   <label htmlFor={name}>{phoneLabel}</label>

    //   <input
    //     className="border"
    //     id={name}
    //     {...register(fieldName)}
    //     type={fieldType}
    //   />
    //   {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    // </div>

    <div className="flex flex-col sm:flex-col sm:items-center gap-2">
      <label htmlFor={name} className="w-[40%] self-start">
        {phoneLabel}
      </label>

      {/* <input
        className="border border-gray-300 rounded w-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        id={name}
        {...register(fieldName)}
        type={fieldType}
      /> */}
      <Input
        {...register(fieldName)}
        // value={value}
        defaultValue={value}
        id={name}
        type={fieldType}
        className="w-full transition-all"
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default PhoneInput;
