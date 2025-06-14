import { useParams } from "react-router-dom";
import ShipmentForm from "./components/ShipmentForm";
import { getShipment } from "../api/shipment/getShipments";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import ProtectedWrap from "../hoc/ProtectedWrap";
// import { FaEdit } from "react-icons/fa";

// function UnprotectedEditShipment() {
export function EditShipment() {
  const { awbNumber } = useParams();

  const { data, isError } = useQuery({
    queryKey: ["shipment", awbNumber],
    queryFn: () => getShipment(awbNumber),
    placeholderData: [],
  });

  if (isError) {
    toast.error(data.response?.data?.message);
  }
  console.log("data", data);

  return (
    <>
      <div className="container mx-auto py-10 px-10 flex flex-col gap-5">
        {/* <h1 className=" font-semibold text-gray-700 flex items-center gap-2 pt-2 ">
          <span className="text-lg flex items-center gap-1 sm:text-xl">
            <FaEdit /> Edit Shipment
          </span> 
        </h1> */}

        <span className="text-[1.5rem] font-extrabold">Shipments</span>

        <ShipmentForm data={data} formFor={"EditShipment"} />
      </div>
    </>
  );
}

// export const EditShipment = ProtectedWrap(UnprotectedEditShipment);
