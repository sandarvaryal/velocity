import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import TrackingTable from "../homeComponents/TrackingTable";

//

//eta bata

export default function HeroContent() {
  // const [showTracking, setShowTracking] = useState(false);
  const [trackAwbNumber, setTrackAwbNumber] = useState("");
  const navigate = useNavigate();

  const handleTrack = async () => {
    if (!trackAwbNumber) {
      toast.error("Please enter a tracking number");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/awbExists`,
        { awbNumber: trackAwbNumber },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate(`/tracking/${trackAwbNumber}`);
        return;
      }
    } catch (e) {
      toast.error("No Shipment Found");
    }
  };

  return (
    <div className="mt-10 sm:mt-2 text-center lg:text-left">
      <div>
        <h2 className=" tracking-wider uppercase text-gray-600 font-semibold">
          Nexus Export Trade Pvt. Ltd.
        </h2>
        <h1 className="text-4xl -ml-1 sm:text-6xl font-extrabold mb-4 text-gray-900 leading-tight">
          Connecting to the <span className="text-[#06a7dd]">World...</span>
          <br className="hidden md:block" /> One Parcel at a
          {/* <span className="text-[#06a7dd]">Time</span> */}
          <span className="relative text-[#06a7dd] ml-3 inline-block">
            Time
            <svg
              className="absolute -bottom-2 left-0 w-full h-3"
              viewBox="0 0 100 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 5 Q 50 -2, 100 5"
                stroke="#59c3cc"
                strokeWidth="3"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
          </span>
        </h1>
        <p className="text-gray-600 sm:text-lg md:mx-0 mb-6">
          Stay ahead with seamless courier solutions. Our network ensures
          efficient deliveries to 200+ countries – hassle-free and instant.
        </p>
      </div>

      <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-2 justify-center lg:justify-start">
        <input
          type="text"
          placeholder="Enter Tracking Number"
          className="w-full sm:w-80 px-4 py-2 border border-gray-300 bg-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#06a7dd]"
          value={trackAwbNumber}
          onChange={(e) => setTrackAwbNumber(e.target.value)}
        />
        <button
          onClick={handleTrack}
          className="cursor-pointer bg-[#06a7dd] text-white px-6 py-2 text-sm sm:text-base font-medium hover:bg-[#6ba2ce] transition-all"
        >
          Track Now
        </button>
      </div>

      {/* {showTracking && (
        <div
          className="mb-10"
          style={{
            opacity: showTracking ? 1 : 0,
            transform: showTracking ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
          }}
        >
          <TrackingTable />
        </div>
      )} */}

      <div className="flex flex-row gap-8 sm:gap-14 text-gray-800 text-xl font-semibold items-center sm:items-start justify-center lg:justify-start">
        <div>
          <span className="text-4xl text-[#06a7dd] font-bold">200+</span> <br />
          Countries
        </div>
        <div>
          <span className="text-4xl text-[#06a7dd] font-bold">10000+</span>{" "}
          <br />
          Customers
        </div>
      </div>
    </div>
  );
}
