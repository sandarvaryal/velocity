import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Hero from "./homeSections/Hero";
import Testimonial from "./homeSections/Testimonial";

import AboutUs from "./homeSections/AboutUs";
import Vision from "./homeSections/Vision";
import Location from "./homeSections/Location";
import Footer from "./homeSections/Footer";
import Steps from "./homeSections/Steps";
import Services from "./homeSections/Services";

import Details from "./homeSections/Details";
import Info from "./homeSections/Info";
import Feature from "./homeSections/Feature";

export default function Home() {
  const images = ["/nex2.jpeg", "/nex.jpeg", "/nex1.jpeg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isManualChange, setIsManualChange] = useState(false);

  const nextImage = () => {
    setDirection(1);
    setIsManualChange(true);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setIsManualChange(true);
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    // <div className="bg-[#5D6894] min-h-[35rem] sm:min-h-[45rem] grid grid-cols-2 ">
    //   <div>
    //     <h1 className="text-[#fff]">Velocity Cargo</h1>
    //     <p className="text-[#abb2b9]">
    //       et accusamus et iusto odio dignissimos ducimus qui blanditiis
    //       praesentium voluptatum deleniti atque corrupti quos dolores et quas
    //       molestias excepturi sint occaecati cupiditate non provident, similique
    //       sunt in culpa qui officia deserunt mollitia animi, id est laborum et
    //       dolorum fuga. Et harum quidem rerum facilis est et expedita
    //     </p>
    //   </div>
    //   <div>image eta</div>
    // </div>

    //break
    <>
      <Hero />
      <div className="bg-gray-100">
        <div id="services" className="overflow-hidden">
          <Services />
          <Steps />
          <Info />
          <Testimonial />
          <Vision />
          <Location />
          <Footer />
        </div>
      </div>
    </>
    //break
    // <div className="mb-4">
    //   <div className="h-6 bg-blue-500"></div>
    //   {/* HERO SECTION  */}
    //   <div className="bg-[#EEF8FF]">
    //     <section className="relative w-full min-h-[35rem] sm:min-h-[45rem] flex items-center overflow-hidden">
    //       <div className="absolute inset-0 bg-gradient-to-r from-[#04174b]/70 to-[#2652c1]/70 z-10"></div>

    //       <div className="absolute w-full h-full">
    //         <AnimatePresence custom={direction} mode="popLayout">
    //           {currentImageIndex !== 0 ? (
    //             <motion.img
    //               key={currentImageIndex}
    //               src={images[currentImageIndex]}
    //               className="absolute w-full h-full object-cover"
    //               initial={{ x: direction * 100 + "%", opacity: 0 }}
    //               animate={{ x: "0%", opacity: 1 }}
    //               exit={{ x: -direction * 100 + "%", opacity: 0 }}
    //               transition={{ duration: 0.8, ease: "easeInOut" }}
    //             />
    //           ) : (
    //             <motion.img
    //               key={currentImageIndex}
    //               src={images[currentImageIndex]}
    //               className="absolute w-full h-full object-cover"
    //               initial={{ opacity: 1 }}
    //               animate={{ opacity: 1 }}
    //               exit={{ opacity: 0 }}
    //               transition={{ duration: 0.8, ease: "easeInOut" }}
    //             />
    //           )}
    //         </AnimatePresence>
    //       </div>

    //       <AnimatePresence mode="wait">
    //         {isManualChange ? (
    //           <motion.div
    //             key={currentImageIndex}
    //             initial={{ opacity: 0, y: 20 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             exit={{ opacity: 0, y: -20 }}
    //             transition={{ duration: 0.8, ease: "easeOut" }}
    //             className="absolute w-full h-full flex items-center justify-center z-20"
    //           >
    //             <Hero />
    //           </motion.div>
    //         ) : (
    //           <div className="absolute w-full h-full flex items-center justify-center z-20">
    //             <Hero />
    //           </div>
    //         )}
    //       </AnimatePresence>

    //       <button
    //         className="cursor-pointer absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full z-30 transition-all duration-300 shadow-lg"
    //         onClick={prevImage}
    //       >
    //         <AiOutlineLeft className="text-sm" />
    //       </button>

    //       <button
    //         className="cursor-pointer absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full z-30 transition-all duration-300 shadow-lg"
    //         onClick={nextImage}
    //       >
    //         <AiOutlineRight className="text-sm" />
    //       </button>
    //     </section>
    //   </div>

    //   <div className="h-18 bg-gray-100"></div>

    //   {/* LOGOS SECTION */}
    //   {/* <div className="border border-gray-400 bg-white">
    //     <div id="" className="max-w-[100rem] px-6 sm:px-12 mx-auto">
    //       <Logos />
    //     </div>
    //   </div> */}

    //   {/* INFO SECTION */}
    //   <div className=" bg-white">
    //     <div id="" className="max-w-[100rem] px-6 sm:px-12 mx-auto">
    //       <Info />
    //     </div>
    //   </div>

    //   {/* SERVICES SECTION */}
    //   <div className=" bg-gray-100">
    //     <div id="services" className="max-w-[100rem]  px-6 sm:px-12 mx-auto">
    //       <Services />
    //     </div>
    //   </div>

    //   {/* FEATURE SECTION */}
    //   <div id="features" className="max-w-[100rem] px-6 sm:px-12 mx-auto">
    //     <Feature />
    //   </div>

    //   {/* DETAILS SECTION */}
    //   <div id="" className="max-w-[100rem] px-6 sm:px-12 mx-auto">
    //     <Details />
    //   </div>

    //   {/* STEPS SECTION */}
    //   <div className="bg-black">
    //     <div id="features" className="max-w-[100rem]  px-6 sm:px-12 mx-auto">
    //       <Steps />
    //     </div>
    //   </div>

    //   <div id="about" className="max-w-[100rem] px-6 sm:px-12 mx-auto">
    //     <AboutUs />
    //   </div>

    //   {/* VISION SECTION */}
    //   <div className="bg-gray-100">
    //     <div id="vision" className="max-w-[100rem]  px-6 sm:px-12 mx-auto">
    //       <Vision />
    //     </div>
    //   </div>

    //   {/* LOCATION SECTION */}
    //   <div id="location" className="max-w-[100rem] px-6 sm:px-12 mx-auto">
    //     <Location />
    //   </div>

    //   {/* FOOTER SECTION */}
    //   <div className="bg-black">
    //     <div className="max-w-[100rem] px-6 sm:px-12 mx-auto">
    //       <Footer />
    //     </div>
    //   </div>
    // </div>
  );
}
