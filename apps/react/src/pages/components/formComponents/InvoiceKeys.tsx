// import { useEffect, useState } from "react";
// import { useFormContext, useWatch } from "react-hook-form";

// export function InvoiceKeys({ data }: { data: any }) {
//   const { control, setValue, register } = useFormContext();
//   const [selectedDivision, setSelectedDivision] = useState<string | number>(
//     data?.division || ""
//   );

//   const boxes = useWatch({ control, name: "boxes" }) || [];

//   const addedBoxes = boxes.length;

//   const allActualWeightValues = boxes.map((box: any) =>
//     Number(box.actualWeightKg)
//   );
//   const allVolumetricWeightValues = boxes.map((box: any) =>
//     Number(box.volumetricWeightKg)
//   );
//   const allChargeableWeightValues = boxes.map((box: any) =>
//     Number(box.chargeableWeightKg)
//   );
//   const allTotalValues = boxes.flatMap((box: any) =>
//     box.BoxesContent
//       ? box.BoxesContent.map((content: any) => content.total)
//       : []
//   );

//   const addedActualWeight = allActualWeightValues.reduce(
//     (acc: number, current: number) => acc + current,
//     0
//   );
//   const addedVolumetricWeight = allVolumetricWeightValues.reduce(
//     (acc: number, current: number) => acc + current,
//     0
//   );
//   const addedChargeableWeight = allChargeableWeightValues.reduce(
//     (acc: number, current: number) => acc + current,
//     0
//   );
//   const addedTotal = allTotalValues.reduce(
//     (acc: number, current: number) => acc + current,
//     0
//   );

//   useEffect(() => {
//     setValue("totalBoxes", addedBoxes);
//     setValue("totalActualWeightKg", addedActualWeight);
//     setValue("totalVolumetricWeightKg", addedVolumetricWeight);
//     setValue("totalChargeableWeightKg", addedChargeableWeight);
//     setValue("invoiceTotal", addedTotal);

//     console.log("Setting Values:", {
//       totalActualWeightKg: addedActualWeight,
//       totalVolumetricWeightKg: addedVolumetricWeight,
//       totalChargeableWeightKg: addedChargeableWeight,
//       invoiceTotal: addedTotal,
//     });
//   }, [
//     addedActualWeight,
//     addedVolumetricWeight,
//     addedChargeableWeight,
//     addedTotal,
//     setValue,
//   ]);

//   const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     setSelectedDivision(value);
//     setValue("division", value);
//   };

//   return (
//     <div className="flex flex-col">
//       <label htmlFor="division">Division: </label>
//       <select
//         id="division"
//         {...register("division")}
//         className="border"
//         value={selectedDivision}
//         onChange={handleDivisionChange}
//       >
//         <option value="5000">5000</option>
//         <option value="5500">5500</option>
//         <option value="6000">6000</option>
//       </select>

//       <span>Total Boxes: {addedBoxes ? addedBoxes : ""}</span>
//       <span>Actual Weight: {addedActualWeight ? addedActualWeight : ""}</span>
//       <span>
//         Volumetric Weight: {addedVolumetricWeight ? addedVolumetricWeight : ""}
//       </span>
//       <span>
//         Chargeable Weight: {addedChargeableWeight ? addedChargeableWeight : ""}
//       </span>
//       <span>Invoice Total: {addedTotal ? addedTotal : ""}</span>
//     </div>
//   );
// }

//eta bata

import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function InvoiceKeys({ data }: { data: any }) {
  const { control, setValue, register } = useFormContext();
  const [selectedDivision, setSelectedDivision] = useState<string | number>(
    data?.division || ""
  );

  const boxes = useWatch({ control, name: "boxes" }) || [];

  const addedBoxes = boxes.length;

  const allActualWeightValues = boxes.map((box: any) =>
    Number(box.actualWeightKg)
  );
  const allVolumetricWeightValues = boxes.map((box: any) =>
    Number(box.volumetricWeightKg)
  );
  const allChargeableWeightValues = boxes.map((box: any) =>
    Number(box.chargeableWeightKg)
  );
  const allTotalValues = boxes.flatMap((box: any) =>
    box.BoxesContent
      ? box.BoxesContent.map((content: any) => content.total)
      : []
  );

  const addedActualWeight = allActualWeightValues.reduce(
    (acc: number, current: number) => acc + current,
    0
  );
  const addedVolumetricWeight = allVolumetricWeightValues.reduce(
    (acc: number, current: number) => acc + current,
    0
  );
  const addedChargeableWeight = allChargeableWeightValues.reduce(
    (acc: number, current: number) => acc + current,
    0
  );
  const addedTotal = allTotalValues.reduce(
    (acc: number, current: number) => acc + current,
    0
  );

  useEffect(() => {
    setValue("totalBoxes", addedBoxes);
    setValue("totalActualWeightKg", addedActualWeight);
    setValue("totalVolumetricWeightKg", addedVolumetricWeight);
    setValue("totalChargeableWeightKg", addedChargeableWeight);

    console.log("Setting Values:", {
      totalActualWeightKg: addedActualWeight,
      totalVolumetricWeightKg: addedVolumetricWeight,
      totalChargeableWeightKg: addedChargeableWeight,
      invoiceTotal: addedTotal,
    });
  }, [
    addedActualWeight,
    addedVolumetricWeight,
    addedChargeableWeight,

    setValue,
  ]);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender && data.invoiceTotal !== undefined) {
      setValue("invoiceTotal", data.invoiceTotal);
      setInitialRender(false);
    }
    //  if (!initialRender)
    else {
      setValue("invoiceTotal", addedTotal);
    }
  }, [addedTotal, data.invoiceTotal, setValue]);

  const handleDivisionChange = (e: any) => {
    const value = e;
    setSelectedDivision(value);
    setValue("division", value);
  };
  // const handleDivisionChange = (e: any) => {
  //   const value = e.target.value;
  //   setSelectedDivision(value);
  //   setValue("division", value);
  // };

  return (
    <div className=" p-4 rounded-md">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 justify-between">
          <label htmlFor="division" className="text-sm font-semibold ">
            Division:
          </label>
          <Select
            onValueChange={(options: any) => {
              handleDivisionChange(options);
            }}
            {...register("division")}
          >
            <SelectTrigger className=" border border-gray-300 px-2 py-1 focus:ring-2  focus:border-transparent text-gray-500">
              <SelectValue placeholder="Division" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5000">5000</SelectItem>
              <SelectItem value="5500">5500</SelectItem>
              <SelectItem value="6000">6000</SelectItem>
            </SelectContent>
          </Select>
          {/* <select
            id="division"
            {...register("division")}
            className="border border-gray-300 bg-white w-full  px-3 "
            value={selectedDivision}
            onChange={handleDivisionChange}
          >
            <option value="5000">5000</option>
            <option value="5500">5500</option>
            <option value="6000">6000</option>
          </select> */}
          {/* <select
            id="division"
            {...register("division")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
            value={selectedDivision ?? ""}
            onChange={handleDivisionChange}
          >
            <option value="" disabled>
              Select a division
            </option>
            <option value="5000">5000</option>
            <option value="5500">5500</option>
            <option value="6000">6000</option>
          </select> */}
        </div>

        <div className=" border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm ">Total Boxes:</span>
            <span className="text-sm">{addedBoxes ? addedBoxes : ""}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm ">Actual Weight:</span>
            <span className="text-sm">
              {addedActualWeight ? addedActualWeight : ""}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm ">Volumetric Weight:</span>
            <span className="text-sm">
              {addedVolumetricWeight ? addedVolumetricWeight : ""}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm ">Chargeable Weight:</span>
            <span className="text-sm">
              {addedChargeableWeight ? addedChargeableWeight : ""}
            </span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-200 pt-4">
            <span className="text-sm font-semibold">Total:</span>
            <span className="text-sm">{addedTotal ? addedTotal : ""}</span>
            <input
              {...register("invoiceTotal")}
              className="border border-gray-300 bg-white  w-full  px-3 "
              type="number"
              step="any"
              hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
