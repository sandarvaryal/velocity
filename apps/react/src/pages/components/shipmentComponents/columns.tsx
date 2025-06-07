import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  Date: string;
  AwbNumber: string;
  Sender: string;
  Receiver: string;
  "Destination Coutnry": string;
  Status: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "AwbNumber",
    header: "AwbNumber",
  },
  {
    accessorKey: "Action",
    header: "Action",
  },

  {
    accessorKey: "Date",
    header: "Date",
  },

  {
    accessorKey: "Sender",
    header: "Sender",
  },
  {
    accessorKey: "Receiver",
    header: "Receiver",
  },
  {
    accessorKey: "Destination Coutnry",
    header: "Destination Country",
  },
  {
    accessorKey: "Status",
    header: "Status",
  },
];
