import ShipmentForm from "./components/ShipmentForm";
// import ProtectedWrap from "../hoc/ProtectedWrap";
import { useLocation } from "react-router-dom";
// import { MdAssignmentAdd } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function TestBookShipment() {
  const location = useLocation();
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/getPreData`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
  if (isLoading) {
    return <>wait</>;
  }
  const data1 = location.state?.cloneData || {
    consignor: data,
  };

  return (
    <div className="container mx-auto py-10 px-10 flex flex-col gap-5">
      <span className="text-[1.5rem] font-extrabold">Book Shipment</span>
      <div>
        <ShipmentForm formFor={"BookShipment"} data={data1} />
      </div>
    </div>
  );
}
