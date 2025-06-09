import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";

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

export const columns = [
  {
    id: "select",
    header: ({ table }: { table: any }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
