import ShipmentForm from "./components/ShipmentForm";
import ProtectedWrap from "../hoc/ProtectedWrap";
import { useLocation } from "react-router-dom";
import { MdAssignmentAdd } from "react-icons/md";

function UnprotectedBookShipment() {
  const location = useLocation();
  const data = location.state?.cloneData || {
    consignor: {
      company: "Nexus Courier",
      country: "[NP] Nepal",
      zip: "44600",
      state: "Bagmati Zone",
      city: "Kathmandu",
      email: "thenexuscourier@gmail.com",
    },
  };
  return (
    <div className="max-w-[100rem] m-auto px-6 relative pt-2 mb-24">
      <h1 className=" font-semibold text-gray-700 flex items-center gap-2 pt-2 ">
        <span className="text-lg flex items-center gap-1 sm:text-xl">
          <MdAssignmentAdd /> Book Shipment
        </span>
      </h1>
      <ShipmentForm formFor={"BookShipment"} data={data} />
    </div>
  );
}

export const BookShipment = ProtectedWrap(UnprotectedBookShipment);
