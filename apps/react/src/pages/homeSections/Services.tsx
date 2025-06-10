import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
import Lottie from "lottie-react";

// import priceAnimation from "./price-animation.json";

// const services = [
//   { title: "Affortable Pricing", img: "/services/airp.jpg" },
//   { title: "Fase Delivery", img: "/services/sea.jpg" },
//   { title: "Door-to-door Service", img: "/services/land.jpg" },
//   { title: "Tracking available", img: "/services/ecommerce.jpg" },
//   // { title: "Documents Courier", img: "/services/document.jpg" },
//   // { title: "Doorstep Delivery", img: "/services/door.jpeg" },
// ];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.3 },
//   },
// };
// const containerVariants = {
//   hidden: { opacity: 1, scale: 1 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: { staggerChildren: 0.3, ease: "easeOut", delay: 0.3 },
//   },
// };
// variants={{
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
//   },
// }}

// const cardVariants = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
// };

const Services: React.FC = () => {
  const [priceAnimationData, setPriceAnimationData] = useState(null);
  const [trackAnimationData, setTrackAnimationData] = useState(null);
  const [fastAnimationData, setFastAnimationData] = useState(null);

  useEffect(() => {
    fetch("/price-animation.json")
      .then((res) => res.json())
      .then((data) => setPriceAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err));
    fetch("/track-animation.json")
      .then((res) => res.json())
      .then((data) => setTrackAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err));
    fetch("/fast-animation.json")
      .then((res) => res.json())
      .then((data) => setFastAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, []);

  const images = [
    "/fedex.svg",
    "/dhl.svg",
    "/ups.svg",
    "/aramex.png",
    "/dpd.svg",
  ];

  if (!priceAnimationData) return <p>Loading animation...</p>;

  const repeatCount = 10;
  const repeatedImages: any = [];
  for (let i = 0; i < repeatCount; i++) {
    images.forEach((image, index) => {
      repeatedImages.push({ src: image, key: `img-sequence${i}-${index}` });
    });
  }
  return (
    <section className="py-8 sm:py-16" id="Services">
      <div className="sm:text-center mb-8 sm:mb-12 flex flex-col gap-4 sm:gap-[1.5rem]">
        <div className="relative mx-4 sm:ml-30 sm:mr-30 overflow-hidden mb-8 sm:mb-[5rem] mt-6 sm:mt-[3rem]">
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-gray-100 to-transparent" />
          <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-gray-100 to-transparent" />
          <div className="flex animate-marquee-left w-max">
            <div className="flex flex-nowrap gap-6 sm:gap-[4rem]">
              {repeatedImages.map((image: any) => (
                <img
                  key={image.key}
                  src={image.src}
                  alt={`image-${image.key}`}
                  className="h-16 w-24 sm:h-[5rem] sm:w-[7rem] object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] font-bold text-gray-900 px-4 sm:px-0">
          Reliable Logistics. Unmatched{" "}
          <span className="text-[#F97316]">Velocity</span>.
        </h2>
        <h4 className="text-sm sm:text-base md:text-[1rem] text-[#898989] px-4 sm:px-0">
          Let Velocity handle your cargo with speed and care — <br />
          book your first shipment now on WhatsApp.
        </h4>

        <a
          className="bg-black block self-center text-white py-2 px-4 sm:p-4 rounded-[1rem] text-sm sm:text-base"
          href="https://wa.me/message/T3WNI4I4O2XZO1"
          target="_blank"
        >
          Contact Us
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mx-4 sm:mx-auto md:ml-30 md:mr-30">
        <div className="p-6 sm:p-10 flex flex-col gap-4 sm:gap-5 bg-white overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 h-[20rem] sm:h-[25rem] rounded-2xl">
          <span className="text-lg sm:text-[1.2rem] font-bold">
            Affordable Pricing
          </span>
          <p className="text-[#898989] text-sm sm:text-base">
            Get top-quality cargo services at competitive rates that fit your
            budget.
          </p>
          <div className="h-[10rem] sm:h-[13rem] scale-95 origin-center flex justify-center">
            <Lottie
              animationData={priceAnimationData}
              loop={true}
              className="scale-100 sm:scale-105"
            />
          </div>
        </div>
        <div className="p-6 sm:p-10 flex flex-col gap-4 sm:gap-5 bg-white overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 h-[20rem] sm:h-[25rem] rounded-2xl">
          <span className="text-lg sm:text-[1.2rem] font-bold">
            Live Tracking
          </span>
          <p className="text-[#898989] text-sm sm:text-base">
            Get top-quality cargo services at competitive rates that fit your
            budget.
          </p>
          <div className="h-[10rem] sm:h-full scale-150 sm:scale-175">
            <Lottie
              animationData={trackAnimationData}
              loop={true}
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="p-6 sm:p-10 flex flex-col gap-4 sm:gap-5 bg-white overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 h-[20rem] sm:h-[25rem] rounded-2xl">
          <span className="text-lg sm:text-[1.2rem] font-bold">
            Fast Delivery
          </span>
          <p className="text-[#898989] text-sm sm:text-base">
            Get top-quality cargo services at competitive rates that fit your
            budget.
          </p>
          <div className="h-[10rem] sm:h-full scale-100 sm:scale-110 origin-center">
            <Lottie
              animationData={fastAnimationData}
              loop={true}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] font-bold text-gray-900 text-center mt-8 sm:mt-12 px-4 sm:px-0">
        …and so much more!
      </h2>
    </section>
  );
};

export default Services;
