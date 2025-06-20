import { useEffect, useState } from "react";
import { useFormContext, FieldValues } from "react-hook-form";
import axios from "axios";
import CreatableSelect from "react-select/creatable";

interface LocationInputProps {
  name: string;
  label: string;
  formFor: string;
  data: any;
}

const LocationInput = ({ name, label, formFor, data }: LocationInputProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [cityOptions, setCityOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [stateOptions, setStateOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [stateInputValue, setStateInputValue] = useState("");
  const [cityInputValue, setCityInputValue] = useState("");
  const [initialDataPrimary, setInitialDataPrimary] = useState<
    { label: string; value: string }[]
  >([]);

  const fieldName = `${formFor}.${name}`;
  const selectedCountry = watch(`${formFor}.country`);
  const selectedState = watch(`${formFor}.state`);
  const postalCode = watch(`${formFor}.zip`);
  const currentValue = watch(fieldName) || data?.[formFor]?.[name] || "";

  useEffect(() => {
    if (data) {
      setValue(`${formFor}.city`, data?.[formFor]?.city || "");
      setValue(`${formFor}.state`, data?.[formFor]?.state || "");
    }
  }, [data, setValue, formFor]);

  useEffect(() => {
    if (postalCode || selectedCountry) {
      setHasFetched(false);
    }
  }, [postalCode, selectedCountry]);

  useEffect(() => {
    if (!postalCode || !selectedCountry || hasFetched) return;

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/getInfoBy`,
        { country: selectedCountry, postalCode },
        { withCredentials: true }
      )
      .then((response) => {
        const dataPrimary = response.data?.dataPrimary || [];

        const options = dataPrimary.map(
          (item: { placeName: string; adminName1: string }) => ({
            label: label === "City" ? item.placeName : item.adminName1,
            value: label === "City" ? item.placeName : item.adminName1,
          })
        );

        setInitialDataPrimary(options);

        if (!currentValue && dataPrimary.length > 0) {
          setValue(`${formFor}.city`, dataPrimary[0].placeName);
          setValue(`${formFor}.state`, dataPrimary[0].adminName1);
        }

        setHasFetched(true);
      })
      .catch((error) => console.error("Error fetching location data:", error));
  }, [
    postalCode,
    selectedCountry,
    hasFetched,
    label,
    setValue,
    formFor,
    currentValue,
  ]);

  const countryAfter = selectedCountry
    ? selectedCountry.split("]")[1]?.trim() || selectedCountry
    : "";

  useEffect(() => {
    if (!stateInputValue || !countryAfter) return;

    axios
      .post(`https://countriesnow.space/api/v0.1/countries/states`, {
        country: countryAfter,
      })
      .then(({ data: wholeData }) => {
        const dataStates = wholeData.data?.states || [];

        setStateOptions(
          dataStates
            .filter((state: any) =>
              state.name.toLowerCase().includes(stateInputValue.toLowerCase())
            )
            .map((state: any) => ({ label: state.name, value: state.name }))
        );
      })
      .catch((error) => console.error("Error fetching states:", error));
  }, [stateInputValue, countryAfter]);

  useEffect(() => {
    if (!cityInputValue || !countryAfter || !selectedState) return;

    axios
      .post(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
        country: countryAfter,
        state: selectedState,
      })
      .then(({ data }) => {
        setCityOptions(
          (data.data || [])
            .filter((city: string) =>
              city.toLowerCase().includes(cityInputValue.toLowerCase())
            )
            .map((city: string) => ({ label: city, value: city }))
        );
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }, [cityInputValue, selectedState, countryAfter]);

  const getOptions = () => {
    if (label === "City")
      return cityInputValue ? cityOptions : initialDataPrimary;
    return stateInputValue ? stateOptions : initialDataPrimary;
  };

  const getCurrentOption = () => {
    const options = getOptions();
    return (
      options.find((option) => option.value === currentValue) ||
      (currentValue ? { label: currentValue, value: currentValue } : null)
    );
  };

  const errorMessage = (errors?.[formFor] as FieldValues)?.[name]?.message;

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
    // <div className="form-group">
    //   <label htmlFor={fieldName}>{label}</label>
    //   <CreatableSelect
    //     value={getCurrentOption()}
    //     options={getOptions()}
    //     onInputChange={(value) =>
    //       label === "State"
    //         ? setStateInputValue(value)
    //         : setCityInputValue(value)
    //     }
    //     onChange={(selectedOption) => {
    //       setValue(fieldName, selectedOption?.value || "");
    //     }}
    //     isClearable
    //     isSearchable
    //   />
    //   {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    // </div>

    <div className="form-group flex sm:items-center flex-col sm:flex-col gap-2">
      <label htmlFor={fieldName} className="w-[40%] self-start">
        {label}
      </label>
      <CreatableSelect
        styles={shadcnStyles}
        value={getCurrentOption()}
        options={getOptions()}
        onInputChange={(value) =>
          label === "State"
            ? setStateInputValue(value)
            : setCityInputValue(value)
        }
        onChange={(selectedOption) => {
          setValue(fieldName, selectedOption?.value || "");
        }}
        isClearable
        isSearchable
        className="w-full"
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default LocationInput;
