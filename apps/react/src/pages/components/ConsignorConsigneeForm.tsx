// import FormInput from "./formComponents/FormInput";
// import PhoneInput from "./formComponents/PhoneNumInput";
// import CountrySelect from "./formComponents/CountrySelectInput";
// import LocationInput from "./formComponents/LocationInput";

// export default function ConsignorConsigneeForm({
//   data,
//   formFor,
// }: {
//   data: any;
//   formFor: string;
// }) {
//   return (
//     <>
//       <div className="flex flex-col gap-3 mt-2">
//         <div>
//           <FormInput
//             name="company"
//             label="Company"
//             formFor={formFor}
//             data={data}
//           />
//         </div>
//         <div>
//           <FormInput name="name" label="Name" formFor={formFor} data={data} />
//         </div>
//         <div>
//           <CountrySelect
//             name="country"
//             label="Country"
//             formFor={formFor}
//             data={data}
//           />
//         </div>
//         <div>
//           <FormInput
//             name="address1"
//             label="Address1"
//             formFor={formFor}
//             data={data}
//           />
//         </div>
//         <div>
//           <FormInput
//             name="address2"
//             label="Address2"
//             formFor={formFor}
//             data={data}
//           />
//         </div>
//         <div>
//           <FormInput
//             name="zip"
//             label="Postal Code"
//             formFor={formFor}
//             data={data}
//           />
//         </div>

//         <div>
//           <LocationInput
//             name="state"
//             label="State"
//             formFor={formFor}
//             data={data}
//           />
//           <div className="mt-3">
//             <LocationInput
//               name="city"
//               label="City"
//               formFor={formFor}
//               data={data}
//             />
//           </div>
//         </div>
//         <div>
//           <PhoneInput name="phoneNumber" formFor={formFor} data={data} />{" "}
//         </div>

//         <div>
//           <FormInput name="email" label="Email" formFor={formFor} data={data} />
//         </div>
//       </div>
//     </>
//   );
// }

//eta bata

// import FormInput from "./formComponents/FormInput";
// import PhoneInput from "./formComponents/PhoneNumInput";
// import CountrySelect from "./formComponents/CountrySelectInput";
// import LocationInput from "./formComponents/LocationInput";
// import { useFormContext } from "react-hook-form";

// export default function ConsignorConsigneeForm({
//   data,
//   formFor,
// }: {
//   data: any;
//   formFor: string;
// }) {
//   const { watch } = useFormContext();
//   const addressData = watch(`${formFor}.address1`) || "";
//   const zipData = watch(`${formFor}.zip`) || "";
//   const cityData = watch(`${formFor}.city`) || "";
//   const stateData = watch(`${formFor}.stateData`) || "";
//   const countryData = watch(`${formFor}.country`) || "";
//   const formattedAddress = [
//     addressData,
//     cityData,
//     stateData,
//     zipData,
//     countryData,
//   ]
//     .filter(Boolean)
//     .join(", ");
//   const handleSearch = () => {
//     if (formattedAddress) {
//       const query = encodeURIComponent(formattedAddress);
//       window.open(`https://www.google.com/search?q=${query}`, "_blank");
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col gap-3 mt-2">
//         <div>
//           <FormInput
//             name="company"
//             label="Company"
//             formFor={formFor}
//             data={data}
//           />
//         </div>
//         <div>
//           <FormInput name="name" label="Name" formFor={formFor} data={data} />
//         </div>
//         <div>
//           <CountrySelect
//             name="country"
//             label="Country"
//             formFor={formFor}
//             data={data}
//           />
//         </div>
//         <div>
//           <FormInput
//             name="address1"
//             label="Address1"
//             formFor={formFor}
//             data={data}
//           />
//         </div>
//         <div>
//           <FormInput
//             name="address2"
//             label="Address2"
//             formFor={formFor}
//             data={data}
//           />
//         </div>
//         <div>
//           <FormInput
//             name="zip"
//             label="Postal Code"
//             formFor={formFor}
//             data={data}
//           />
//         </div>

//         <div>
//           <LocationInput
//             name="state"
//             label="State"
//             formFor={formFor}
//             data={data}
//           />
//           <div className="mt-3">
//             <LocationInput
//               name="city"
//               label="City"
//               formFor={formFor}
//               data={data}
//             />
//           </div>
//         </div>
//         <div>
//           <PhoneInput name="phoneNumber" formFor={formFor} data={data} />{" "}
//         </div>

//         <div>
//           <FormInput name="email" label="Email" formFor={formFor} data={data} />
//         </div>

//         <div>
//           <span className="border">{formattedAddress || ""}</span>
//           <button
//             type="button"
//             onClick={handleSearch}
//             className="border cursor-pointer"
//             disabled={!formattedAddress}
//           >
//             Search
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

//eta bata

import FormInput from "./formComponents/FormInput";
import PhoneInput from "./formComponents/PhoneNumInput";
import CountrySelect from "./formComponents/CountrySelectInput";
import LocationInput from "./formComponents/LocationInput";
import { useFormContext } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

export default function ConsignorConsigneeForm({
  data,
  formFor,
}: {
  data: any;
  formFor: string;
}) {
  const { watch } = useFormContext();
  const addressData1 = watch(`${formFor}.address1`) || "";
  const addressData2 = watch(`${formFor}.address2`) || "";
  const zipData = watch(`${formFor}.zip`) || "";
  const cityData = watch(`${formFor}.city`) || "";
  const stateData = watch(`${formFor}.state`) || "";
  const countryData = watch(`${formFor}.country`) || "";
  const formattedAddress = [
    addressData1,
    addressData2,
    cityData,
    stateData,
    zipData,
    countryData,
  ]
    .filter(Boolean)
    .join(", ");
  const handleSearch = () => {
    if (formattedAddress) {
      const query = encodeURIComponent(formattedAddress);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 mt-2">
        <div>
          <FormInput
            name="company"
            label="Company"
            formFor={formFor}
            data={data}
          />
        </div>
        <div>
          <FormInput name="name" label="Name" formFor={formFor} data={data} />
        </div>
        <div>
          <CountrySelect
            name="country"
            label="Country"
            formFor={formFor}
            data={data}
          />
        </div>
        <div>
          <FormInput
            name="address1"
            label="Address1"
            formFor={formFor}
            data={data}
          />
        </div>
        <div>
          <FormInput
            name="address2"
            label="Address2"
            formFor={formFor}
            data={data}
          />
        </div>
        <div>
          <FormInput
            name="zip"
            label="Postal Code"
            formFor={formFor}
            data={data}
          />
        </div>
        <div>
          <LocationInput
            name="state"
            label="State"
            formFor={formFor}
            data={data}
          />
          <div className="mt-3">
            <LocationInput
              name="city"
              label="City"
              formFor={formFor}
              data={data}
            />
          </div>
        </div>
        <div>
          <PhoneInput name="phoneNumber" formFor={formFor} data={data} />{" "}
        </div>
        <div>
          <FormInput name="email" label="Email" formFor={formFor} data={data} />
        </div>

        <div className="flex items-center gap-1  ">
          <span className="px-4 py-1 border text-sm border-gray-300 bg-white text-gray-700 w-full">
            {formattedAddress || "No address"}
          </span>
          <button
            type="button"
            onClick={handleSearch}
            className="p-2 text-white  bg-[#00AEE4] hover:bg-[#0089e4] disabled:bg-gray-400  transition-all cursor-pointer"
            disabled={!formattedAddress}
          >
            <FaSearch className="text-sm" />
          </button>
        </div>
      </div>
    </>
  );
}
