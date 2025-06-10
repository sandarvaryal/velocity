// import { motion } from "framer-motion";
// import { FaBox, FaMapMarkerAlt } from "react-icons/fa";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function Info() {
  const [packAnimationData, setPackAnimationData] = useState(null);

  useEffect(() => {
    fetch("/pack-animation.json")
      .then((res) => res.json())
      .then((data) => setPackAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, []);
  return (
    <>
      <div className="flex flex-col md:flex-row bg-white h-auto md:h-[27rem] mt-[2rem] mx-[1rem] md:mx-[5rem] rounded-[2rem]">
        <div className="flex-1 flex flex-col gap-[2rem] justify-center px-[1.5rem] md:pl-[5rem] py-[2rem] md:py-0">
          <h2 className="text-[1.5rem] md:text-[3rem] leading-[1.5rem] md:leading-[3rem] font-extrabold">
            All your shipping needs, synced seamlessly
          </h2>
          <p className="text-[0.875rem] md:text-base">
            We work with your schedule, location, and preferences—making cargo
            delivery effortless and reliable every step of the way.
          </p>
          <a
            className="bg-black block self-start text-white py-2 px-4 rounded-[1rem] text-[0.875rem] md:text-base"
            href="https://wa.me/message/T3WNI4I4O2XZO1"
            target="_blank"
          >
            Contact Us
          </a>
        </div>
        <div className="flex-1 scale-95 origin-center flex justify-center">
          <Lottie
            animationData={packAnimationData}
            loop={true}
            className="w-full max-w-[20rem] md:max-w-none"
          />
        </div>
      </div>
    </>
  );
}
