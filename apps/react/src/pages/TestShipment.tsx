import { DataTable } from "./components/shipmentComponents/DataTable";
import { columns } from "./components/shipmentComponents/columns";

export function TestShipment() {
  return (
    <div className="container mx-auto py-10 px-10">
      <DataTable
        columns={columns}
        data={[
          {
            Date: "string",
            AwbNumber: "string",
            Sender: "string",
            Receiver: "string",
            "Destination Coutnry": "string",
            Status: "string",
          },
          {
            Date: "6/6/2025, 07:57 PM",
            AwbNumber: "7000165",
            Sender: "ARYAL ARYAL",
            Receiver: "YAL RYAL",
            "Destination Coutnry": "[GB] United Kingdom",
            Status: "UNVERIFIED",
          },
        ]}
      />
    </div>
  );
}
