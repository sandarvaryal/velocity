import { queryClient } from "@/Providers";
import { handlePrint } from "@/util/handlePrint";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FaDownload, FaEdit, FaHome, FaPlaneDeparture } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

export const Actions = ({
  id,
  awbNumber,
  shipmentVerification,
  shipmentDeparture,
  shipmentDelivered,
}: {
  id: string;
  awbNumber: string;
  shipmentVerification: boolean;
  shipmentDeparture: boolean;
  shipmentDelivered: boolean;
}) => {
  const { isError: superAdminError, isLoading: superAdminLoading } = useQuery({
    queryKey: ["verify"],
    queryFn: async () => {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/superAdmin/verify`, {
        withCredentials: true,
      });
      return true;
    },
    retry: false,
  });
  return (
    <div className="flex gap-2">
      <NavLink to={`/user/editShipment/${awbNumber}`}>
        <button className="hover:underline text-xl cursor-pointer hover:text-purple-400 transition-all">
          <FaEdit className="hover:text-primary transition-all  dark:hover:text-foreground" />
        </button>
      </NavLink>
      <button
        className="hover:underline text-xl cursor-pointer hover:text-purple-400 transition-all flex gap-2"
        onClick={() => handlePrint(awbNumber)}
      >
        <MdPrint className="hover:text-primary transition-all  dark:hover:text-foreground" />
      </button>
      <button
        className="hover:underline text-xl cursor-pointer hover:text-purple-400 transition-all flex gap-2"
        onClick={() => {}}
      >
        <FaDownload className="hover:text-primary transition-all  dark:hover:text-foreground" />
      </button>{" "}
      {!superAdminError && !superAdminLoading ? (
        <>
          <div
            className="text-xl cursor-pointer hover:text-[#00AEE4] transition-all"
            onClick={async () => {
              // const checked =
              //   !shipment?.verificationStatus?.shipmentVerified;
              try {
                await axios.put(
                  `${import.meta.env.VITE_BACKEND_URL}/api/editVerification/${id}`,
                  { verification: !shipmentVerification },
                  { withCredentials: true }
                );
                toast.success("Shipment updated successfully");
                queryClient.invalidateQueries({
                  queryKey: ["shipments"],
                });
              } catch (error) {
                toast.error("Failed to update shipment");
                console.error(error);
              }
            }}
          >
            <RiVerifiedBadgeFill
              className={`hover:text-primary transition-all dark:text-primary/30 text-primary/50 dark:hover:text-primary ${
                shipmentVerification
                  ? "dark:text-primary/100 text-primary/100"
                  : ""
              }`}
            />
          </div>
          <div
            className="text-xl cursor-pointer hover:text-[#00AEE4] transition-all"
            onClick={async () => {
              // const checked =
              //   !shipment?.verificationStatus?.shipmentDeparture;
              try {
                await axios.put(
                  `${import.meta.env.VITE_BACKEND_URL}/api/editDeparture/${id}`,
                  { departure: !shipmentDeparture },
                  { withCredentials: true }
                );
                toast.success("Shipment updated successfully");
                queryClient.invalidateQueries({
                  queryKey: ["shipments"],
                });
              } catch (error) {
                toast.error("Failed to update shipment");
                console.error(error);
              }
            }}
          >
            <FaPlaneDeparture
              className={`hover:text-primary transition-all dark:text-primary/30 text-primary/50 dark:hover:text-primary ${
                shipmentDeparture
                  ? "dark:text-primary/100 text-primary/100"
                  : ""
              }`}
            />
          </div>
          <div
            className="text-xl cursor-pointer hover:text-[#00AEE4] transition-all"
            onClick={async () => {
              // const checked =
              //   !shipment.verificationStatus.shipmentDelivered;
              try {
                await axios.put(
                  `${import.meta.env.VITE_BACKEND_URL}/api/editDelivered/${id}`,
                  { delivered: !shipmentDelivered },
                  { withCredentials: true }
                );
                toast.success("Shipment updated successfully");
                queryClient.invalidateQueries({
                  queryKey: ["shipments"],
                });
              } catch (error) {
                toast.error("Failed to update shipment");
                console.error(error);
              }
            }}
          >
            <FaHome
              className={`dhover:text-primary transition-all dark:text-primary/30 text-primary/50 dark:hover:text-primary ${
                shipmentDelivered
                  ? "dark:text-primary/100 text-primary/100"
                  : ""
              }`}
            />
          </div>
          {/* <button
                className="text-xl hover:underline cursor-pointer hover:text-red-500 transition-all"
                onClick={() => {
                  setShipmentToDelete(shipment);
                  setIsConfirmDeleteOpen(true);
                }}
              >
                <MdDeleteForever />
              </button> */}
        </>
      ) : (
        ""
      )}
      {/* <button
            className="hover:underline text-xl cursor-pointer hover:text-purple-400 transition-all flex gap-2"
            onClick={() => {}}
          >
            <RiVerifiedBadgeFill className="hover:text-primary transition-all dark:text-primary/30 text-primary/50 dark:hover:text-primary" />
          </button>
          <button
            className="hover:underline text-xl cursor-pointer hover:text-purple-400 transition-all flex gap-2"
            onClick={() => {}}
          >
            <FaPlaneDeparture className="hover:text-primary transition-all dark:text-primary/30 text-primary/50 dark:hover:text-primary" />
          </button>
          <button
            className="hover:underline text-xl cursor-pointer hover:text-purple-400 transition-all flex gap-2"
            onClick={() => {}}
          >
            <FaHome className="hover:text-primary transition-all dark:text-primary/30 text-primary/50 dark:hover:text-primary" />
          </button> */}
    </div>
  );
};
