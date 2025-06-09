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

export function TestDashboard() {
  return (
    <div className="container mx-auto py-10 px-10 flex flex-col gap-[2rem]">
      <span className="text-[1.5rem] font-extrabold">Dashboard</span>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <DatePicker />
          <DatePicker />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Week">Week</SelectItem>
            <SelectItem value="Year">Year</SelectItem>
            <SelectItem value="All TIme">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-5 border-2 rounded-2xl flex-1 px-10 py-5">
          <div className="flex justify-between">
            <span>Total Shipment</span>
            <Box />
          </div>
          <span className="font-black text-3xl">300</span>
        </div>
        <div className="flex flex-col gap-5 border-2 rounded-2xl flex-1 px-10 py-5">
          <div className="flex justify-between">
            <span>On Departure</span>
            <PlaneTakeoff />
          </div>
          <span className="font-black text-3xl">300</span>
        </div>
        <div className="flex flex-col gap-5 border-2 rounded-2xl flex-1 px-10 py-5">
          <div className="flex justify-between">
            <span>Total Verified</span>
            <BadgeCheck />
          </div>
          <span className="font-black text-3xl">300</span>
        </div>
        <div className="flex flex-col gap-5 border-2 rounded-2xl flex-1 px-10 py-5">
          <div className="flex justify-between">
            <span>Total Delivered</span>
            <House />
          </div>
          <span className="font-black text-3xl">300</span>
        </div>
      </div>
      <ChartBarInteractive />
    </div>
  );
}
