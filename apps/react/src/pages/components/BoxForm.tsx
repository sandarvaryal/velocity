// import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import BoxContent from "./BoxContent";
// import FormInputBox from "./formComponents/FormInputBox";
// import { useFieldArray, useFormContext } from "react-hook-form";

// export default function BoxForm({
//   data,
//   formFor,
// }: {
//   data: any;
//   formFor: "BookShipment" | "EditShipment";
// }) {
//   const [boxInstance, setBoxInstance] = useState(data?.Boxes || []);
//   const { setValue, watch } = useFormContext();
//   const { control } = useFormContext();
//   const [selectedBoxIndex, setSelectedBoxIndex] = useState<any>(null);

//   const { remove: removeBox } = useFieldArray({
//     control,
//     name: "boxes",
//   });
//   const { remove: removeContent } = useFieldArray({
//     control,
//     name: `boxes[${selectedBoxIndex}].BoxesContent`,
//   });

//   useEffect(() => {
//     if (data?.Boxes && Array.isArray(data?.Boxes) && data?.Boxes.length > 0) {
//       setBoxInstance(data.Boxes);
//       setValue("boxes", data.Boxes);
//     } else {
//       setBoxInstance([]);
//       setValue("boxes", []);
//     }
//   }, [data, setValue]);

//   //yo ni
//   useEffect(() => {
//     if (JSON.stringify(data?.Boxes) !== JSON.stringify(boxInstance)) {
//       setBoxInstance(data?.Boxes || []);
//     }
//   }, [data?.Boxes]);

//   const handleAddBoxInstance = () => {
//     const newIndex = boxInstance.length + 1;
//     setBoxInstance([
//       ...boxInstance,
//       {
//         id: uuidv4(),
//         boxAwbNumber: data.awbNumber
//           ? `${data.awbNumber}-${newIndex}`
//           : `BOX-${newIndex}`,
//         lengthCm: null,
//         widthCm: null,
//         heightCm: null,
//         actualWeightKg: null,
//         volumetricWeightKg: null,
//         chargeableWeightKg: null,
//         BoxesContent: [
//           {
//             id: uuidv4(),
//             description: "",
//             HsCode: null,
//             quantity: null,
//             unitWeight: null,
//             unitRate: null,
//             total: null,
//           },
//         ],
//       },
//     ]);
//   };

//   const handleDeleteBoxInstance = (id: string, boxIndex: number) => {
//     console.log("boxkoIndex", boxIndex);
//     setBoxInstance((prevBoxInstance: any) => {
//       const updatedBoxes = prevBoxInstance.filter((box: any) => box.id !== id);

//       removeBox(boxIndex);

//       return updatedBoxes;
//     });
//   };

//   const handleAddDetail = (boxId: string) => {
//     setBoxInstance((prevBoxInstance: any) =>
//       prevBoxInstance.map((box: any) =>
//         box.id === boxId
//           ? {
//               ...box,
//               BoxesContent: [
//                 ...(box.BoxesContent || []),
//                 {
//                   id: uuidv4(),
//                   description: "",
//                   HsCode: null,
//                   quantity: null,
//                   unitWeight: null,
//                   unitRate: null,
//                   total: null,
//                 },
//               ],
//             }
//           : box
//       )
//     );
//   };
//   useEffect(() => {
//     console.log("Updated selectedBoxIndex:", selectedBoxIndex);
//   }, [selectedBoxIndex]);

//   const handleDeleteDetail = (
//     boxId: string,
//     detailId: string,
//     boxIndex: number,
//     index: number
//   ) => {
//     console.log("beforeBoxIndex", boxIndex);
//     console.log("beforeBoxContentIndex", index);
//     console.log("beforeState", selectedBoxIndex);

//     setSelectedBoxIndex(boxIndex);

//     console.log("afterState", selectedBoxIndex);
//     if (selectedBoxIndex !== null) {
//       removeContent(index);
//     }
//     setBoxInstance((prevBoxInstance: any) => {
//       const updatedBoxInstance = prevBoxInstance.map((box: any) => {
//         if (box.id === boxId) {
//           const updatedBoxesContent = box.BoxesContent.filter(
//             (detail: any) => detail.id !== detailId
//           );

//           return {
//             ...box,
//             BoxesContent: updatedBoxesContent,
//           };
//         }

//         return box;
//       });

//       return updatedBoxInstance;
//     });
//   };
//   const boxes = watch("boxes") || [];
//   const boxesContentValues =
//     boxes
//       .flatMap((box: any) =>
//         box.BoxesContent?.map((content: any) => content.description)
//       )
//       .join(", ") || "";

//   return (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-[4fr_1fr] items-center gap-4 min-h-11 mb-4">
//         <span className="border flex items-center bg-neutral-50 min-h-11 h-full border-gray-300   px-2 py-1 outline-none w-full">
//           {boxesContentValues}
//         </span>
//         <button
//           type="button"
//           className="px-4 py-1  text-white h-full font-semibold bg-[#00AEE4] transition-all hover:bg-[#0089e4] cursor-pointer"
//           onClick={handleAddBoxInstance}
//         >
//           Add new box
//         </button>
//       </div>
//       <div className="overflow-x-scroll">
//         <div className="min-w-max sm:min-w-fit">
//           {/* Header */}
//           <div className="grid grid-cols-8 gap-2 text-center bg-gray-100 p-2 rounded-md font-semibold text-sm w-full">
//             <span>BOX AWB No</span>
//             <span>Len(cm)</span>
//             <span>Width(cm)</span>
//             <span>Height(cm)</span>
//             <span>Act. Wt.(KG)</span>
//             <span>Vol. Wt.(KG)</span>
//             <span>Charge Wt.(KG)</span>
//             <span>Actions</span>
//           </div>

//           {/* Data Rows */}
//           {boxInstance.map((box: any, index: number) => (
//             <div key={box.id} className="grid grid-cols-8 text-center gap-2 ">
//               <div className="border   border-gray-300  flex items-center justify-center  bg-gray-100">
//                 <FormInputBox
//                   index={index}
//                   name="boxAwbNumber"
//                   value={box.boxAwbNumber}
//                   formFor={formFor}
//                 />
//               </div>
//               <div className="border flex items-center justify-center  border-gray-300 ">
//                 <FormInputBox
//                   index={index}
//                   name="lengthCm"
//                   value={box.lengthCm}
//                 />
//               </div>
//               <div className="border flex items-center justify-center  border-gray-300 ">
//                 {" "}
//                 <FormInputBox
//                   index={index}
//                   name="widthCm"
//                   value={box.widthCm}
//                 />
//               </div>
//               <div className="border flex items-center justify-center  border-gray-300 ">
//                 <FormInputBox
//                   index={index}
//                   name="heightCm"
//                   value={box.heightCm}
//                 />
//               </div>
//               <div className="border flex items-center justify-center  border-gray-300 ">
//                 <FormInputBox
//                   index={index}
//                   name="actualWeightKg"
//                   value={box.actualWeightKg}
//                 />
//               </div>
//               <div className="border flex items-center justify-center border-gray-300  bg-gray-100">
//                 <FormInputBox
//                   index={index}
//                   name="volumetricWeightKg"
//                   value={box.volumetricWeightKg}
//                 />
//               </div>
//               <div className="border flex items-center justify-center border-gray-300  bg-gray-100">
//                 <FormInputBox
//                   index={index}
//                   name="chargeableWeightKg"
//                   value={box.chargeableWeightKg}
//                 />
//               </div>
//               <button
//                 className="border px-2 py-1 text-red-500 cursor-pointer"
//                 onClick={() => handleDeleteBoxInstance(box.id, index)}
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <BoxContent
//         boxInstance={boxInstance}
//         handleAddDetail={handleAddDetail}
//         handleDeleteDetail={handleDeleteDetail}
//         formFor={formFor}
//       />
//     </>
//   );
// }

//eta bata

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import BoxContent from "./BoxContent";
import FormInputBox from "./formComponents/FormInputBox";
import { useFieldArray, useFormContext } from "react-hook-form";
import ContentDescriptions from "./formComponents/ContentDescriptions";
// import { Button } from "@/components/ui/button";

export default function BoxForm({
  data,
  formFor,
}: {
  data: any;
  formFor: "BookShipment" | "EditShipment";
}) {
  // const [boxInstance, setBoxInstance] = useState(data?.Boxes || []);
  const [boxInstance, setBoxInstance] = useState(data?.Boxes || []);
  const { setValue } = useFormContext();
  const { control } = useFormContext();
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<any>(null);

  const { remove: removeBox } = useFieldArray({
    control,
    name: "boxes",
  });
  const { remove: removeContent } = useFieldArray({
    control,
    name: `boxes[${selectedBoxIndex}].BoxesContent`,
  });

  useEffect(() => {
    if (data?.Boxes && Array.isArray(data?.Boxes) && data?.Boxes.length > 0) {
      setBoxInstance(data.Boxes);
      setValue("boxes", data.Boxes);
    } else {
      setBoxInstance([]);
      setValue("boxes", []);
    }
  }, [data, setValue]);

  //yo ni
  useEffect(() => {
    if (JSON.stringify(data?.Boxes) !== JSON.stringify(boxInstance)) {
      setBoxInstance(data?.Boxes || []);
    }
  }, [data?.Boxes]);

  const handleAddBoxInstance = () => {
    const newIndex = boxInstance.length + 1;
    setBoxInstance([
      ...boxInstance,
      {
        id: uuidv4(),
        boxAwbNumber: data.awbNumber
          ? `${data.awbNumber}-${newIndex}`
          : `BOX-${newIndex}`,
        lengthCm: null,
        widthCm: null,
        heightCm: null,
        actualWeightKg: null,
        volumetricWeightKg: null,
        chargeableWeightKg: null,
        BoxesContent: [
          {
            id: uuidv4(),
            description: "",
            HsCode: null,
            quantity: null,
            unitWeight: null,
            unitRate: null,
            total: null,
          },
        ],
      },
    ]);
  };

  const handleDeleteBoxInstance = (id: string, boxIndex: number) => {
    console.log("boxkoIndex", boxIndex);
    setBoxInstance((prevBoxInstance: any) => {
      const updatedBoxes = prevBoxInstance.filter((box: any) => box.id !== id);

      removeBox(boxIndex);

      return updatedBoxes;
    });
  };

  const handleAddDetail = (boxId: string) => {
    setBoxInstance((prevBoxInstance: any) =>
      prevBoxInstance.map((box: any) =>
        box.id === boxId
          ? {
              ...box,
              BoxesContent: [
                ...(box.BoxesContent || []),
                {
                  id: uuidv4(),
                  description: "",
                  HsCode: null,
                  quantity: null,
                  unitWeight: null,
                  unitRate: null,
                  total: null,
                },
              ],
            }
          : box
      )
    );
  };
  useEffect(() => {
    console.log("Updated selectedBoxIndex:", selectedBoxIndex);
  }, [selectedBoxIndex]);

  const handleDeleteDetail = (
    boxId: string,
    detailId: string,
    boxIndex: number,
    index: number
  ) => {
    console.log("beforeBoxIndex", boxIndex);
    console.log("beforeBoxContentIndex", index);
    console.log("beforeState", selectedBoxIndex);

    setSelectedBoxIndex(boxIndex);

    console.log("afterState", selectedBoxIndex);
    if (selectedBoxIndex !== null) {
      removeContent(index);
    }
    setBoxInstance((prevBoxInstance: any) => {
      const updatedBoxInstance = prevBoxInstance.map((box: any) => {
        if (box.id === boxId) {
          const updatedBoxesContent = box.BoxesContent.filter(
            (detail: any) => detail.id !== detailId
          );

          return {
            ...box,
            BoxesContent: updatedBoxesContent,
          };
        }

        return box;
      });

      return updatedBoxInstance;
    });
  };
  // const boxes = watch("boxes") || [];
  // const boxesContentValues =
  //   boxes
  //     .flatMap((box: any) =>
  //       box.BoxesContent?.map((content: any) => content.description)
  //     )
  //     .join(", ") || "";

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-[4fr_1fr] items-center gap-4 min-h-11 mb-4 mt-5">
        {/* <span className="border flex flex-wrap items-center bg-neutral-50 min-h-11 h-full border-gray-300   px-2 py-1 outline-none w-full">
          {boxesContentValues}
        </span> */}
        <ContentDescriptions data={data} />
        <button
          type="button"
          className="px-2 py-1  cursor-pointer border-primary hover:bg-primary  transition duration-150 rounded-2xl border-2"
          onClick={handleAddBoxInstance}
        >
          Add new box
        </button>
        {/* <Button
          type="button"
          className="px-4 py-1 text-white h-full font-semibold cursor-pointer transition-all"
          onClick={handleAddBoxInstance}
        >
          Add new box
        </Button> */}
      </div>

      <div className="overflow-x-scroll no-scrollbar">
        <div className="min-w-max sm:min-w-fit flex flex-col gap-2">
          {/* Header */}
          <div className="grid grid-cols-8 gap-2 text-center bg-sidebar border-2 p-2 rounded-2xl font-semibold text-sm w-full">
            <span>BOX AWB No</span>
            <span>Len(cm)</span>
            <span>Width(cm)</span>
            <span>Height(cm)</span>
            <span>Act. Wt.(KG)</span>
            <span>Vol. Wt.(KG)</span>
            <span>Charge Wt.(KG)</span>
            <span>Actions</span>
          </div>

          {/* Data Rows */}
          {boxInstance.map((box: any, index: number) => (
            <div key={box.id} className="grid grid-cols-8 text-center gap-2 ">
              <div className="flex items-center justify-center border-2 rounded-2xl">
                <FormInputBox
                  index={index}
                  name="boxAwbNumber"
                  value={box.boxAwbNumber}
                  formFor={formFor}
                />
              </div>
              <div className="flex items-center justify-center border-2 rounded-2xl">
                <FormInputBox
                  index={index}
                  name="lengthCm"
                  value={box.lengthCm}
                />
              </div>
              <div className="flex items-center justify-center border-2 rounded-2xl">
                {" "}
                <FormInputBox
                  index={index}
                  name="widthCm"
                  value={box.widthCm}
                />
              </div>
              <div className="flex items-center justify-center border-2 rounded-2xl">
                <FormInputBox
                  index={index}
                  name="heightCm"
                  value={box.heightCm}
                />
              </div>
              <div className="flex items-center justify-center border-2 rounded-2xl">
                <FormInputBox
                  index={index}
                  name="actualWeightKg"
                  value={box.actualWeightKg}
                />
              </div>
              <div className="flex items-center justify-center border-2 rounded-2xl">
                <FormInputBox
                  index={index}
                  name="volumetricWeightKg"
                  value={box.volumetricWeightKg}
                />
              </div>
              <div className="flex items-center justify-center border-2 rounded-2xl">
                <FormInputBox
                  index={index}
                  name="chargeableWeightKg"
                  value={box.chargeableWeightKg}
                />
              </div>
              <button
                className="border border-red-500 px-2 h-full text-red-500 cursor-pointer hover:bg-red-500 hover:text-sidebar rounded-2xl  transition duration-150"
                onClick={() => handleDeleteBoxInstance(box.id, index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <BoxContent
        boxInstance={boxInstance}
        handleAddDetail={handleAddDetail}
        handleDeleteDetail={handleDeleteDetail}
        formFor={formFor}
      />
    </>
  );
}
