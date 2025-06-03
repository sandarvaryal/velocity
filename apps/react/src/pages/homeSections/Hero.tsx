import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const textVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Hero: React.FC = () => {
  const headingText = "Nexus Export Trade Pvt. Ltd.";
  const subText = "The Nexus Courier";
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const handleAwbSearch = async () => {
    if (!searchInput) {
      toast.error("Please enter a tracking number");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/awbExists`,
        { awbNumber: searchInput },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate(`/tracking/${searchInput}`);
        return;
      }
    } catch (e) {
      toast.error("No Shipment Found");
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAwbSearch();
    }
  };
  //bg-[#5D6894]
  // bg-[url('/stars.png')]
  return (
    <div className="bg-gradient-to-b  from-[#111111] via-[#5D6894] to-white min-h-[30rem] sm:min-h-[35rem] lg:min-h-[45rem]">
      <div className="flex flex-col lg:mt-0 mt-7 lg:flex-row place-items-center px-[1.5rem] sm:px-[3rem] lg:pl-[6rem] lg:min-h-[45rem]">
        <div className="flex-1 flex flex-col gap-[1.5rem] sm:gap-[2rem] w-full lg:w-auto">
          <h1 className="text-[#fff] text-4xl sm:text-5xl lg:text-6xl font-bold flex flex-col gap-[0.75rem] sm:gap-[1rem]">
            <span className="text-[#F97316] text-5xl sm:text-6xl lg:text-[6rem] font-extrabold">
              Velocity
            </span>
            Cargo And Courier
          </h1>
          <p className="text-[#abb2b9] font-bold text-sm sm:text-base lg:text-lg">
            Velocity delivers cargo safely and on time—by land, sea, or air.
            Trusted logistics for businesses that move the world.
          </p>
          <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-4">
            <input
              type="text"
              placeholder="Enter Tracking Number"
              className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-white text-black font-medium w-full sm:w-[60%] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleAwbSearch}
              className="cursor-pointer bg-black text-white hover:bg-[#EA6309] text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 font-semibold h-fit transition shadow-lg glow-button"
            >
              Track now
            </button>
          </div>
        </div>

        <div className="flex-1 flex w-full lg:w-auto mt-4 lg:mt-0">
          <img
            src="/aeroplane.png"
            alt="Login Illustration"
            className="w-full h-auto max-h-[20rem] sm:max-h-[25rem] lg:max-h-[30rem] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
