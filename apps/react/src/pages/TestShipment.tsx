import { useEffect, useState } from "react";
import { DataTable } from "./components/shipmentComponents/DataTable";
import { columns } from "./components/shipmentComponents/columns";
// import { useNavigate } from "react-router-dom";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import ProtectedWrap from "@/hoc/ProtectedWrap";
// import toast from "react-hot-toast";

export const queryClient = new QueryClient();
export function UnprotectedTestShipment() {
  const [page, _setPage] = useState(1);
  const [rows, setRows] = useState(10);
  // const navigate = useNavigate();
  // const queryClient = useQueryClient();

  // const [shipments, setShipments] = useState([]);
  // const [flagUrls, setFlagUrls] = useState<{ [key: string]: string }>({});

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  // const [shipmentToDelete, setShipmentToDelete] = useState<any>(null);

  const [filters, setFilters] = useState({
    rows,
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
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rows,
    }));
  }, [rows]);
  //   const { data: isSuperAdmin, isError: superAdminError } = useQuery({
  //     queryKey: ["superVerify"],
  //     queryFn: async () => {
  //       await axios.get(`${import.meta.env.VITE_BACKEND_URL}/superAdmin/verify`, {
  //         withCredentials: true,
  //       });
  //       return true;
  //     },
  //     retry: false,
  //   });

  const { data, isLoading, refetch } = useQuery({
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
    refetch();
  };
  if (isLoading) {
    return <></>;
  }

  // const handleApplyFilters = (newFilters: typeof filters) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     ...newFilters,
  //     page,
  //   }));
  //   setIsModalOpen(false);
  //   refetch();
  // };

  //   useEffect(() => {
  //     if (isSuccess && data?.shipment) {
  //       console.log("Data fetched successfully:", data);
  //       setShipments(data.shipment);

  //       data.shipment.forEach((shipment: any) => {
  //         const countryCode = shipment?.consignee?.country?.slice(
  //           shipment.consignee.country.indexOf("[") + 1,
  //           shipment.consignee.country.indexOf("]")
  //         );
  //         if (!flagUrls[countryCode]) {
  //           fetchFlagUrl(countryCode).then((flagUrl) => {
  //             setFlagUrls((prev) => ({ ...prev, [countryCode]: flagUrl }));
  //           });
  //         }
  //       });
  //     }
  //   }, [isSuccess, data, flagUrls]);

  // const totalPages = data?.totalPage || 1;
  // const isPrevDisabled = page === 1;
  // const isNextDisabled = page >= totalPages;

  // const handlePageChange = (newPage: number) => {
  //   if (newPage < 1 || newPage > totalPages) return;
  //   setPage(newPage);
  // };

  // const handleConfirmDelete = async () => {
  //   if (!shipmentToDelete) return;

  //   try {
  //     await axios.delete(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/deleteShipment/${shipmentToDelete.id}`,
  //       { withCredentials: true }
  //     );
  //     toast.success("Shipment Deleted Successfully");
  //     queryClient.invalidateQueries({
  //       queryKey: ["shipments"],
  //     });
  //     setIsConfirmDeleteOpen(false);
  //   } catch (error) {
  //     toast.error("Failed to delete shipment");
  //     console.error(error);
  //   }
  // };

  // const getReadableData = (string: string): string => {
  //   const date = new Date(string);
  //   const formattedDate = date.toLocaleString("en-US", {
  //     timeZone: "Asia/Kathmandu",
  //     year: "numeric",
  //     month: "numeric",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     hour12: true,
  //   });
  //   return formattedDate;
  // };
  console.log("totalPage", data.totalPage);

  return (
    <div className="container mx-auto py-10 px-10 flex flex-col gap-5">
      <span className="text-[1.5rem] font-extrabold">Shipments</span>
      <DataTable
        setRows={setRows}
        totalPage={data.totalPage}
        onApply={handleApplyFilters}
        columns={columns}
        page={page}
        setPage={_setPage}
        // data={[
        //   {
        //     Date: "string",
        //     AwbNumber: "string",
        //     Sender: "string",
        //     Receiver: "string",
        //     "Destination Coutnry": "string",
        //     Status: "string",
        //   },
        //   {
        //     Date: "6/6/2025, 07:57 PM",
        //     AwbNumber: "7000165",
        //     Sender: "ARYAL ARYAL",
        //     Receiver: "YAL RYAL",
        //     "Destination Coutnry": "[GB] United Kingdom",
        //     Status: "UNVERIFIED",
        //   },
        // ]}
        data={data.shipment}
      />
    </div>
  );
}
export const TestShipment = ProtectedWrap(UnprotectedTestShipment);
