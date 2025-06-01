import { motion } from "framer-motion";
import { FaBox, FaClipboardList, FaPlane, FaTruck } from "react-icons/fa";

const steps = [
  {
    id: "01",
    title: "Parcel Registration",
    description:
      "Register your parcel with Nexus Courier for fast and secure shipping.",
    icon: <FaClipboardList className="text-[#F97316] text-5xl" />,
  },
  {
    id: "02",
    title: "Parcel Processing",
    description: "We carefully process and prepare your parcel for dispatch.",
    icon: <FaBox className="text-[#F97316] text-5xl" />,
  },
  {
    id: "03",
    title: "Parcel In-Transit",
    description:
      "Your parcel is on the move with our efficient logistics network.",
    icon: <FaPlane className="text-[#F97316] text-5xl" />,
  },
  {
    id: "04",
    title: "Parcel Delivery",
    description: "Safe and timely delivery right to your doorstep.",
    icon: <FaTruck className="text-[#F97316] text-5xl" />,
  },
];

export default function Steps() {
  return (
    <section className="py-16">
      {/* <div className="text-center text-white">
        <h4 className="text-blue-500 uppercase tracking-widest text-sm font-bold">
          How It Works
          <span className="inline-block w-12 h-[2px] bg-blue-500 ml-2"></span>
        </h4>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          How Nexus Courier Delivers Your Parcel
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="relative bg-gray-900 text-white text-center p-6 shadow-lg rounded-lg"
          >
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-white shadow-xl">
              {step.icon}
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                {step.id}
              </span>
            </div>
            <h3 className="text-lg font-bold mt-4">{step.title}</h3>
            <p className="text-gray-400 mt-2 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div> */}
      <h2 className=" md:text-[2.5rem] text-center font-bold text-gray-900">
        How <span className="text-[#F97316]">Velocity</span> Delivers your
        parcel
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 mt-12 ml-60 mr-60">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="relative bg-gray-900 text-white p-6 shadow-lg rounded-[1.5rem] flex justify-between"
          >
            <div className=" flex-1 h-24 mx-auto flex  rounded-full">
              <span className="relative w-24 rounded-full bg-white shadow-xl  mx-auto ">
                <span className="flex justify-center items-center  h-24">
                  {step.icon}
                </span>
                <span className="absolute -top-2 -right-2 bg-[#F97316] text-white text-sm font-bold px-2 py-1 rounded-full">
                  {step.id}
                </span>
              </span>
            </div>
            <div className="flex-3">
              <h3 className="text-2xl font-bold mt-4">{step.title}</h3>
              <p className="text-gray-400 mt-2 text-sm">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
