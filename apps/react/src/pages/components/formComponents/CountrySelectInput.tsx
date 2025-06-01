import { useFormContext, FieldValues } from "react-hook-form";
import Selected, { SingleValue } from "react-select";
import { countries } from "../../../util/countries";
import { useEffect } from "react";

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

    <div className="flex sm:items-center flex-col sm:flex-row">
      <label className="w-[40%]" htmlFor={name}>
        {label}
      </label>
      <div className="relative w-full">
        <Selected
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
