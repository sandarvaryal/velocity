import { useParams } from "react-router-dom";
import ShipmentForm from "./components/ShipmentForm";
import { getShipment } from "../api/shipment/getShipments";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ProtectedWrap from "../hoc/ProtectedWrap";
import { FaEdit } from "react-icons/fa";

function UnprotectedEditShipment() {
  const { awbNumber } = useParams();

  const { data, isError } = useQuery({
    queryKey: ["shipment", awbNumber],
    queryFn: () => getShipment(awbNumber),
    placeholderData: [],
  });

  if (isError) {
    toast.error(data.response?.data?.message);
  }
  console.log(data);

  return (
    <>
      <div className="max-w-[100rem] m-auto mb-24 px-6 relative pt-2">
        <h1 className=" font-semibold text-gray-700 flex items-center gap-2 pt-2 ">
          <span className="text-lg flex items-center gap-1 sm:text-xl">
            <FaEdit /> Edit Shipment
          </span>
        </h1>
        <ShipmentForm data={data} formFor={"EditShipment"} />
      </div>
    </>
  );
}

export const EditShipment = ProtectedWrap(UnprotectedEditShipment);
