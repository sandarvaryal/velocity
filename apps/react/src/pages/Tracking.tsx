import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
// import { TbWorldSearch } from "react-icons/tb";
import { IoTimerOutline } from "react-icons/io5";

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
    <div className="max-w-[100rem] px-6 sm:px-12 mx-auto] bg-[#111111] min-h-[100vh] pt-20">
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
                className="border-l-4 shadow-sm border-primary pl-4 py-6"
              >
                <div className="flex gap-1 flex-col lg:flex-row lg:items-center justify-between">
                  <h2 className="text-lg font-semibold text-sidebar">
                    {checkpoint.subtag_message}
                  </h2>
                  <h3 className="flex items-center gap-2">
                    <IoTimerOutline className="text-lg" />
                    {/* <span>{getReadableData(checkpoint.checkpoint_time)}</span> */}
                    <span className="text-sidebar/30">
                      {checkpoint.checkpoint_time}
                    </span>
                  </h3>
                </div>
                <p className="mt-2 sm:mt-1 text-sidebar/30">
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
