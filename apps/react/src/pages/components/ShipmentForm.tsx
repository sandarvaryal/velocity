// import ConsignorConsigneeForm from "./ConsignorConsigneeForm";
// import BoxForm from "./BoxForm";
// import DynamicSelect from "./OtherFields";
// import { useNavigate } from "react-router-dom";
// import { bookShipment } from "../../api/shipment/bookShipment";
// import { editShipment } from "../../api/shipment/editShipment";

// import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { bookShipmentSchema } from "../../config/shipmentFormSchema";
// import { useMutation } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { InvoiceKeys } from "./formComponents/InvoiceKeys";
// // import { GiAirplaneDeparture } from "react-icons/gi";

// export default function ShipmentForm({
//   data,
//   formFor,
// }: {
//   data?: any;
//   formFor: "BookShipment" | "EditShipment";
// }) {
//   const methods = useForm<any>({
//     resolver: zodResolver(bookShipmentSchema),
//     mode: "onSubmit",
//     defaultValues: {
//       verificationStatus: {
//         shipmentVerified: false,
//       },
//     },
//   });
//   const navigate = useNavigate();

//   const mutateBookShipment = useMutation({
//     mutationFn: bookShipment,
//     onSuccess: (data: any) => {
//       toast.success(data.message);
//       navigate("/shipments");
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data?.message);
//       console.error("Booking Shipment failed", error.response?.data?.message);
//     },
//   });
//   const mutateEditShipment = useMutation({
//     mutationFn: editShipment,
//     onSuccess: (data: any) => {
//       toast.success(data.message);
//       navigate("/shipments");
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data?.message);
//       console.error("Shipment Edit Failed", error.response?.data?.message);
//     },
//   });

//   const onSubmit = (formData: any) => {
//     console.log("formData", formData);
//     const transformedData = {
//       ...formData,

//       boxes: formData.boxes
//         .filter((box: any) => box !== null && box !== undefined)
//         .map((box: any) => ({
//           boxAwbNumber: box.boxAwbNumber,
//           lengthCm: box.lengthCm,
//           widthCm: box.widthCm,
//           heightCm: box.heightCm,
//           actualWeightKg: box.actualWeightKg,
//           volumetricWeightKg: box.volumetricWeightKg,
//           chargeableWeightKg: box.chargeableWeightKg,
//           BoxesContent: (box.BoxesContent ?? []).map((content: any) => ({
//             id: content.id,
//             description: content.description,
//             HsCode: content.HsCode,
//             quantity: content.quantity,
//             unitRate: content.unitRate,
//             unitWeight: content.unitWeight,
//             total: content.total,
//           })),
//         })),
//     };

//     console.log("Form Submitted:", transformedData);
//     if (formFor === "BookShipment") {
//       mutateBookShipment.mutate(transformedData);
//     } else {
//       const withDateTransformedData = { ...transformedData, date: data.date };
//       mutateEditShipment.mutate({
//         awbNum: data.awbNumber,
//         formData: withDateTransformedData,
//       });
//     }
//   };

//   const onError = (errors: any) => {
//     console.log("Validation Errors:", errors);
//   };

//   return (
//     <>
//       <FormProvider {...methods}>
//         <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
//           <button
//             type="submit"
//             className="mt-4 absolute top-0 right-6 text-sm sm:text-base px-8 py-2 bg-blue-500 font-semibold text-white  cursor-pointer"
//           >
//             Submit
//           </button>
//           <div className="grid gap-8  grid-cols-1 lg:grid-cols-[0.2fr_1fr]  py-4">
//             <div>
//               <DynamicSelect data={data} formFor={formFor} />
//               <InvoiceKeys data={data} />
//             </div>
//             <div className="grid grid-cols-1 gap-8 sm:gap-0 sm:grid-cols-2 ">
//               <div className="flex flex-col sm:mr-10">
//                 <h1 className="text-center font-semibold bg-gray-100 shadow-sm h-12  p-3">
//                   Sender Details
//                 </h1>
//                 <div className="p-4 shadow-sm">
//                   <ConsignorConsigneeForm data={data} formFor="consignor" />
//                 </div>
//               </div>
//               <div className="flex flex-col ">
//                 <h1 className=" text-center font-semibold h-12 bg-gray-100 shadow-sm  p-3">
//                   Receiver Details
//                 </h1>
//                 <div className="p-4 shadow-sm">
//                   <ConsignorConsigneeForm data={data} formFor="consignee" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <BoxForm data={data} formFor={formFor} />

//           <button
//             type="submit"
//             className="mt-4 px-8 py-2 bg-blue-500 font-semibold text-white  cursor-pointer"
//           >
//             Submit
//           </button>
//         </form>
//       </FormProvider>
//     </>
//   );
// }

//eta bata

import ConsignorConsigneeForm from "./ConsignorConsigneeForm";
import BoxForm from "./BoxForm";
import DynamicSelect from "./OtherFields";
// import { useNavigate } from "react-router-dom";
import { bookShipment } from "../../api/shipment/bookShipment";
import { editShipment } from "../../api/shipment/editShipment";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { bookShipmentSchema } from "../../config/shipmentFormSchema";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { InvoiceKeys } from "./formComponents/InvoiceKeys";

export default function ShipmentForm({
  data,
  formFor,
}: {
  data?: any;
  formFor: "BookShipment" | "EditShipment";
}) {
  const methods = useForm<any>({
    resolver: zodResolver(bookShipmentSchema),
    mode: "onSubmit",
    defaultValues: {
      verificationStatus: {
        shipmentVerified: false,
      },
    },
  });
  // const navigate = useNavigate();

  const mutateBookShipment = useMutation({
    mutationFn: bookShipment,
    onSuccess: (data: any) => {
      toast.success(data.message);
      // navigate("/shipments");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
      console.error("Booking Shipment failed", error.response?.data?.message);
    },
  });
  const mutateEditShipment = useMutation({
    mutationFn: editShipment,
    onSuccess: (data: any) => {
      toast.success(data.message);
      // navigate("/shipments");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
      console.error("Shipment Edit Failed", error.response?.data?.message);
    },
  });

  const onSubmit = (formData: any) => {
    console.log("formData", formData);
    const transformedData = {
      ...formData,

      boxes: formData.boxes
        .filter((box: any) => box !== null && box !== undefined)
        .map((box: any) => ({
          boxAwbNumber: box.boxAwbNumber,
          lengthCm: box.lengthCm,
          widthCm: box.widthCm,
          heightCm: box.heightCm,
          actualWeightKg: box.actualWeightKg,
          volumetricWeightKg: box.volumetricWeightKg,
          chargeableWeightKg: box.chargeableWeightKg,
          BoxesContent: (box.BoxesContent ?? []).map((content: any) => ({
            id: content.id,
            description: content.description,
            HsCode: content.HsCode,
            quantity: content.quantity,
            unitRate: content.unitRate,
            unitWeight: content.unitWeight,
            total: content.total,
          })),
        })),
    };

    console.log("Form Submitted:", transformedData);
    if (formFor === "BookShipment") {
      mutateBookShipment.mutate(transformedData);
    } else {
      const withDateTransformedData = { ...transformedData, date: data.date };
      mutateEditShipment.mutate({
        awbNum: data.awbNumber,
        formData: withDateTransformedData,
      });
    }
  };

  const onError = (errors: any) => {
    console.log("Validation Errors:", errors);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          {/* <button
            type="submit"
            className="mt-4 absolute top-0 right-6 text-sm sm:text-base px-8 py-2 bg-blue-500 font-semibold text-white  cursor-pointer"
          >
            Submit
          </button> */}
          <div className="py-4 flex flex-col gap-5">
            {/* <div className="grid gap-8  grid-cols-1 lg:grid-cols-[0.2fr_1fr]  py-4"> */}
            {/* <div className="flex border-2 gap-8 rounded-2xl p-5"> */}
            <div className="border-2 rounded-2xl p-5">
              <DynamicSelect data={data} formFor={formFor} />
            </div>
            {/* <div className="flex-1 border-2 rounded-2xl">
                <InvoiceKeys data={data} />
              </div>
            </div> */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 ">
              <div className="flex flex-col border-2 rounded-2xl">
                <h1 className="text-center font-semibold  h-12 p-3 bg-sidebar rounded-t-2xl">
                  Sender Details
                </h1>
                <div className="p-4 r">
                  <ConsignorConsigneeForm data={data} formFor="consignor" />
                </div>
              </div>
              <div className="flex flex-col border-2 rounded-2xl ">
                <h1 className=" text-center font-semibold h-12 p-3 bg-sidebar rounded-t-2xl">
                  Receiver Details
                </h1>
                <div className="p-4 ">
                  <ConsignorConsigneeForm data={data} formFor="consignee" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 border-2 rounded-2xl">
            <InvoiceKeys data={data} />
          </div>

          <BoxForm data={data} formFor={formFor} />

          <button
            type="submit"
            className="mt-4 px-8 py-3 bg-primary font-semibold hover:bg-orange-700 text-white  transition
            duration-150 rounded-2xl cursor-pointer"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </>
  );
}
