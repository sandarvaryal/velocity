import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProtectedWrap from "../hoc/ProtectedWrap";
import { handlePrint } from "../util/handlePrint";
import { handleDownloadExcel } from "../util/handleDownloadExcel";
import axios from "axios";
import ModalFilter from "./components/ModalFilter";

// ICONS
import { FaPlaneDeparture } from "react-icons/fa";
import { MdPrint, MdVerified } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { FaDownload } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import MiniSpinner from "../components/MiniSpinner";
import { RiHome9Fill } from "react-icons/ri";
import ConfirmationModal from "../components/ConfirmationModal";
import { FaCopy } from "react-icons/fa6";

const fetchFlagUrl = async (countryCode: string) => {
  const response = await axios.post(
    "https://countriesnow.space/api/v0.1/countries/flag/images",
    { iso2: countryCode }
  );
  return response.data.data.flag;
};

function UnprotectedShipments() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [shipmentToDelete, setShipmentToDelete] = useState<any>(null);

  const [filters, setFilters] = useState({
    page,
    awbNumber: "",
    consignorName: "",
    consignorPhone: "",
    consigneeName: "",
    consigneePhone: "",
    to: "",
    dateFrom: "",
    dateTo: "",
  });

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
    }));
  }, [page]);

  const { data: isSuperAdmin, isError: superAdminError } = useQuery({
    queryKey: ["superVerify"],
    queryFn: async () => {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/superAdmin/verify`, {
        withCredentials: true,
      });
      return true;
    },
    retry: false,
  });

  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["shipments", filters],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/getShipments`,
        {
          withCredentials: true,
          params: filters,
        }
      );
      return response.data;
    },
  });

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
      page,
    }));
    setIsModalOpen(false);
    refetch();
  };

  const [shipments, setShipments] = useState<any[]>([]);
  const [flagUrls, setFlagUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isSuccess && data?.shipment) {
      console.log("Data fetched successfully:", data);
      setShipments(data.shipment);

      data.shipment.forEach((shipment: any) => {
        const countryCode = shipment.consignee.country.slice(
          shipment.consignee.country.indexOf("[") + 1,
          shipment.consignee.country.indexOf("]")
        );
        if (!flagUrls[countryCode]) {
          fetchFlagUrl(countryCode).then((flagUrl) => {
            setFlagUrls((prev) => ({ ...prev, [countryCode]: flagUrl }));
          });
        }
      });
    }
  }, [isSuccess, data, flagUrls]);

  const totalPages = data?.totalPage || 1;
  const isPrevDisabled = page === 1;
  const isNextDisabled = page >= totalPages;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const handleConfirmDelete = async () => {
    if (!shipmentToDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/deleteShipment/${shipmentToDelete.id}`,
        { withCredentials: true }
      );
      toast.success("Shipment Deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: ["shipments"],
      });
      setIsConfirmDeleteOpen(false);
    } catch (error) {
      toast.error("Failed to delete shipment");
      console.error(error);
    }
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

  return (
    <div className="mb-24">
      <div className="flex max-w-[100rem] m-auto px-4 sm:px-6 justify-between items-center">
        <h1 className=" font-semibold text-gray-700 flex items-center gap-2 pt-2 ">
          <span className="text-lg flex items-center gap-1 sm:text-xl">
            <FaPlaneDeparture /> All Shipments
          </span>
        </h1>

        <div className="flex items-center pt-2">
          <div className="flex justify-between">
            <button
              className="flex gap-2 items-center py-2 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <span>Filter</span>
              <VscSettings className="font-bold text-lg" />
            </button>
          </div>
          <ModalFilter
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onApply={handleApplyFilters}
          />
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-center">
        <div className="flex justify-between sm:justify-center w-full items-center gap-2 sm:gap-8 px-4 sm:px-6 py-2 rounded-md">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={isPrevDisabled}
            className="flex items-center text-left gap-1 cursor-pointer text-gray-600 border py-2 px-4 border-stone-200 hover:text-black text-sm sm:w-32 justify-center transition-all hover:bg-gray-100"
          >
            <FaChevronLeft />
            Previous
          </button>
          <span className="sm:hidden text-sm font-semibold text-gray-700">
            Page {page} of {totalPages}
          </span>
          <span className="hidden sm:block text-sm font-semibold text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={isNextDisabled}
            className="flex items-center w-32 gap-1 cursor-pointer text-gray-600 border py-2 px-4 border-stone-200 justify-center transition-all hover:bg-gray-100 hover:text-black text-sm"
          >
            Next
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="bg-white rounded-md overflow-hidden max-w-[100rem] text-center m-auto px-4 sm:px-6 py-2">
        <div className="overflow-x-auto shadow">
          <div className="min-w-max">
            <div className="grid grid-cols-7 bg-gray-100 p-3 font-semibold text-sm">
              <span>Date</span>
              <span>AWB Number</span>
              <span>Sender</span>
              <span>Receiver</span>
              <span>Destination Country</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {shipments.length === 0 ? (
              <div>No shipments available</div>
            ) : (
              shipments.map((shipment: any, index: number) => {
                const countryCode = shipment.consignee.country.slice(
                  shipment.consignee.country.indexOf("[") + 1,
                  shipment.consignee.country.indexOf("]")
                );
                const flagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;

                return (
                  <div
                    key={shipment.id}
                    className={`grid grid-cols-7 p-3 text-sm items-center ${
                      index % 2 !== 0 ? "bg-gray-100" : ""
                    }`}
                  >
                    <div>{getReadableData(shipment.date)}</div>
                    <div className="flex gap-2 justify-center items-center">
                      {shipment.awbNumber}
                      <button
                        className="cursor-pointer "
                        onClick={() => {
                          navigator.clipboard.writeText(shipment.awbNumber);
                        }}
                      >
                        <FaCopy className="hover:text-gray-400 transition-all" />
                      </button>
                    </div>
                    <div>{shipment.consignor.name}</div>
                    <div>{shipment.consignee.name}</div>
                    <div className="flex gap-4 max-w-48 items-center text-left">
                      {flagUrl ? (
                        <img
                          src={flagUrl}
                          alt="Consignee's flag"
                          className="w-8"
                        />
                      ) : (
                        <MiniSpinner />
                      )}
                      {shipment.consignee.country}
                    </div>

                    <div
                      className={`text-xs font-semibold ${
                        shipment.verificationStatus.shipmentVerified
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {shipment.verificationStatus.shipmentVerified
                        ? "VERIFIED"
                        : "UNVERIFIED"}
                    </div>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          navigate(`/shipments/edit/${shipment.awbNumber}`)
                        }
                        className="hover:underline text-xl cursor-pointer hover:text-purple-400 transition-all"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handlePrint(shipment.awbNumber)}
                        className="text-xl hover:underline cursor-pointer hover:text-[#00AEE4] transition-all"
                      >
                        <MdPrint />
                      </button>
                      <button
                        onClick={() => handleDownloadExcel(shipment.awbNumber)}
                        className="text-lg hover:underline cursor-pointer hover:text-[#00AEE4] transition-all"
                      >
                        <FaDownload />
                      </button>

                      {/* ------------------------------------------------------------------------------------------------ */}
                      {/* <input
                        type="checkbox"
                        checked={shipment.verificationStatus.shipmentVerified}
                        className="text-xl hover:underline cursor-pointer hover:text-[#00AEE4] transition-all"
                        onChange={async (e: any) => {
                          const checked = e.target.checked;
                          try {
                            await axios.put(
                              `${import.meta.env.VITE_BACKEND_URL}/api/editVerification/${shipment.id}`,
                              { verification: checked },
                              { withCredentials: true }
                            );
                            toast.success("Shipment verified Successfully");
                            queryClient.invalidateQueries({
                              queryKey: ["shipments"],
                            });
                          } catch (error) {
                            toast.error("Failed to update shipment");
                            console.error(error);
                          }
                        }}
                      /> */}
                      {isSuperAdmin && !superAdminError && (
                        <>
                          <div
                            className="text-xl cursor-pointer hover:text-[#00AEE4] transition-all"
                            onClick={async () => {
                              const checked =
                                !shipment.verificationStatus.shipmentVerified;
                              try {
                                await axios.put(
                                  `${import.meta.env.VITE_BACKEND_URL}/api/editVerification/${shipment.id}`,
                                  { verification: checked },
                                  { withCredentials: true }
                                );
                                toast.success("Shipment verified successfully");
                                queryClient.invalidateQueries({
                                  queryKey: ["shipments"],
                                });
                              } catch (error) {
                                toast.error("Failed to update shipment");
                                console.error(error);
                              }
                            }}
                          >
                            <MdVerified
                              className={`hover:text-emerald-600 ${
                                shipment.verificationStatus.shipmentVerified
                                  ? "text-emerald-600"
                                  : "text-gray-800"
                              }`}
                            />
                          </div>
                          <div
                            className="text-xl cursor-pointer hover:text-[#00AEE4] transition-all"
                            onClick={async () => {
                              const checked =
                                !shipment.verificationStatus.shipmentDeparture;
                              try {
                                await axios.put(
                                  `${import.meta.env.VITE_BACKEND_URL}/api/editDeparture/${shipment.id}`,
                                  { departure: checked },
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
                              className={`hover:text-indigo-600 ${
                                shipment.verificationStatus.shipmentDeparture
                                  ? "text-indigo-600"
                                  : "text-gray-800"
                              }`}
                            />
                          </div>
                          <div
                            className="text-xl cursor-pointer hover:text-[#00AEE4] transition-all"
                            onClick={async () => {
                              const checked =
                                !shipment.verificationStatus.shipmentDelivered;
                              try {
                                await axios.put(
                                  `${import.meta.env.VITE_BACKEND_URL}/api/editDelivered/${shipment.id}`,
                                  { delivered: checked },
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
                            <RiHome9Fill
                              className={`hover:text-amber-600 ${
                                shipment.verificationStatus.shipmentDelivered
                                  ? "text-amber-600"
                                  : "text-gray-800"
                              }`}
                            />
                          </div>
                          <button
                            className="text-xl hover:underline cursor-pointer hover:text-red-500 transition-all"
                            onClick={() => {
                              setShipmentToDelete(shipment);
                              setIsConfirmDeleteOpen(true);
                            }}
                          >
                            <MdDeleteForever />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-center">
        <div className="flex justify-between sm:justify-center w-full items-center gap-2 sm:gap-8 px-4 sm:px-6 py-2 rounded-md">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={isPrevDisabled}
            className="flex items-center text-left gap-1 cursor-pointer text-gray-600 border py-2 px-4 border-stone-200 hover:text-black text-sm sm:w-32 justify-center transition-all hover:bg-gray-100"
          >
            <FaChevronLeft />
            Previous
          </button>
          <span className="sm:hidden text-sm font-semibold text-gray-700">
            Page {page} of {totalPages}
          </span>
          <span className="hidden sm:block text-sm font-semibold text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={isNextDisabled}
            className="flex items-center w-32 gap-1 cursor-pointer text-gray-600 border py-2 px-4 border-stone-200 justify-center transition-all hover:bg-gray-100 hover:text-black text-sm"
          >
            Next
            <FaChevronRight />
          </button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export const Shipments = ProtectedWrap(UnprotectedShipments);
