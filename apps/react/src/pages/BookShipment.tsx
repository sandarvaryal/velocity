import ShipmentForm from "./components/ShipmentForm";
import ProtectedWrap from "../hoc/ProtectedWrap";
import { useLocation } from "react-router-dom";
import { MdAssignmentAdd } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function UnprotectedBookShipment() {
  const location = useLocation();
  const { data, isError, isLoading } = useQuery({
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
  console.log("data yo ho", data);
  const data1 = location.state?.cloneData || {
    consignor:
      // company: "Velocity Core",
      // country: "[NP] Nepal",
      // zip: "44600",
      // state: "Bagmati Zone",
      // city: "Kathmandu",
      // email: "thenexuscourier@gmail.com",
      data,
  };
  return (
    <div className="m-auto px-6 relative pt-2 mb-24">
      <h1 className=" font-semibold text-gray-700 flex items-center gap-2 pt-2 ">
        <span className="text-lg flex items-center gap-1 sm:text-xl">
          <MdAssignmentAdd /> Book Shipment
        </span>
      </h1>
      <ShipmentForm formFor={"BookShipment"} data={data1} />
    </div>
  );
}

export const BookShipment = ProtectedWrap(UnprotectedBookShipment);
