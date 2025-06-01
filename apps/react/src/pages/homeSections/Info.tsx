import { motion } from "framer-motion";
import { FaBox, FaMapMarkerAlt } from "react-icons/fa";
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
      <div className="flex bg-white h-[27rem] mt-[2rem] mr-[5rem] ml-[5rem] rounded-[2rem]">
        <div className="flex-1 flex flex-col gap-[2rem] justify-center  pl-[5rem] ">
          <h2 className="text-[3rem]/[3rem] font-extrabold">
            All your shipping needs, synced seamlessly
          </h2>
          <p>
            We work with your schedule, location, and preferences—making cargo
            delivery <br></br>effortless and reliable every step of the way.
          </p>
          <a
            className="bg-black block self-start text-white py-2 p-4 rounded-[1rem]"
            href="https://wa.me/message/T3WNI4I4O2XZO1"
            target="_blank"
          >
            Contact Us
            {/* <img
            src="/whatsapp.svg"
            alt="whatsapp svg"
            className="h-3 text-white"
          /> */}
          </a>
        </div>
        {/* <div className="flex-1">image here</div> */}
        <div className=" flex-1 scale-95 origin-center flex justify-center">
          <Lottie
            animationData={packAnimationData}
            loop={true}
            className="w-full"
          />
        </div>
      </div>
    </>

    // <section className=" py-14 ">
    //   <div className=" mx-auto flex flex-col-reverse md:flex-row items-start gap-12">
    //     {/* Left Side - Text */}
    //     <motion.div
    //       className="md:w-1/2"
    //       initial="hidden"
    //       whileInView="visible"
    //       viewport={{ once: false, amount: 0.2 }}
    //       variants={{
    //         hidden: { opacity: 0, y: 60 },
    //         visible: {
    //           opacity: 1,
    //           y: 0,
    //           transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 },
    //         },
    //       }}
    //     >
    //       <h4 className="text-blue-500 uppercase tracking-widest text-sm font-bold">
    //         Info
    //         <span className="inline-block w-12 h-[2px] bg-blue-500 ml-2"></span>
    //       </h4>
    //       <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
    //         Digital Freight That Saves Your Time!
    //       </h2>
    //       <p className="text-gray-600 mt-4 leading-relaxed text-sm md:text-base">
    //         At Nexus Courier, we redefine logistics with innovative solutions
    //         that ensure swift, secure, and efficient deliveries. Our
    //         technology-driven approach guarantees seamless transportation of
    //         goods, optimizing every step of the journey for reliability and
    //         speed.
    //       </p>

    //       {/* Feature Icons */}
    //       <div className="flex flex-col gap-6 mt-8">
    //         {[
    //           {
    //             icon: <FaBox className="text-white text-2xl" />,
    //             title: "Reliable Service",
    //             desc: "Seamless logistics with cutting-edge technology ensuring on-time delivery.",
    //           },
    //           {
    //             icon: <FaMapMarkerAlt className="text-white text-2xl" />,
    //             title: "Real-Time Tracking",
    //             desc: "Stay updated with instant location insights for your shipments.",
    //           },
    //         ].map((feature, index) => (
    //           <motion.div
    //             key={index}
    //             className="flex items-center gap-4"
    //             initial="hidden"
    //             whileInView="visible"
    //             viewport={{ once: false, amount: 0.3 }}
    //             variants={{
    //               hidden: { opacity: 0, x: -50 },
    //               visible: {
    //                 opacity: 1,
    //                 x: 0,
    //                 transition: {
    //                   duration: 0.6,
    //                   delay: index * 0.3,
    //                   ease: "easeOut",
    //                 },
    //               },
    //             }}
    //           >
    //             <div className="w-14 h-14 flex items-center justify-center bg-blue-600 p-4 rounded-full shadow-lg">
    //               {feature.icon}
    //             </div>
    //             <div>
    //               <h3 className="text-lg font-bold text-gray-900">
    //                 {feature.title}
    //               </h3>
    //               <p className="text-gray-600 text-sm">{feature.desc}</p>
    //             </div>
    //           </motion.div>
    //         ))}
    //       </div>
    //     </motion.div>

    //     {/* Right Side - Image */}
    //     <motion.div
    //       className="md:w-1/2 relative"
    //       initial="hidden"
    //       whileInView="visible"
    //       viewport={{ once: false, amount: 0.2 }}
    //       variants={{
    //         hidden: { opacity: 0, scale: 0.9 },
    //         visible: {
    //           opacity: 1,
    //           scale: 1,
    //           transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    //         },
    //       }}
    //     >
    //       <img
    //         src="/airplane.jpg"
    //         alt="Workers in warehouse"
    //         className="w-full shadow-2xl"
    //       />

    //       {/* Floating Info Box */}
    //       <motion.div
    //         className="absolute bottom-6 right-6 md:bottom-12 md:right-12 bg-blue-600 text-white p-4 md:p-6 rounded-lg shadow-xl"
    //         initial={{ opacity: 0, y: 30, scale: 0.8 }}
    //         whileInView={{ opacity: 1, y: 0, scale: 1 }}
    //         viewport={{ once: false }}
    //         transition={{
    //           duration: 0.6,
    //           delay: 0.5,
    //           type: "spring",
    //           stiffness: 100,
    //         }}
    //       >
    //         <FaBox className="text-3xl mb-2" />
    //         <h3 className="text-2xl md:text-4xl font-bold">200+</h3>
    //         <p className="text-xs md:text-sm">Countries Globally</p>
    //       </motion.div>
    //     </motion.div>
    //   </div>
    // </section>
  );
}
