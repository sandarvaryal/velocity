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
    <section className="py-8 md:py-16" id="Steps">
      <h2 className="text-2xl md:text-[2.5rem] text-center font-bold text-gray-900">
        How <span className="text-[#F97316]">Velocity</span> Delivers your
        parcel
      </h2>
      <div className="grid grid-cols-1 gap-4 mt-8 md:mt-12 mx-4 md:ml-40 md:mr-40">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="relative bg-gray-900 text-white p-4 md:p-6 shadow-lg rounded-[1rem] md:rounded-[1.5rem] flex flex-col md:flex-row justify-between items-center"
          >
            <div className="flex-1 h-20 md:h-24 mx-auto flex rounded-full">
              <span className="relative w-20 md:w-24 rounded-full bg-white shadow-xl mx-auto">
                <span className="flex justify-center items-center h-20 md:h-24">
                  {step.icon}
                </span>
                <span className="absolute -top-2 -right-2 bg-[#F97316] text-white text-xs md:text-sm font-bold px-2 py-1 rounded-full">
                  {step.id}
                </span>
              </span>
            </div>
            <div className="flex-3 mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold">{step.title}</h3>
              <p className="text-gray-400 mt-2 text-xs md:text-sm">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
