// // import { Tracking } from "../../Tracking";

// import HeroContent from "../homeComponents/HeroContent";
// import HeroImage from "../homeComponents/HeroImage";

// export default function Hero() {
//   return (
//     <div className=" flex flex-col lg:grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
//       <HeroContent />
//       <HeroImage />
//       {/* <Tracking /> */}
//     </div>
//   );
// }

//eta bata

import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: "easeOut",
      type: "spring",
      stiffness: 120,
      damping: 8,
    },
  }),
};

const Hero: React.FC = () => {
  const headingText = "Nexus Export Trade Pvt. Ltd.";
  const subText = "The Nexus Courier";

  return (
    <div className="relative w-full justify-center text-center flex items-center max-w-[100rem] text-white bg-cover bg-center overflow-hidden">
      <motion.div className="absolute top-10 left-10 w-16 h-16 border-2 border-blue-500 rounded-full opacity-50 glow-shape" />
      <motion.div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-purple-500 rounded-full opacity-50 glow-shape" />

      <div className="relative z-10 px-6 sm:px-14">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          className="flex sm:justify-center mb-2"
        >
          {/* <img src="/nexus-logo.png" alt="Nexus Logo" className="h-20" /> */}
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="uppercase text-xl text-gray-200 font-semibold text-left sm:tracking-[0.2rem] sm:justify-center flex text-shadow"
        >
          {subText.split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={textVariants}
              custom={i}
              className="mr-2 -ml-1"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          className="text-5xl flex-wrap md:text-7xl sm:justify-center text-left sm:text-center font-extrabold leading-tight flex text-shadow"
        >
          {headingText.split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={textVariants}
              custom={i}
              className="mr-2 sm:mr-4"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          className="mt-4 max-w-4xl justify-center text-left sm:text-center text-[12px] sm:text-base font-medium text-gray-200 leading-relaxed text-shadow"
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique
          accusamus totam laudantium ad dolorem reprehenderit veniam velit
          laborum.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
          className="mt-6 sm:mt-12 flex flex-col sm:justify-center sm:flex-row"
        >
          <div className="flex w-full sm:justify-center">
            <input
              type="text"
              placeholder="Enter Tracking Number"
              className="px-4 text-center sm:text-left text-sm sm:text-base py-2 bg-white text-black font-medium w-fit sm:w-full md:w-[60%] shadow-lg focus:outline-none"
            />
            <button className="bg-blue-500 hover:bg-blue-800 text-sm sm:text-base text-white px-4 py-2 sm:px-6 sm:py-3 font-semibold h-fit transition shadow-lg glow-button">
              Track now
            </button>
          </div>
        </motion.div>
      </div>

      <style>
        {`
          .glow-shape {
            box-shadow: 0px 0px 20px rgba(0, 162, 255, 0.8);
          }
          .text-shadow {
            text-shadow: 2px 2px 20px rgba(60, 60, 65, 0.7);
          }
        `}
      </style>
    </div>
  );
};

export default Hero;
