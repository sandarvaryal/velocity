// import { useEffect, useState } from "react";
// import { useFormContext, FieldValues } from "react-hook-form";
// import * as XLSX from "xlsx";
// import CreatableSelect from "react-select/creatable";

// interface ProductHsCodeProps {
//   boxIndex: number;
//   index: number;
// }

// const DescHsCode = ({ boxIndex, index }: ProductHsCodeProps) => {
//   const {
//     setValue,
//     watch,
//     formState: { errors },
//     register,
//   } = useFormContext();

//   const [productOptions, setProductOptions] = useState<
//     { label: string; value: string }[]
//   >([]);
//   const [productToHsMap, setProductToHsMap] = useState<Record<string, string>>(
//     {}
//   );

//   const fieldNameDescription = `boxes[${boxIndex}].BoxesContent[${index}].description`;
//   const fieldNameHsCode = `boxes[${boxIndex}].BoxesContent[${index}].HsCode`;

//   const selectedProduct = watch(fieldNameDescription) || "";
//   const selectedHsCode = watch(fieldNameHsCode) || "";

//   useEffect(() => {
//     fetch("/HsnCodes-148503923498234.xlsx")
//       .then((res) => res.arrayBuffer())
//       .then((buffer) => {
//         const workbook = XLSX.read(buffer, { type: "array" });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = XLSX.utils.sheet_to_json(
//           workbook.Sheets[sheetName]
//         ) as any[];

//         const options: { label: string; value: string }[] = [];
//         const map: Record<string, string> = {};

//         sheet.forEach((row) => {
//           const productKey = Object.keys(row).find((key) =>
//             key.toLowerCase().includes("product")
//           );
//           const hsCodeKey = Object.keys(row).find((key) =>
//             key.toLowerCase().includes("hs code")
//           );

//           if (productKey && hsCodeKey) {
//             const productName = String(row[productKey]).trim();
//             const hsCode = String(row[hsCodeKey]).trim();

//             if (productName && hsCode) {
//               options.push({ label: productName, value: productName });
//               map[productName] = hsCode;
//             }
//           }
//         });

//         setProductOptions(options);
//         setProductToHsMap(map);
//       })
//       .catch((error) => console.error("Error loading Excel:", error));
//   }, []);

//   useEffect(() => {
//     if (selectedProduct && !selectedHsCode && !selectedProduct.trim()) {
//       setValue(fieldNameHsCode, productToHsMap[selectedProduct] || "");
//     }
//   }, [
//     selectedProduct,
//     selectedHsCode,
//     productToHsMap,
//     setValue,
//     fieldNameHsCode,
//   ]);

//   const boxErrors = errors?.boxes as FieldValues | undefined;
//   const errorMessageDesc =
//     boxErrors?.[boxIndex]?.BoxesContent?.[index]?.description?.message ?? "";
//   const errorMessageHs =
//     boxErrors?.[boxIndex]?.BoxesContent?.[index]?.HsCode?.message ?? "";

//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <>
//       <div>
//         <CreatableSelect
//           className={`${errorMessageDesc ? "border-red-500" : "border"}`}
//           value={
//             selectedProduct
//               ? { label: selectedProduct, value: selectedProduct }
//               : null
//           }
//           options={productOptions}
//           onChange={(selectedOption) => {
//             const product = selectedOption?.value || "";
//             setValue(fieldNameDescription, product);
//             setValue(fieldNameHsCode, productToHsMap[product] || "");
//           }}
//           isClearable
//           isSearchable
//           menuIsOpen={menuOpen}
//           filterOption={(option, input) =>
//             option.label.toLowerCase().includes(input.toLowerCase())
//           }
//           onInputChange={(input, actionMeta) => {
//             if (actionMeta.action === "input-change" && input.length > 0) {
//               setMenuOpen(true);
//             } else if (input.length === 0) {
//               setMenuOpen(false);
//             }
//           }}
//         />
//       </div>

//       <input
//         type="text"
//         className={`border p-2 ${errorMessageHs ? "border-red-500" : "border"}`}
//         value={selectedHsCode}
//         {...register(fieldNameHsCode)}
//         onChange={(e) => {
//           const newValue = e.target.value;
//           setValue(fieldNameHsCode, newValue);
//         }}
//       />
//     </>
//   );
// };

// export default DescHsCode;

//eta bata

import { useEffect, useState } from "react";
import { useFormContext, FieldValues } from "react-hook-form";
import * as XLSX from "xlsx";
import CreatableSelect from "react-select/creatable";
import { Input } from "@/components/ui/input";

interface ProductHsCodeProps {
  boxIndex: number;
  index: number;
}

const DescHsCode = ({ boxIndex, index }: ProductHsCodeProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
    register,
  } = useFormContext();

  const [productOptions, setProductOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [productToHsMap, setProductToHsMap] = useState<Record<string, string>>(
    {}
  );

  const fieldNameDescription = `boxes[${boxIndex}].BoxesContent[${index}].description`;
  const fieldNameHsCode = `boxes[${boxIndex}].BoxesContent[${index}].HsCode`;

  const selectedProduct = watch(fieldNameDescription) || "";
  const selectedHsCode = watch(fieldNameHsCode) || "";

  useEffect(() => {
    fetch("/HsnCodes-148503923498234.xlsx")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        ) as any[];

        const options: { label: string; value: string }[] = [];
        const map: Record<string, string> = {};

        sheet.forEach((row) => {
          const productKey = Object.keys(row).find((key) =>
            key.toLowerCase().includes("product")
          );
          const hsCodeKey = Object.keys(row).find((key) =>
            key.toLowerCase().includes("hs code")
          );

          if (productKey && hsCodeKey) {
            const productName = String(row[productKey]).trim();
            const hsCode = String(row[hsCodeKey]).trim();

            if (productName && hsCode) {
              options.push({ label: productName, value: productName });
              map[productName] = hsCode;
            }
          }
        });

        setProductOptions(options);
        setProductToHsMap(map);
      })
      .catch((error) => console.error("Error loading Excel:", error));
  }, []);

  useEffect(() => {
    if (selectedProduct && !selectedHsCode && !selectedProduct.trim()) {
      setValue(fieldNameHsCode, productToHsMap[selectedProduct] || "");
    }
  }, [
    selectedProduct,
    selectedHsCode,
    productToHsMap,
    setValue,
    fieldNameHsCode,
  ]);

  const boxErrors = errors?.boxes as FieldValues | undefined;
  const errorMessageDesc =
    boxErrors?.[boxIndex]?.BoxesContent?.[index]?.description?.message ?? "";
  const errorMessageHs =
    boxErrors?.[boxIndex]?.BoxesContent?.[index]?.HsCode?.message ?? "";

  const [menuOpen, setMenuOpen] = useState(false);
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
    <>
      <div className="relative">
        <CreatableSelect
          styles={shadcnStyles}
          className={`h-full ${errorMessageDesc ? "border-red-500" : ""}`}
          value={
            selectedProduct
              ? { label: selectedProduct, value: selectedProduct }
              : null
          }
          options={productOptions}
          onChange={(selectedOption) => {
            const product = selectedOption?.value || "";
            setValue(fieldNameDescription, product);
            setValue(fieldNameHsCode, productToHsMap[product] || "");
          }}
          isClearable
          isSearchable
          menuIsOpen={menuOpen}
          filterOption={(option, input) =>
            option.label.toLowerCase().includes(input.toLowerCase())
          }
          onInputChange={(input, actionMeta) => {
            if (actionMeta.action === "input-change" && input.length > 0) {
              setMenuOpen(true);
            } else if (input.length === 0) {
              setMenuOpen(false);
            }
          }}
          menuPortalTarget={document.body}
          // styles={{
          //   menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          //   menu: (base) => ({
          //     ...base,
          //     width: "max-content",
          //     minWidth: "100%",
          //   }),
          //   control: (base) => ({
          //     ...base,
          //     height: "100%",
          //     minHeight: "40px",
          //     border: "none",
          //     boxShadow: "none",
          //   }),
          // }}
        />
      </div>

      {/* <input
        type="text"
        className={`border p-2 w-full text-center ${errorMessageHs ? "border-red-500" : ""}`}
        value={selectedHsCode}
        {...register(fieldNameHsCode)}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(fieldNameHsCode, newValue);
        }}
      /> */}
      <Input
        type="text"
        className={`p-2 w-full text-center border-2 ${errorMessageHs ? "border-destructive" : ""}`}
        value={selectedHsCode}
        {...register(fieldNameHsCode)}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(fieldNameHsCode, newValue);
        }}
      />
    </>
  );
};

export default DescHsCode;
