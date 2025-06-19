import { DatePicker } from "@/components/main/DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BadgeCheck, Box, House, PlaneTakeoff } from "lucide-react";
import { ChartBarInteractive } from "./components/dashboardComponents/BarChart";
import ProtectedWrap from "@/hoc/ProtectedWrap";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function UnprotectedTestDashboard() {
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    sortBy: "week",
  });

  // const { data, isSuccess } = useQuery({
  const { data } = useQuery({
    queryKey: ["shipments", filters],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/getDashboard`,
        {
          withCredentials: true,
          params: filters,
        }
      );
      return response.data;
    },
  });
  const onTimeChange = (value: string) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      dateTo: "",
      dateFrom: "",
      sortBy: value,
    }));
  };
  return (
    <div className="container mx-auto py-10 px-10 flex flex-col gap-[2rem]">
      <span className="text-[1.5rem] font-extrabold">Dashboard</span>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <DatePicker />
          <DatePicker />
        </div>
        <Select defaultValue="week" onValueChange={onTimeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="year">Year</SelectItem>
            <SelectItem value="allTime">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-5 border-2 rounded-2xl flex-1 px-10 py-5">
          <div className="flex justify-between">
            <span>Total Shipment</span>
            <Box />
          </div>
          <span className="font-black text-3xl">{data?.totalShipment}</span>
        </div>
        <div className="flex flex-col gap-5 border-2 rounded-2xl flex-1 px-10 py-5">
          <div className="flex justify-between">
            <span>On Departure</span>
            <PlaneTakeoff />
          </div>
          <span className="font-black text-3xl">{data?.totalDeparture}</span>
        </div>
        <div className="flex flex-col gap-5 border-2 rounded-2xl flex-1 px-10 py-5">
          <div className="flex justify-between">
            <span>Total Verified</span>
            <BadgeCheck />
          </div>
          <span className="font-black text-3xl">{data?.totalVerified}</span>
        </div>
        <div className="flex flex-col gap-5 border-2 rounded-2xl flex-1 px-10 py-5">
          <div className="flex justify-between">
            <span>Total Delivered</span>
            <House />
          </div>
          <span className="font-black text-3xl">{data?.totalDelivered}</span>
        </div>
      </div>
      <ChartBarInteractive />
    </div>
  );
}

export const TestDashboard = ProtectedWrap(UnprotectedTestDashboard);
