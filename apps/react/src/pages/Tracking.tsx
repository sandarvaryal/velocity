// import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useParams } from "react-router-dom";
// // import { useQuery } from "@tanstack/react-query";
// import { FaCheckCircle } from "react-icons/fa";
// import { TbWorldSearch } from "react-icons/tb";
// import { IoTimerOutline } from "react-icons/io5";

// interface Checkpoint {
//   subtag_message: string;
//   checkpoint_time: string;
//   location: string;
// }

// interface VerificationStatus {
//   shipmentVerifiedTime: string | null;
//   shipmentProcessed: boolean;
//   shipmentDepartureTime: string | null;
//   shipmentDeliveredTime: string | null;
// }

// interface TrackingData {
//   verificationStatus: VerificationStatus;
//   data: {
//     data: {
//       tag: string;
//       checkpoints: Checkpoint[];
//     };
//   };
// }

// export function Tracking() {
//   const dummyTrackingData: TrackingData = {
//     verificationStatus: {
//       shipmentVerifiedTime: "2024-03-06 10:30 AM",
//       shipmentProcessed: true,
//       shipmentDepartureTime: "2024-03-06 10:30 AM",
//       shipmentDeliveredTime: null, // Not delivered yet
//     },
//     data: {
//       data: {
//         tag: "Express",
//         checkpoints: [
//           {
//             subtag_message: "Package received at sorting facility",
//             checkpoint_time: "2024-03-06 09:00 AM",
//             location:
//               "New York, NY, New York, NYNew York, NYNew York, NYNew York, NY",
//           },
//           {
//             subtag_message: "Package sorted and in transit",
//             checkpoint_time: "2024-03-06 11:00 AM",
//             location: "Newark, NJ",
//           },
//           {
//             subtag_message: "Package departed facility",
//             checkpoint_time: "2024-03-06 02:30 PM",
//             location: "Philadelphia, PA",
//           },
//           {
//             subtag_message: "Out for delivery",
//             checkpoint_time: "2024-03-06 04:00 PM",
//             location: "Baltimore, MD",
//           },
//           {
//             subtag_message: "Delivered",
//             checkpoint_time: "2024-03-06 06:00 PM",
//             location: "Washington, DC",
//           },
//         ],
//       },
//     },
//   };

//   const [trackedData, setTrackedData] = useState<TrackingData | null>(null);
//   // const { awbNumber } = useParams<{ awbNumber: string }>();

//   // const { data } = useQuery<TrackingData>({
//   //   queryKey: ["tracking", awbNumber],
//   //   queryFn: async () => {
//   //     const response = await axios.get(
//   //       `${import.meta.env.VITE_BACKEND_URL}/api/getTracking/${awbNumber}`
//   //     );
//   //     return response.data;
//   //   },
//   // });

//   const statusKeys: Record<string, keyof VerificationStatus> = {
//     Verified: "shipmentVerifiedTime",
//     Processed: "shipmentProcessed",
//     Departure: "shipmentDepartureTime",
//     Delivered: "shipmentDeliveredTime",
//   };

//   const getVerificationStatus = (stage: string) => {
//     const key = statusKeys[stage];
//     if (key) {
//       if (key === "shipmentProcessed") {
//         return trackedData?.verificationStatus[key] ? "Processed" : "Not yet";
//       } else {
//         return trackedData?.verificationStatus[key] || "Not yet";
//       }
//     }
//     return "Not yet";
//   };

//   useEffect(() => {
//     setTrackedData(dummyTrackingData);
//   }, []);

//   return (
//     <div className="max-w-[100rem] mb-24 px-6 sm:px-12 mx-auto">
//       <h1 className="text-xl font-semibold flex items-center gap-2 text-gray-800 my-4">
//         <TbWorldSearch /> Tracking Details
//       </h1>
//       {trackedData ? (
//         <div className="grid grid-cols-1 sm:grid-cols-[20rem_1fr] gap-2">
//           <div className="flex flex-col items-start pt-4 relative">
//             {["Verified", "Processed", "Departure", "Delivered"].map(
//               (stage, index) => (
//                 <div key={index} className="flex items-center mb-8 relative">
//                   <FaCheckCircle
//                     className={`text-3xl z-10 ${
//                       trackedData.verificationStatus[statusKeys[stage]] ||
//                       (stage === "Processed" &&
//                         trackedData.verificationStatus.shipmentProcessed)
//                         ? "text-green-500"
//                         : "text-gray-300"
//                     }`}
//                   />
//                   <div className="ml-4">
//                     <span className="text-lg font-semibold text-gray-800">
//                       {stage}
//                     </span>
//                     <p className="text-base text-gray-600">
//                       {getVerificationStatus(stage)}
//                     </p>
//                   </div>
//                   {index !== 3 && (
//                     <div className="absolute left-3 top-10 w-1 h-12 bg-gray-300"></div>
//                   )}
//                 </div>
//               )
//             )}
//           </div>

//           <div className="overflow-y-auto">
//             <div className="space-y-6">
//               {trackedData.data.data.checkpoints.map((checkpoint, index) => (
//                 <div
//                   key={index}
//                   className="border-l-4 shadow-sm  border-blue-500 pl-4 py-6"
//                 >
//                   <div className="flex gap-1 flex-col lg:flex-row lg:items-center justify-between">
//                     <h2 className="text-lg font-semibold text-gray-800">
//                       {checkpoint.subtag_message}
//                     </h2>

//                     <h3 className="flex items-center gap-2">
//                       <IoTimerOutline className="text-lg" />
//                       <span>{checkpoint.checkpoint_time}</span>
//                     </h3>
//                   </div>
//                   <p className="mt-2 sm:mt-1 text-gray-700">
//                     {checkpoint.location}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p className="text-xl text-gray-500 text-center">
//           Loading tracking details
//         </p>
//       )}
//     </div>
//   );
// }

//eta bata

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { TbWorldSearch } from "react-icons/tb";
import { IoTimerOutline } from "react-icons/io5";

// interface Checkpoint {
//   subtag_message: string;
//   checkpoint_time: string;
//   location: string;
// }

// interface VerificationStatus {
//   shipmentVerifiedTime: string | null;
//   shipmentProcessed: boolean;
//   shipmentDepartureTime: string | null;
//   shipmentDeliveredTime: string | null;
// }

// interface TrackingData {
//   verificationStatus: VerificationStatus;
//   data: {
//     data: {
//       tag: string;
//       checkpoints: Checkpoint[];
//     };
//   };
// }

export function Tracking() {
  const { awbNumber } = useParams<{ awbNumber: string }>();

  // const { data, isLoading } = useQuery<TrackingData>({
  const { data, isLoading } = useQuery({
    queryKey: ["tracking", awbNumber],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/getTracking/${awbNumber}`
      );
      return response.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-xl text-gray-500 text-center">
        Loading tracking details...
      </p>
    );
  if (!data)
    return (
      <p className="text-xl text-red-500 text-center">
        No tracking data found.
      </p>
    );

  const {
    shipmentVerifiedTime,
    shipmentProcessed,
    shipmentDepartureTime,
    shipmentDeliveredTime,
  } = data.verificationStatus;

  console.log("returned data", data);

  const getReadableData = (string: any): any => {
    const date = new Date(string);
    const formattedDate = date.toLocaleString("en-US", {
      timeZone: "Asia/Kathmandu",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedDate;
  };

  const dataObj = JSON.parse(data.data);

  return (
    <div className="max-w-[100rem] px-6 sm:px-12 mx-auto] bg-[#111111] min-h-[90vh] pt-20">
      {/* <h1 className="text-xl font-semibold flex items-center gap-2  my-4 text-[#abb2b9]">
        <TbWorldSearch /> Tracking Details
      </h1> */}

      <div className="grid grid-cols-1 sm:grid-cols-[20rem_1fr] gap-2">
        <div className="flex flex-col items-start pt-4 relative">
          {[
            {
              label: "Booked",
              value: data.bookingDate ? getReadableData(data.bookingDate) : "",
            },
            {
              label: "Verified",
              value: shipmentVerifiedTime
                ? getReadableData(shipmentVerifiedTime)
                : "",
            },
            {
              label: "Processed",
              value: shipmentProcessed ? "Shipment Processed" : "Not Yet",
            },
            {
              label: "Departure",
              value: shipmentDepartureTime
                ? getReadableData(shipmentDepartureTime)
                : "",
            },
            {
              label: "Delivered",
              value: shipmentDeliveredTime
                ? getReadableData(shipmentDeliveredTime)
                : "",
            },
          ].map((status, index) => (
            <div key={index} className="flex items-center mb-8 relative">
              <FaCheckCircle
                className={`text-3xl z-10 ${status.value && status.value !== "Not Yet" ? "text-[#F97316]" : "text-gray-500"}`}
              />
              <div className="ml-4">
                <span className="text-lg font-semibold text-white">
                  {status.label}
                </span>
                <p className="text-base text-gray-400">
                  {status.value || "Not Yet"}
                </p>
              </div>
              {index !== 4 && (
                <div className="absolute left-3 top-10 w-1 h-12 bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>

        {/* api table eta bata */}
        <div className="overflow-y-auto">
          <div className="space-y-6">
            {/* {data?.data?.data?.checkpoints?.map( */}
            {dataObj?.data?.checkpoints?.map((checkpoint: any, index: any) => (
              <div
                key={index}
                className="border-l-4 shadow-sm border-blue-500 pl-4 py-6"
              >
                <div className="flex gap-1 flex-col lg:flex-row lg:items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {checkpoint.subtag_message}
                  </h2>
                  <h3 className="flex items-center gap-2">
                    <IoTimerOutline className="text-lg" />
                    {/* <span>{getReadableData(checkpoint.checkpoint_time)}</span> */}
                    <span>{checkpoint.checkpoint_time}</span>
                  </h3>
                </div>
                <p className="mt-2 sm:mt-1 text-gray-700">
                  {checkpoint.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
