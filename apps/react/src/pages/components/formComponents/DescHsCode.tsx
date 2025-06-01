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

  return (
    <>
      <div className="relative">
        <CreatableSelect
          className={`h-full ${errorMessageDesc ? "border-red-500" : "border border-gray-400"}`}
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
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menu: (base) => ({
              ...base,
              width: "max-content",
              minWidth: "100%",
            }),
            control: (base) => ({
              ...base,
              height: "100%",
              minHeight: "40px",
              border: "none",
              boxShadow: "none",
            }),
          }}
        />
      </div>

      <input
        type="text"
        className={`border p-2 w-full text-center ${errorMessageHs ? "border-red-500" : " border border-gray-400"}`}
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
