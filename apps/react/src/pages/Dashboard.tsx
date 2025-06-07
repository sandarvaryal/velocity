// import { useQuery } from "@tanstack/react-query";
// import ProtectedWrap from "../hoc/ProtectedWrap";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   AreaChart,
//   Area,
// } from "recharts";
// import MiniSpinner from "../components/MiniSpinner";

// const fetchFlagUrl = async (countryCode: string) => {
//   const response = await axios.post(
//     "https://countriesnow.space/api/v0.1/countries/flag/images",
//     { iso2: countryCode }
//   );
//   return response.data.data.flag;
// };

// function UnprotectedDashboard() {
//   const [filters, setFilters] = useState({
//     dateFrom: "",
//     dateTo: "",
//     sortBy: "week",
//   });

//   const { data, isError, isSuccess, refetch } = useQuery({
//     queryKey: ["shipments", filters],
//     queryFn: async () => {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/getDashboard`,
//         {
//           withCredentials: true,
//           params: filters,
//         }
//       );
//       return response.data;
//     },
//   });
//   console.log(data);

//   const [flagUrls, setFlagUrls] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     if (isSuccess && data?.latestShipments) {
//       data.latestShipments.forEach((shipment: any) => {
//         const countryCode = shipment.consignee.country.slice(
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

//   const getReadableData = (string: string) => {
//     const date = new Date(string);
//     const formattedDate = date.toLocaleString("en-US", {
//       timeZone: "Asia/Kathmandu",
//       year: "numeric",
//       month: "numeric",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//     return formattedDate;
//   };

//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");

//   return (
//     <>
//       <div className="flex flex-col">
//         <div className="flex gap-2 justify-between  px-6 pt-2">
//           <div className="flex gap-4">
//             <div>
//               <label htmlFor="dateFrom">From : </label>
//               <input
//                 className="border"
//                 type="date"
//                 id="dateFrom"
//                 value={dateFrom}
//                 onChange={(e) => setDateFrom(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="dateTo">To : </label>
//               <input
//                 className="border"
//                 type="date"
//                 id="dateTo"
//                 value={dateTo}
//                 onChange={(e) => setDateTo(e.target.value)}
//               />
//             </div>
//             <button
//               className="border"
//               onClick={() => {
//                 if (dateFrom && dateTo) {
//                   setFilters((prevFilters) => {
//                     return {
//                       ...prevFilters,
//                       dateFrom,
//                       dateTo,
//                     };
//                   });
//                 } else {
//                   toast.error("Invalid Date");
//                 }
//               }}
//             >
//               Filter
//             </button>
//           </div>
//           <div>
//             <select
//               onChange={(e: any) => {
//                 setFilters((prevFilters) => ({
//                   ...prevFilters,
//                   dateTo: "",
//                   dateFrom: "",
//                   sortBy: e.target.value,
//                   by: Math.random(),
//                 }));
//               }}
//             >
//               <option value="week">Week</option>
//               <option value="year">Year</option>
//               <option value="allTime">AllTime</option>
//             </select>
//           </div>
//         </div>
//         <div className="flex gap-2 justify-between  px-6 pt-2">
//           <div className="flex flex-col">
//             <span>Total Shipment</span>
//             <span>{data?.totalShipment}</span>
//           </div>
//           <div className="flex flex-col">
//             <span>On Departure</span>
//             <span>{data?.totalDeparture}</span>
//           </div>
//           <div className="flex flex-col">
//             <span>Total Verified</span>
//             <span>{data?.totalVerified}</span>
//           </div>
//           <div className="flex flex-col">
//             <span>Total Delivered</span>
//             <span>{data?.totalDelivered}</span>
//           </div>
//         </div>
//         <div className="flex justify-between">
//           <div className="w-1/2">
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart
//                 width={500}
//                 height={300}
//                 data={data?.barChartData}
//                 margin={{
//                   top: 5,
//                   right: 30,
//                   left: 20,
//                   bottom: 5,
//                 }}
//                 barSize={20}
//               >
//                 <XAxis
//                   dataKey="date"
//                   scale="point"
//                   padding={{ left: 10, right: 10 }}
//                 />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <Bar
//                   dataKey="totalShipments"
//                   fill="#8884d8"
//                   background={{ fill: "#eee" }}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="w-1/2">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   dataKey="weight"
//                   data={data?.pieChartData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   fill="#8884d8"
//                   label={(entry: any) => entry.country}
//                 />
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//         <div className="px-6 pt-2">
//           <div className="grid grid-cols-6 bg-[#F5F5F7] p-3 font-semibold text-sm">
//             <span>Date</span>
//             <span>AWB Number</span>
//             <span>Consignor</span>
//             <span>Consignee</span>
//             <span>Destination Country</span>
//             <span>Status</span>
//           </div>
//           {data?.latestShipments.length === 0 ? (
//             <div>No shipments available</div>
//           ) : (
//             data?.latestShipments.map((shipment: any, index: number) => {
//               const countryCode = shipment.consignee.country.slice(
//                 shipment.consignee.country.indexOf("[") + 1,
//                 shipment.consignee.country.indexOf("]")
//               );
//               const flagUrl = flagUrls[countryCode];
//               return (
//                 <div
//                   key={shipment.id}
//                   className={`grid grid-cols-6 p-3 text-sm items-center  ${
//                     index % 2 !== 0 ? "bg-[#F5F5F7]" : ""
//                   }`}
//                 >
//                   {/* <div>{shipment.date}</div> */}
//                   <div>{getReadableData(shipment.date)}</div>
//                   <div>{shipment.awbNumber}</div>
//                   <div>{shipment.consignor.name}</div>
//                   <div>{shipment.consignee.name}</div>
//                   <div className="flex gap-4 max-w-48 text-left">
//                     {flagUrl ? (
//                       <img
//                         src={flagUrl}
//                         alt="Consignee's flag"
//                         className="w-8 max-h-6"
//                       />
//                     ) : (
//                       <MiniSpinner />
//                     )}

//                     {shipment.consignee.country}
//                   </div>
//                   <div
//                     className={`text-xs font-semibold ${
//                       shipment.verificationStatus.shipmentVerified
//                         ? "text-green-600"
//                         : "text-red-500"
//                     }`}
//                   >
//                     {shipment.verificationStatus.shipmentVerified
//                       ? "VERIFIED"
//                       : "UNVERIFIED"}
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//         <div className="px-6 pt-2">
//           <ResponsiveContainer width="100%" height={400}>
//             <AreaChart
//               width={500}
//               height={400}
//               data={data?.lineChartData}
//               margin={{
//                 top: 10,
//                 right: 30,
//                 left: 0,
//                 bottom: 0,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Area
//                 type="monotone"
//                 dataKey="totalWeight"
//                 stroke="#8884d8"
//                 fill="#8884d8"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </>
//   );
// }

// export const Dashboard = ProtectedWrap(UnprotectedDashboard);

// eta bata

// import { useQuery } from "@tanstack/react-query";
// import ProtectedWrap from "../hoc/ProtectedWrap";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   AreaChart,
//   Area,
//   Cell,
// } from "recharts";
// import MiniSpinner from "../components/MiniSpinner";

// // import { FaPlaneDeparture, FaUsers } from "react-icons/fa";
// import { FaPlaneDeparture } from "react-icons/fa";
// import { GoPackage } from "react-icons/go";
// import { MdVerified } from "react-icons/md";
// import { RiHome9Fill } from "react-icons/ri";

// const COLORS = ["#6bc1e1", "#8598ee", "#ada5fa", "#ff6666"];

// interface Shipment {
//   id: string;
//   date: string;
//   awbNumber: string;
//   consignor: {
//     name: string;
//     country: string;
//   };
//   consignee: {
//     name: string;
//     country: string;
//   };
//   verificationStatus: {
//     shipmentVerified: boolean;
//   };
// }

// interface DashboardData {
//   totalShipment: number;
//   totalDeparture: number;
//   totalVerified: number;
//   totalDelivered: number;
//   barChartData: Array<{
//     date: string;
//     totalShipments: number;
//   }>;
//   pieChartData: Array<{
//     country: string;
//     weight: number;
//   }>;
//   lineChartData: Array<{
//     date: string;
//     totalWeight: number;
//   }>;
//   latestShipments: Shipment[];
// }

// const fetchFlagUrl = async (countryCode: string): Promise<string> => {
//   const response = await axios.post(
//     "https://countriesnow.space/api/v0.1/countries/flag/images",
//     { iso2: countryCode }
//   );
//   return response.data.data.flag;
// };

// function UnprotectedDashboard() {
//   const [filters, setFilters] = useState({
//     dateFrom: "",
//     dateTo: "",
//     sortBy: "week",
//   });

//   const { data, isSuccess } = useQuery<DashboardData>({
//     queryKey: ["shipments", filters],
//     queryFn: async () => {
//       const response = await axios.get<DashboardData>(
//         `${import.meta.env.VITE_BACKEND_URL}/api/getDashboard`,
//         {
//           withCredentials: true,
//           params: filters,
//         }
//       );
//       return response.data;
//     },
//   });

//   const [flagUrls, setFlagUrls] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     if (isSuccess && data?.latestShipments) {
//       data.latestShipments.forEach((shipment: Shipment) => {
//         const countryCode = shipment.consignee.country.slice(
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

//   const getReadableData = (string: string): string => {
//     const date = new Date(string);
//     const formattedDate = date.toLocaleString("en-US", {
//       timeZone: "Asia/Kathmandu",
//       year: "numeric",
//       month: "numeric",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//     return formattedDate;
//   };

//   const [dateFrom, setDateFrom] = useState<string>("");
//   const [dateTo, setDateTo] = useState<string>("");

//   useEffect(() => {
//     if (dateTo && !dateFrom) {
//       toast.error("Please select a 'from' date first.");
//       setDateTo(""); // Reset 'to' date if 'from' date is not set
//     } else if (dateFrom && dateTo) {
//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         dateFrom,
//         dateTo,
//       }));
//     }
//   }, [dateFrom, dateTo]);

//   return (
//     <div className=" max-w-[100rem] m-auto px-6 mb-24 pt-2">
//       <div className="flex flex-col">
//         <div className="flex flex-col sm:flex-row my-2 gap-2 justify-between">
//           <div className="flex justify-between gap-4">
//             <div className="flex flex-col md:flex-row text-left justify-start md:items-center">
//               <label htmlFor="dateTo" className="font-semibold mr-2">
//                 From
//               </label>
//               <input
//                 className="border border-gray-300 py-1 px-2"
//                 type="date"
//                 id="dateFrom"
//                 value={dateFrom}
//                 onChange={(e) => setDateFrom(e.target.value)}
//               />
//             </div>
//             <div className="flex flex-col md:flex-row  justify-end md:items-center">
//               <label htmlFor="dateTo" className="font-semibold mr-2">
//                 To
//               </label>
//               <input
//                 className="border border-gray-300 py-1 px-2"
//                 type="date"
//                 id="dateTo"
//                 value={dateTo}
//                 onChange={(e) => setDateTo(e.target.value)}
//               />
//             </div>
//           </div>
//           <div>
//             <select
//               className="w-full bg-white border border-gray-300 py-1 px-2"
//               onChange={(e: any) => {
//                 setFilters((prevFilters) => ({
//                   ...prevFilters,
//                   dateTo: "",
//                   dateFrom: "",
//                   sortBy: e.target.value,
//                   by: Math.random(),
//                 }));
//               }}
//             >
//               <option value="week">Week</option>
//               <option value="year">Year</option>
//               <option value="allTime">AllTime</option>
//             </select>
//           </div>
//         </div>
//         <div className="mt-2 mb-10 grid grid-cols-[1fr_1fr] gap-2 md:grid-cols-4 sm:gap-4">
//           {/* Total Shipments stat card */}
//           <div className="bg-neutral-50 bg-gradient-to-r p-3 shadow sm:px-8 sm:py-5">
//             <h2 className="font-semibold text-gray-600 sm:text-xl">
//               Total Shipments
//             </h2>
//             <h1 className="mt-1 flex items-center gap-1 text-xl font-semibold sm:text-2xl">
//               <GoPackage className="text-blue-600" />
//               <span className="text-blue-600">{data?.totalShipment}</span>
//             </h1>
//           </div>

//           {/* On Departure stat card */}
//           <div className="bg-neutral-50 bg-gradient-to-r p-3 shadow sm:px-8 sm:py-5">
//             <h2 className="font-semibold text-gray-600 sm:text-xl">
//               On Departure
//             </h2>
//             <h1 className="mt-1 flex items-center gap-1 text-xl font-semibold sm:text-2xl">
//               <FaPlaneDeparture className="text-indigo-600" />
//               <span className="text-indigo-600">{data?.totalDeparture}</span>
//             </h1>
//           </div>

//           {/* Total Verified stat card */}
//           <div className="bg-neutral-50 bg-gradient-to-r p-3 shadow sm:px-8 sm:py-5">
//             <h2 className="font-semibold text-gray-600 sm:text-xl">
//               Total Verified
//             </h2>
//             <h1 className="mt-1 flex items-center gap-1 text-xl font-semibold sm:text-2xl">
//               <MdVerified className="text-emerald-600" />
//               <span className="text-emerald-600">{data?.totalVerified}</span>
//             </h1>
//           </div>

//           {/* Total Delivered stat card */}
//           <div className="bg-neutral-50 bg-gradient-to-r p-3 shadow sm:px-8 sm:py-5">
//             <h2 className="font-semibold text-gray-600 sm:text-xl">
//               Total Delivered
//             </h2>
//             <h1 className="mt-1 flex items-center gap-1 text-xl font-semibold sm:text-2xl">
//               <RiHome9Fill className="text-amber-600" />
//               <span className="text-amber-600">{data?.totalDelivered}</span>
//             </h1>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-center">
//           {/* Shipments Chart */}
//           <div className="w-full">
//             <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 sm:mb-6">
//               Shipments
//             </h1>
//             <ResponsiveContainer height={350}>
//               <BarChart
//                 width={500}
//                 height={300}
//                 data={[...(data?.barChartData || [])].sort(
//                   (a, b) =>
//                     new Date(a.date).getTime() - new Date(b.date).getTime()
//                 )} // Sort dates in ascending order
//                 margin={{
//                   top: 5,
//                   right: 30,
//                   left: -20,
//                   bottom: 5,
//                 }}
//                 barSize={40}
//               >
//                 <XAxis
//                   dataKey="date"
//                   className="text-[10px] sm:text-base"
//                   tickFormatter={(date) => {
//                     const d = new Date(date);
//                     return d.toLocaleDateString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                     });
//                   }}
//                 />

//                 <YAxis allowDecimals={false} />
//                 <Tooltip
//                   labelFormatter={(label) => {
//                     const d = new Date(label);
//                     return d.toLocaleDateString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                       year: "numeric",
//                     });
//                   }}
//                 />
//                 <Legend />
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <Bar
//                   dataKey="totalShipments"
//                   stroke="#16afe2d5"
//                   fill="#06a7dd80"
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Top 3 Countries Pie Chart */}
//           <div className="w-full">
//             <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 sm:mb-6">
//               Top 3 Countries by Weight
//             </h1>
//             <ResponsiveContainer width="100%" height={350}>
//               <PieChart>
//                 <Pie
//                   dataKey="weight"
//                   data={data?.pieChartData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                 >
//                   {data?.pieChartData?.map((_entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(_, __, props) => props.payload.country} />
//                 <Legend
//                   wrapperStyle={{
//                     fontSize: "12px",
//                     lineHeight: "2",
//                   }}
//                   payload={data?.pieChartData?.map((entry, index) => ({
//                     value: entry.country,
//                     type: "square",
//                     id: entry.country,
//                     color: COLORS[index % COLORS.length],
//                   }))}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="mt-6">
//           <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 sm:mb-6">
//             Recent Shipments
//           </h1>
//           <div className="mt-6">
//             <div className="overflow-x-auto shadow-sm">
//               <div className="min-w-max">
//                 <div className="grid grid-cols-6 text-center bg-[#F5F5F7] p-3 font-semibold text-sm">
//                   <span>Date</span>
//                   <span>AWB Number</span>
//                   <span>Consignor</span>
//                   <span>Consignee</span>
//                   <span>Destination Country</span>
//                   <span>Status</span>
//                 </div>
//                 {data?.latestShipments.length === 0 ? (
//                   <div>No shipments available</div>
//                 ) : (
//                   data?.latestShipments.map(
//                     (shipment: Shipment, index: number) => {
//                       const countryCode = shipment.consignee.country.slice(
//                         shipment.consignee.country.indexOf("[") + 1,
//                         shipment.consignee.country.indexOf("]")
//                       );
//                       const flagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;

//                       return (
//                         <div
//                           key={shipment.id}
//                           className={`grid grid-cols-6 text-center p-3 text-sm items-center ${
//                             index % 2 !== 0 ? "bg-[#F5F5F7]" : ""
//                           }`}
//                         >
//                           <div>{getReadableData(shipment.date)}</div>
//                           <div>{shipment.awbNumber}</div>
//                           <div>{shipment.consignor.name}</div>
//                           <div>{shipment.consignee.name}</div>
//                           <div className="flex gap-4 text-left items-center  max-w-48 ">
//                             {flagUrl ? (
//                               <img
//                                 src={flagUrl}
//                                 alt="Consignee's  flag"
//                                 className="w-8"
//                               />
//                             ) : (
//                               <MiniSpinner />
//                             )}
//                             {shipment.consignee.country}
//                           </div>
//                           <div
//                             className={`text-xs font-semibold ${
//                               shipment.verificationStatus.shipmentVerified
//                                 ? "text-green-600"
//                                 : "text-red-500"
//                             }`}
//                           >
//                             {shipment.verificationStatus.shipmentVerified
//                               ? "VERIFIED"
//                               : "UNVERIFIED"}
//                           </div>
//                         </div>
//                       );
//                     }
//                   )
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-12">
//           <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 sm:mb-6">
//             Total Weight of Shipments
//           </h1>
//           <ResponsiveContainer height={300}>
//             <AreaChart
//               width={500}
//               height={400}
//               data={data?.lineChartData}
//               margin={{
//                 top: 10,
//                 right: 30,
//                 left: -30,
//                 bottom: 0,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis
//                 dataKey="date"
//                 className="text-[10px] sm:text-base"
//                 tickFormatter={(date) => {
//                   const d = new Date(date);
//                   return d.toLocaleDateString("en-US", {
//                     month: "short",
//                     day: "numeric",
//                   });
//                 }}
//               />

//               <YAxis className="text-[10px] sm:text-base" />
//               <Tooltip />
//               <Area
//                 type="monotone"
//                 dataKey="totalWeight"
//                 stroke="#8884d8"
//                 fill="#06a7ddcc"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

// export const Dashboard = ProtectedWrap(UnprotectedDashboard);

import { useQuery } from "@tanstack/react-query";
import ProtectedWrap from "../hoc/ProtectedWrap";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Cell,
} from "recharts";
import MiniSpinner from "../components/main/MiniSpinner";

// import { FaPlaneDeparture, FaUsers } from "react-icons/fa";
import { FaPlaneDeparture } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { RiHome9Fill } from "react-icons/ri";

const COLORS = ["#6bc1e1", "#8598ee", "#ada5fa", "#ef6767"];

interface Shipment {
  id: string;
  date: string;
  awbNumber: string;
  consignor: {
    name: string;
    country: string;
  };
  consignee: {
    name: string;
    country: string;
  };
  verificationStatus: {
    shipmentVerified: boolean;
  };
}

interface DashboardData {
  totalShipment: number;
  totalDeparture: number;
  totalVerified: number;
  totalDelivered: number;
  barChartData: Array<{
    date: string;
    totalShipments: number;
  }>;
  pieChartData: Array<{
    country: string;
    weight: number;
  }>;
  lineChartData: Array<{
    date: string;
    totalWeight: number;
  }>;
  latestShipments: Shipment[];
}

const fetchFlagUrl = async (countryCode: string): Promise<string> => {
  const response = await axios.post(
    "https://countriesnow.space/api/v0.1/countries/flag/images",
    { iso2: countryCode }
  );
  return response.data.data.flag;
};

function UnprotectedDashboard() {
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    sortBy: "week",
  });

  const { data, isSuccess } = useQuery<DashboardData>({
    queryKey: ["shipments", filters],
    queryFn: async () => {
      const response = await axios.get<DashboardData>(
        `${import.meta.env.VITE_BACKEND_URL}/api/getDashboard`,
        {
          withCredentials: true,
          params: filters,
        }
      );
      return response.data;
    },
  });

  const [flagUrls, setFlagUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isSuccess && data?.latestShipments) {
      data.latestShipments.forEach((shipment: Shipment) => {
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

  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  useEffect(() => {
    if (dateTo && !dateFrom) {
      toast.error("Please select a 'from' date first.");
      setDateTo("");
    } else if (dateFrom && dateTo) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        dateFrom,
        dateTo,
      }));
    }
  }, [dateFrom, dateTo]);

  return (
    <div className="m-auto px-6 mb-24 pt-2">
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row my-2 gap-2 justify-between">
          <div className="grid grid-cols-2 justify-between gap-4">
            <div className="flex flex-col md:flex-row text-left justify-start md:items-center">
              <label htmlFor="dateTo" className="font-semibold mr-2">
                From
              </label>
              <input
                className="border border-gray-300  py-1 px-2"
                type="date"
                id="dateFrom"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row  justify-end md:items-center">
              <label htmlFor="dateTo" className="font-semibold mr-2">
                To
              </label>
              <input
                className="border border-gray-300  py-1 px-2"
                type="date"
                id="dateTo"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>
          <div>
            <select
              className="w-full bg-white border border-gray-300 py-1 px-2"
              onChange={(e: any) => {
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  dateTo: "",
                  dateFrom: "",
                  sortBy: e.target.value,
                  by: Math.random(),
                }));
              }}
            >
              <option value="week">Week</option>
              <option value="year">Year</option>
              <option value="allTime">AllTime</option>
            </select>
          </div>
        </div>
        <div className="mt-2 mb-10 grid grid-cols-[1fr_1fr] gap-2 md:grid-cols-4 sm:gap-4">
          {/* Total Shipments stat card */}
          <div className="bg-gray-100 bg-gradient-to-r p-3 shadow sm:px-8 sm:py-5">
            <h2 className="font-semibold text-gray-600 sm:text-xl">
              Total Shipments
            </h2>
            <h1 className="mt-1 flex items-center gap-1 text-xl font-semibold sm:text-2xl">
              <GoPackage className="text-blue-600" />
              <span className="text-blue-600">{data?.totalShipment}</span>
            </h1>
          </div>

          {/* On Departure stat card */}
          <div className="bg-gray-100 bg-gradient-to-r p-3 shadow sm:px-8 sm:py-5">
            <h2 className="font-semibold text-gray-600 sm:text-xl">
              On Departure
            </h2>
            <h1 className="mt-1 flex items-center gap-1 text-xl font-semibold sm:text-2xl">
              <FaPlaneDeparture className="text-indigo-600" />
              <span className="text-indigo-600">{data?.totalDeparture}</span>
            </h1>
          </div>

          {/* Total Verified stat card */}
          <div className="bg-gray-100 bg-gradient-to-r p-3 shadow sm:px-8 sm:py-5">
            <h2 className="font-semibold text-gray-600 sm:text-xl">
              Total Verified
            </h2>
            <h1 className="mt-1 flex items-center gap-1 text-xl font-semibold sm:text-2xl">
              <MdVerified className="text-emerald-600" />
              <span className="text-emerald-600">{data?.totalVerified}</span>
            </h1>
          </div>

          {/* Total Delivered stat card */}
          <div className="bg-gray-100 bg-gradient-to-r p-3 shadow sm:px-8 sm:py-5">
            <h2 className="font-semibold text-gray-600 sm:text-xl">
              Total Delivered
            </h2>
            <h1 className="mt-1 flex items-center gap-1 text-xl font-semibold sm:text-2xl">
              <RiHome9Fill className="text-amber-600" />
              <span className="text-amber-600">{data?.totalDelivered}</span>
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-center">
          {/* Shipments Chart */}
          <div className="w-full">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 sm:mb-6">
              Shipments
            </h1>
            <ResponsiveContainer height={350}>
              <BarChart
                width={500}
                height={300}
                data={[...(data?.barChartData || [])].sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                )} // Sort dates in ascending order
                margin={{
                  top: 5,
                  right: 30,
                  left: -20,
                  bottom: 5,
                }}
                barSize={40}
              >
                <XAxis
                  dataKey="date"
                  className="text-[10px] sm:text-base"
                  tickFormatter={(date) => {
                    const d = new Date(date);
                    return d.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />

                <YAxis allowDecimals={false} />
                <Tooltip
                  labelFormatter={(label) => {
                    const d = new Date(label);
                    return d.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                  dataKey="totalShipments"
                  stroke="#16afe2d5"
                  fill="#06a7dd80"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top 3 Countries Pie Chart */}
          <div className="w-full">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 sm:mb-6">
              Top Countries by Weight
            </h1>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  dataKey="weight"
                  data={data?.pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {data?.pieChartData?.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(_value, _name, props) => {
                    const country = props.payload.country;
                    const weight = props.payload.weight;
                    return [`${country} (${weight} kg)`];
                  }}
                />

                <Legend
                  wrapperStyle={{
                    fontSize: "12px",
                    lineHeight: "2",
                  }}
                  payload={data?.pieChartData?.map((entry, index) => ({
                    value: entry.country,
                    type: "square",
                    id: entry.country,
                    color: COLORS[index % COLORS.length],
                  }))}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 sm:mb-6">
            Recent Shipments
          </h1>
          <div className="mt-6">
            <div className="overflow-x-auto shadow-sm">
              <div className="min-w-max">
                <div className="grid grid-cols-6 text-center bg-[#F5F5F7] p-3 font-semibold text-sm">
                  <span>Date</span>
                  <span>AWB Number</span>
                  <span>Consignor</span>
                  <span>Consignee</span>
                  <span>Destination Country</span>
                  <span>Status</span>
                </div>
                {data?.latestShipments?.length === 0 ? (
                  <div>No shipments available</div>
                ) : (
                  data?.latestShipments?.map(
                    (shipment: Shipment, index: number) => {
                      const countryCode = shipment.consignee.country.slice(
                        shipment.consignee.country.indexOf("[") + 1,
                        shipment.consignee.country.indexOf("]")
                      );
                      const flagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;

                      return (
                        <div
                          key={shipment.id}
                          className={`grid grid-cols-6 text-center p-3 text-sm items-center ${
                            index % 2 !== 0 ? "bg-[#F5F5F7]" : ""
                          }`}
                        >
                          <div>{getReadableData(shipment.date)}</div>
                          <div>{shipment.awbNumber}</div>
                          <div>{shipment.consignor.name}</div>
                          <div>{shipment.consignee.name}</div>
                          <div className="flex gap-4 text-left items-center  max-w-48 ">
                            {flagUrl ? (
                              <img
                                src={flagUrl}
                                alt="Consignee's  flag"
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
                        </div>
                      );
                    }
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 sm:mb-6">
            Total Weight of Shipments
          </h1>
          <ResponsiveContainer height={300}>
            <AreaChart
              width={500}
              height={400}
              data={data?.lineChartData}
              margin={{
                top: 10,
                right: 30,
                left: -30,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                className="text-[10px] sm:text-base"
                tickFormatter={(date) => {
                  const d = new Date(date);
                  return d.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />

              <YAxis className="text-[10px] sm:text-base" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="totalWeight"
                stroke="#8884d8"
                fill="#06a7ddcc"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export const Dashboard = ProtectedWrap(UnprotectedDashboard);
