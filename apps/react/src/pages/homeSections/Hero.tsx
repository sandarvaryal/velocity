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
    <div className="bg-gradient-to-b from-[#111111] via-[#5D6894] to-white min-h-[35rem] sm:min-h-[45rem]">
      {/* <div className=" bg-[url('/stars.png')]"> */}
      <div className="">
        <div className="flex place-items-center pl-[6rem] sm:min-h-[45rem]">
          <div className="flex-1 flex flex-col gap-[2rem]">
            <h1 className="text-[#fff] text-6xl font-bold flex flex-col gap-[1rem]">
              <span className="text-[#F97316] text-[6rem] font-extrabold">
                Velocity
              </span>{" "}
              Cargo And Courier
            </h1>
            <p className="text-[#abb2b9] font-bold">
              Velocity delivers cargo safely and on time—by land, sea, or air.
              Trusted logistics for businesses that move the world.
              {/* At Velocity, we provide fast, reliable shipping solutions by land,
          sea, and air. From local deliveries to international freight, our
          experienced team ensures your cargo arrives on-time every time. */}
            </p>
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Enter Tracking Number"
                className="px-4 text-sm sm:text-base py-2 bg-white text-black font-medium w-[60%] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]"
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

          <div className="flex-1 flex ">
            <img src="/aeroplane.png" alt="Login Illustration" className="" />
          </div>
        </div>
      </div>
    </div>

    // <div className="relative w-full z-10 justify-center text-center flex items-center max-w-[100rem] text-white bg-cover bg-center overflow-hidden">
    //   <motion.div className="absolute top-10 left-10 w-16 h-16 border-2 border-blue-500 rounded-full opacity-50 glow-shape" />
    //   <motion.div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-purple-500 rounded-full opacity-50 glow-shape" />

    //   <div className="relative z-10 px-6 sm:px-14">
    //     <motion.div
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
    //       className="flex sm:justify-center mb-2"
    //     >
    //       {/* <img src="/nexus-logo.png" alt="Nexus Logo" className="h-28" /> */}
    //     </motion.div>

    //     <motion.div
    //       initial="hidden"
    //       animate="visible"
    //       className="uppercase text-xl text-gray-200 font-semibold text-left sm:tracking-[0.2rem] sm:justify-center flex text-shadow"
    //     >
    //       {subText.split(" ").map((word, i) => (
    //         <motion.span
    //           key={i}
    //           variants={textVariants}
    //           custom={i}
    //           className="mr-2 -ml-1"
    //         >
    //           {word}
    //         </motion.span>
    //       ))}
    //     </motion.div>

    //     <motion.h1
    //       initial="hidden"
    //       animate="visible"
    //       className="text-5xl flex-wrap md:text-7xl sm:justify-center  sm:text-center font-extrabold leading-tight flex text-shadow"
    //     >
    //       {headingText.split(" ").map((word, i) => (
    //         <motion.span
    //           key={i}
    //           variants={textVariants}
    //           custom={i}
    //           className="mr-2 sm:mr-4"
    //         >
    //           {word}
    //         </motion.span>
    //       ))}
    //     </motion.h1>

    //     <motion.div
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       transition={{ duration: 1, ease: "easeOut", delay: 1 }}
    //       className="mt-4 max-w-4xl justify-center text-left sm:text-center  sm:text-base font-medium text-gray-200 leading-relaxed text-shadow"
    //     >
    //       Fast. Reliable. Seamless. Nexus Courier delivers with speed and
    //       precision, ensuring your packages arrive safely, every time.
    //       Experience the future of logistics today.
    //     </motion.div>

    //     <motion.div
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
    //       className="mt-6 sm:mt-12 flex flex-col sm:justify-center sm:flex-row"
    //     >
    //       <div className="flex w-full sm:justify-center">
    //         <input
    //           type="text"
    //           placeholder="Enter Tracking Number"
    //           className="px-4 text-sm sm:text-base py-2 bg-white text-black font-medium w-[60%] shadow-lg focus:outline-none"
    //           value={searchInput}
    //           onChange={(e) => setSearchInput(e.target.value)}
    //         />
    //         <button
    //           onClick={handleAwbSearch}
    //           className="cursor-pointer bg-blue-500 hover:bg-blue-800 text-sm sm:text-base text-white px-4 py-2 sm:px-6 sm:py-3 font-semibold h-fit transition shadow-lg glow-button"
    //         >
    //           Track now
    //         </button>
    //       </div>
    //     </motion.div>
    //   </div>

    //   <style>
    //     {`
    //       .glow-shape {
    //         box-shadow: 0px 0px 20px rgba(192, 185, 214, 0.8);
    //       }
    //     `}
    //   </style>
    // </div>
  );
};

export default Hero;
