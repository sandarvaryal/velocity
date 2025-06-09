import { useFormContext, FieldValues } from "react-hook-form";
import Selected, { SingleValue } from "react-select";
import { countries } from "../../../util/countries";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CountrySelectProps {
  name: string;
  label: string;
  formFor: string;
  data: any;
}

const CountrySelect = ({ data, name, label, formFor }: CountrySelectProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const fieldName = `${formFor}.${name}`;

  const selectedCountry = watch(fieldName) || data?.[formFor]?.[name] || "";

  // const [searchQuery, setSearchQuery] = useState<string>(selectedCountry || "");

  const countryOptions = countries.map((country) => ({
    value: `[${country.code}] ${country.name}`,
    label: `[${country.code}] ${country.name}`,
  }));

  useEffect(() => {
    if (selectedCountry) {
      setValue(fieldName, selectedCountry);
    }
  }, [selectedCountry, setValue, fieldName]);

  const errorMessage = (errors?.[formFor] as FieldValues)?.[name]?.message;

  const handleChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (selectedOption) {
      setValue(fieldName, selectedOption.value);
      // setSearchQuery(selectedOption.label || "");
    }
  };

  const shadcnStyles = {
    control: (baseStyles: any, state: any) => ({
      ...baseStyles,
      borderRadius: "0.375rem",
      borderColor: state.isFocused ? "#f97316" : "#d1d5db",
      borderWidth: "1px",
      backgroundColor: "white",
      boxShadow: state.isFocused
        ? "2PX 2px 10px 2px rgba(249, 115, 22, 0.2)"
        : "0 1px 2px rgba(0, 0, 0, 0.05)",
      transition: "all 150ms ease-in-out",

      fontSize: "0.875rem",
      lineHeight: "1.25rem",
      "&:hover": {
        borderColor: state.isFocused ? "#f97316" : "#fed7aa",
      },
    }),
    menu: (baseStyles: any) => ({
      ...baseStyles,
      marginTop: "0.25rem",
      backgroundColor: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "0.375rem",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
      animation: "slideIn 0.2s ease-out",
      zIndex: 10,
    }),
    option: (
      baseStyles: any,
      { isSelected, isFocused }: { isSelected: any; isFocused: any }
    ) => ({
      ...baseStyles,
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
      cursor: "pointer",
      backgroundColor: isSelected
        ? "#f97316"
        : isFocused
          ? "#fff7ed"
          : "transparent",
      color: isSelected ? "white" : "#111827",
      transition: "background-color 150ms ease-in-out",
      "&:hover": {
        backgroundColor: isSelected ? "#f97316" : "#fff7ed",
      },
    }),
    singleValue: (baseStyles: any) => ({
      ...baseStyles,
      color: "#111827",
      fontSize: "0.875rem",
    }),
    placeholder: (baseStyles: any) => ({
      ...baseStyles,
      color: "#9ca3af",
      fontSize: "0.875rem",
    }),
    dropdownIndicator: (
      baseStyles: any,
      { isFocused }: { isFocused: any }
    ) => ({
      ...baseStyles,
      color: isFocused ? "#f97316" : "#9ca3af",
      transition: "color 150ms ease-in-out",
      "&:hover": {
        color: "#f97316",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    input: (baseStyles: any) => ({
      ...baseStyles,
      color: "#111827",
      fontSize: "0.875rem",
    }),
  };

  return (
    // <div>
    //   <label htmlFor={name}>{label}</label>
    //   <div className="relative">
    //     <Selected
    //       id={name}
    //       name={fieldName}
    //       options={countryOptions}
    //       value={
    //         countryOptions.find((option) => option.value === selectedCountry) ||
    //         null
    //       }
    //       onChange={handleChange}
    //       onInputChange={(inputValue) => setSearchQuery(inputValue)}
    //       placeholder="Type to search countries"
    //       className="border"
    //       isSearchable
    //     />
    //   </div>
    //   {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    // </div>

    <div className="flex sm:items-center flex-col sm:flex-col gap-2">
      <label className="w-[40%] self-start" htmlFor={name}>
        {label}
      </label>
      <div className="relative w-full">
        <Selected
          styles={shadcnStyles}
          // {{
          //   control: (baseStyles, state) => ({
          //     ...baseStyles,
          //     borderRadius: "0.5rem",
          //     backgroundColor: "transparent",
          //   }),
          // }}
          id={name}
          name={fieldName}
          options={countryOptions}
          value={
            countryOptions.find((option) => option.value === selectedCountry) ||
            null
          }
          onChange={handleChange}
          // onInputChange={(inputValue) => setSearchQuery(inputValue)}
          placeholder="Type to search countries"
          isSearchable
        />
      </div>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default CountrySelect;
