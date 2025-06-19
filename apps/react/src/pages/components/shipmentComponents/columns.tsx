// import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";
import {
  FaCopy,
  // FaEdit,
  // FaDownload,
  // FaPlaneDeparture,
  // FaHome,
} from "react-icons/fa";
// import { MdPrint, MdDeleteForever } from "react-icons/md";
// import { MdPrint } from "react-icons/md";
// import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Checkbox } from "@/components/ui/checkbox";

// import { NavLink } from "react-router-dom";
// import { QueryClient } from "@tanstack/react-query";
// import { queryClient } from "@/Providers";

// import axios from "axios";
// import { handlePrint } from "@/util/handlePrint";
// import { useQuery } from "@tanstack/react-query";
import { Actions } from "./Actions";

export type Payment = {
  Date: string;
  AwbNumber: string;
  Sender: string;
  Receiver: string;
  "Destination Coutnry": string;
  Status: string;
};

const getReadableData = (string: string): string => {
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

// const { isError: superAdminError, isLoading: superAdminLoading } = useQuery({
//   queryKey: ["verify"],
//   queryFn: async () => {
//     await axios.get(`${import.meta.env.VITE_BACKEND_URL}/superAdmin/verify`, {
//       withCredentials: true,
//     });
//     return true;
//   },
//   retry: false,
// });
// const superAdminError = false;
// const superAdminLoading = false;

// export const columns = [
const getColumns = (isSuperAdmin: boolean) => {
  return [
    ...(isSuperAdmin
      ? [
          {
            id: "select",
            header: ({ table }: { table: any }) => (
              <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                  table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
              />
            ),
            cell: ({ row }: { row: any }) => (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => {
                  console.log("valueyo", value);
                  row.toggleSelected(!!value);
                }}
                aria-label="Select row"
              />
            ),
          },
        ]
      : []),
    {
      accessorKey: "awbNumber",
      header: "AwbNumber",
      cell: ({ row }: { row: any }) => {
        const awbNumber = row.getValue("awbNumber");
        return (
          <div className="flex gap-2">
            {awbNumber}
            <button
              className="cursor-pointer "
              onClick={() => {
                navigator.clipboard.writeText(awbNumber);
                toast.success("Copied to Clipboard");
              }}
            >
              <FaCopy className="hover:text-primary transition-all" />
            </button>
          </div>
        );
      },
    },
    {
      accessorKey: "Action",
      header: "Action",
      cell: ({ row }: { row: any }) => {
        const id = row.original?.id;
        const awbNumber = row.getValue("awbNumber");
        const shipmentVerification =
          row.original?.verificationStatus?.shipmentVerified;
        const shipmentDeparture =
          row.original?.verificationStatus?.shipmentDeparture;
        const shipmentDelivered =
          row.original?.verificationStatus?.shipmentDelivered;
        console.log(shipmentDelivered);
        return (
          <Actions
            id={id}
            awbNumber={awbNumber}
            shipmentVerification={shipmentVerification}
            shipmentDeparture={shipmentDeparture}
            shipmentDelivered={shipmentDelivered}
          />
          // <div className="flex gap-2">
          //   <NavLink to={`/user/editShipment/${awbNumber}`}>
          //     <button className="hover:underline text-xl cursor-pointer hover:text-purple-400 transition-all">
          //       <FaEdit className="hover:text-primary transition-all  dark:hover:text-foreground" />
          //     </button>
          //   </NavLink>
          //   <button
          //     className="hover:underline text-xl cursor-pointer hover:text-purple-400 transition-all flex gap-2"
          //     onClick={() => handlePrint(awbNumber)}
          //   >
          //     <MdPrint className="hover:text-primary transition-all  dark:hover:text-foreground" />
          //   </button>
          //   <button
          //     className="hover:underline text-xl cursor-pointer hover:text-purple-400 transition-all flex gap-2"
          //     onClick={() => {}}
          //   >
          //     <FaDownload className="hover:text-primary transition-all  dark:hover:text-foreground" />
          //   </button>{" "}
          //   {!superAdminError && !superAdminLoading ? (
          //     <>
          //       <div
          //         className="text-xl cursor-pointer hover:text-[#00AEE4] transition-all"
          //         onClick={async () => {
          //           // const checked =
          //           //   !shipment?.verificationStatus?.shipmentVerified;
          //           try {
          //             await axios.put(
          //               `${import.meta.env.VITE_BACKEND_URL}/api/editVerification/${id}`,
          //               { verification: !shipmentVerification },
          //               { withCredentials: true }
          //             );
          //             toast.success("Shipment updated successfully");
          //             queryClient.invalidateQueries({
          //               queryKey: ["shipments"],
          //             });
          //           } catch (error) {
          //             toast.error("Failed to update shipment");
          //             console.error(error);
          //           }
          //         }}
          //       >
          //         <RiVerifiedBadgeFill
          //           className={`hover:text-primary transition-all dark:text-primary/30 text-primary/50 dark:hover:text-primary ${
          //             shipmentVerification
          //               ? "dark:text-primary/100 text-primary/100"
          //               : ""
          //           }`}
          //         />
          //       </div>
          //       <div
          //         className="text-xl cursor-pointer hover:text-[#00AEE4] transition-all"
          //         onClick={async () => {
          //           // const checked =
          //           //   !shipment?.verificationStatus?.shipmentDeparture;
          //           try {
          //             await axios.put(
          //               `${import.meta.env.VITE_BACKEND_URL}/api/editDeparture/${id}`,
          //               { departure: !shipmentDeparture },
          //               { withCredentials: true }
          //             );
          //             toast.success("Shipment updated successfully");
          //             queryClient.invalidateQueries({
          //               queryKey: ["shipments"],
          //             });
          //           } catch (error) {
          //             toast.error("Failed to update shipment");
          //             console.error(error);
          //           }
          //         }}
          //       >
          //         <FaPlaneDeparture
          //           className={`hover:text-primary transition-all dark:text-primary/30 text-primary/50 dark:hover:text-primary ${
          //             shipmentDeparture
          //               ? "dark:text-primary/100 text-primary/100"
          //               : ""
          //           }`}
          //         />
          //       </div>
          //       <div
          //         className="text-xl cursor-pointer hover:text-[#00AEE4] transition-all"
          //         onClick={async () => {
          //           // const checked =
          //           //   !shipment.verificationStatus.shipmentDelivered;
          //           try {
          //             await axios.put(
          //               `${import.meta.env.VITE_BACKEND_URL}/api/editDelivered/${id}`,
          //               { delivered: !shipmentDelivered },
          //               { withCredentials: true }
          //             );
          //             toast.success("Shipment updated successfully");
          //             queryClient.invalidateQueries({
          //               queryKey: ["shipments"],
          //             });
          //           } catch (error) {
          //             toast.error("Failed to update shipment");
          //             console.error(error);
          //           }
          //         }}
          //       >
          //         <FaHome
          //           className={`dhover:text-primary transition-all dark:text-primary/30 text-primary/50 dark:hover:text-primary ${
          //             shipmentDelivered
          //               ? "dark:text-primary/100 text-primary/100"
          //               : ""
          //           }`}
          //         />
          //       </div>
          //       {/* <button
          //         className="text-xl hover:underline cursor-pointer hover:text-red-500 transition-all"
          //         onClick={() => {
          //           setShipmentToDelete(shipment);
          //           setIsConfirmDeleteOpen(true);
          //         }}
          //       >
          //         <MdDeleteForever />
          //       </button> */}
          //     </>
          //   ) : (
          //     ""
          //   )}
          //   {/* <button
          //     className="hover:underline text-xl cursor-pointer hover:text-purple-400 transition-all flex gap-2"
          //     onClick={() => {}}
          //   >
          //     <RiVerifiedBadgeFill className="hover:text-primary transition-all dark:text-primary/30 text-primary/50 dark:hover:text-primary" />
          //   </button>
          //   <button
          //     className="hover:underline text-xl cursor-pointer hover:text-purple-400 transition-all flex gap-2"
          //     onClick={() => {}}
          //   >
          //     <FaPlaneDeparture className="hover:text-primary transition-all dark:text-primary/30 text-primary/50 dark:hover:text-primary" />
          //   </button>
          //   <button
          //     className="hover:underline text-xl cursor-pointer hover:text-purple-400 transition-all flex gap-2"
          //     onClick={() => {}}
          //   >
          //     <FaHome className="hover:text-primary transition-all dark:text-primary/30 text-primary/50 dark:hover:text-primary" />
          //   </button> */}
          // </div>
        );
      },
    },

    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }: { row: any }) => {
        const date = row.getValue("date");
        const formatted = getReadableData(date);
        return <div className="font-medium">{formatted}</div>;
      },
    },

    {
      accessorKey: "consignor.name",
      header: "Sender",
    },
    {
      accessorKey: "consignee.name",
      header: "Receiver",
    },
    {
      accessorKey: "consignee.country",
      header: "Destination Country",
      cell: ({ row }: { row: any }) => {
        const value = row.original.consignee?.country;
        const countryCode = value.slice(
          value.indexOf("[") + 1,
          value.indexOf("]")
        );
        const flagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
        return (
          <div className="flex gap-4 max-w-48 items-center text-left">
            {flagUrl ? (
              <img src={flagUrl} alt="Consignee's flag" className="w-8" />
            ) : (
              <></>
            )}
            {value}
          </div>
        );
      },
    },
    {
      accessorKey: "verificationStatus.shipmentVerified",
      header: "Status",
      cell: ({ row }: { row: any }) => {
        const value = row.original.verificationStatus?.shipmentVerified;
        return (
          <div
            className={`font-black ${value ? "text-green-400" : "text-red-400"}`}
          >
            {value ? "Verified" : "Unverified"}
          </div>
        );
      },
    },
  ];
};

export default getColumns;
