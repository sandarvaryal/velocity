// import { useEffect, useState } from "react";
// import { FieldValues, useFormContext } from "react-hook-form";

// export default function RegisterSelect({
//   name,
//   label,
// }: {
//   name: string;
//   label: string;
// }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   const errorMessage = (errors?.[name] as FieldValues)?.message;

//   return (
//     <>
//       <label htmlFor={name}>{label}</label>
//       <select {...register(name)} className="border" id={name}>
//         <option value="admin">admin</option>
//         <option value="superAdmin">superAdmin</option>
//       </select>
//       {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
//     </>
//   );
// }

//eta bata

import { useFormContext } from "react-hook-form";

export default function RegisterSelect({
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

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="font-medium text-gray-700">
        {label}
      </label>
      <select
        {...register(name)}
        id={name}
        className="border px-3 py-2  border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="admin">Admin</option>
        <option value="superAdmin">Super Admin</option>
      </select>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}
